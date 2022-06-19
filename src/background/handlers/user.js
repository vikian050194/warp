import {
    Sync,
    Local,
    OPTIONS,
    STORE,
    HistoryItem
} from "../../common/index.js";
import {
    filterBookmarks,
    filterHistoryByCount,
    filterHistoryByTime
} from "../filters/index.js";

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

export const onFilter = async (query) => {
    const bookmarks = await Local.get(STORE.BOOKMARKS);
    return filterBookmarks(query, bookmarks);
};

export const onCall = async (id) => {
    const now = new Date().toISOString();
    const newItem = new HistoryItem(id, now);
    const history = await Local.get(STORE.HISTORY);
    history.push(newItem);
    await Local.set(STORE.HISTORY, history);

    await filterHistory();
};
