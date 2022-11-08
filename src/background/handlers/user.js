import {
    Sync,
    Local,
    OPTIONS,
    STORE,
    HistoryItem,
    SORTING,
    COUNTERS
} from "../../common/index.js";
import {
    filterBookmarks,
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
    timeThreshold = new Date(timeThreshold.getTime() - expirationTime * 1000);
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
    const filteredBookmarks = filterBookmarks(query, bookmarks);
    const sortedBookmarks = await sortBookmarks(filteredBookmarks);
    return sortedBookmarks;
};

export const onCall = async (data) => {
    const bookmarks = await Local.get(STORE.BOOKMARKS);
    const bookmark = bookmarks.find(b => b.id === data.id);

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
    } else {
        const update = await Local.get(COUNTERS.OPEN_UPDATE);
        await Local.set(COUNTERS.OPEN_UPDATE, update + 1);
        await chrome.tabs.update(
            data.id,
            {
                url: bookmark.url
            });
    }

    const now = new Date().toISOString();
    const newItem = new HistoryItem(data.id, now);
    const history = await Local.get(STORE.HISTORY);
    history.push(newItem);
    await Local.set(STORE.HISTORY, history);

    await filterHistory();
};
