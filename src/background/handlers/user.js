import {
    Sync,
    Local,
    OPTIONS,
    STORE,
    HistoryModel,
    SORTING,
    COUNTERS,
    NEIGHBOUR
} from "../../common/index.js";
import {
    ComplexFilter,
    FilteringConfiguration,
    filterHistoryByCount,
    filterHistoryByTime
} from "../filters/index.js";
import {
    sortByAlphabet,
    sortByHistory,
    sortByFrequency
} from "../sorting/index.js";
import {
    groupByIdAndOrderDesc
} from "../../frequency/join.js";

const filterHistory = async () => {
    const history = await Local.get(STORE.HISTORY);

    const maxCount = await Sync.get(OPTIONS.HISTORY_MAX_COUNT);
    const filteredByCount = filterHistoryByCount(history, maxCount);

    const expirationTime = await Sync.get(OPTIONS.HISTORY_EXPIRATION_TIME);
    let timeThreshold = new Date();
    const msInDay = 24 * 60 * 60 * 1000;
    timeThreshold = new Date(timeThreshold.getTime() - expirationTime * msInDay);
    const filteredByTime = filterHistoryByTime(filteredByCount, timeThreshold);

    await Local.set(STORE.HISTORY, filteredByTime);
};

const sortBookmarks = async (bookmarks) => {
    const sortingType = await Sync.get(OPTIONS.RESULTS_SORTING);
    switch (sortingType) {
        case SORTING.AS_IS: {
            return bookmarks;
        }
        case SORTING.ALPHABET:
            return sortByAlphabet(bookmarks);
        case SORTING.HISTORY: {
            const history = await Local.get(STORE.HISTORY);
            return sortByHistory(bookmarks, history);
        }
        case SORTING.FREQUENCY: {
            const history = await Local.get(STORE.HISTORY);
            const frequency = groupByIdAndOrderDesc(history);
            return sortByFrequency(bookmarks, frequency);
        }
        default:
            throw new Error("unexpected sorting type");
    }
};

export const onFilter = async (query) => {
    const bookmarks = await Local.get(STORE.BOOKMARKS);
    const configuration = new FilteringConfiguration();

    configuration.behavior.caseSensitive = await Sync.get(OPTIONS.SEARCH_IS_CASE_SENSITIVE);
    configuration.behavior.startsWith = await Sync.get(OPTIONS.SEARCH_IS_STARTS_WITH);

    configuration.filters.split = await Sync.get(OPTIONS.SEARCH_SPLIT);
    configuration.filters.abbreviation = await Sync.get(OPTIONS.SEARCH_ABBREVIATION);

    const complexFilter = new ComplexFilter(configuration);
    const filteredBookmarks = complexFilter.filter(query, bookmarks);
    const sortedBookmarks = await sortBookmarks(filteredBookmarks);
    return sortedBookmarks;
};

export const onCall = async (data) => {
    const neighbour = await Sync.get(OPTIONS.NEW_TAB_KEEP_NEIGHBOUR);

    const bookmarks = await Local.get(STORE.BOOKMARKS);
    const bookmark = bookmarks.find(b => b.id === data.bookmarkId);

    if (data.newTab) {
        const create = await Local.get(COUNTERS.OPEN_CREATE);
        await Local.set(COUNTERS.OPEN_CREATE, create + 1);
        const newTab = await chrome.tabs.create({
            url: bookmark.url
        });

        if (data.keepGroup) {
            await chrome.tabs.group({
                groupId: data.groupId,
                tabIds: [newTab.id]
            });
        }

        if ((neighbour === NEIGHBOUR.ALWAYS) ||
            (neighbour === NEIGHBOUR.ONLY_IN_GROUP && data.groupId !== -1 && data.keepGroup) ||
            (neighbour === NEIGHBOUR.ONLY_WITHOUT_GROUP && data.groupId === -1)) {
            const newIndex = data.tabIndex + 1;
            await chrome.tabs.move(newTab.id, {
                index: newIndex
            });
        }
    } else {
        const update = await Local.get(COUNTERS.OPEN_UPDATE);
        await Local.set(COUNTERS.OPEN_UPDATE, update + 1);
        await chrome.tabs.update(
            data.tabId,
            {
                url: bookmark.url
            });
    }

    const now = new Date().toISOString();
    const newItem = new HistoryModel(data.bookmarkId, now);
    const history = await Local.get(STORE.HISTORY);
    history.push(newItem);
    await Local.set(STORE.HISTORY, history);

    await filterHistory();
};
