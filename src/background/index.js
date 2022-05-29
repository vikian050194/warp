import {
    Sync,
    Local,
    MESSAGE,
    OPTIONS,
    STORE,
    HistoryItem
} from "../common/index.js";
import * as MENU from "./menu.js";
import { getBookmarksList } from "./scan.js";
import { filter } from "./filters.js";

const filterBookmarks = async (query) => {
    const bookmarks = await Local.get(STORE.BOOKMARKS);
    return filter(query, bookmarks);
};

const getRoot = async () => {
    const searchInCustomDerectory = await Sync.get(OPTIONS.IS_CUSTOM_DIRECTORY);

    if (searchInCustomDerectory) {
        const customDirectoryName = await Sync.get(OPTIONS.CUSTOM_DIRECTORY);
        const [root] = await chrome.bookmarks.search({ title: customDirectoryName });
        return root;
    }

    const [root] = await chrome.bookmarks.get("1");
    return root;
};

const onUpdate = async () => {
    const root = await getRoot();

    const bookmarks = await getBookmarksList(root);
    await Local.set(STORE.BOOKMARKS, bookmarks);
};

const onCall = async (id) => {
    const now = new Date().toISOString();
    const newItem = new HistoryItem(id, now);
    const history = await Local.get(STORE.HISTORY);
    history.push(newItem);
    await Local.set(STORE.HISTORY, history);
};

const updateMenu = () => {
    chrome.contextMenus.create({
        id: MENU.HISTORY,
        title: "History",
        contexts: ["action"],
        type: "normal",
        enabled: true
    });

    chrome.contextMenus.create({
        id: MENU.FREQUENCY,
        title: "Frequency",
        contexts: ["action"],
        type: "normal",
        enabled: true
    });
};

const updateDefaultValues = async () => {
    const customDirectory = await Sync.get(OPTIONS.CUSTOM_DIRECTORY);
    if (customDirectory === undefined) {
        await Sync.set(OPTIONS.CUSTOM_DIRECTORY, "Warp");
    }

    const isCustomDirectory = await Sync.get(OPTIONS.IS_CUSTOM_DIRECTORY);
    if (isCustomDirectory === undefined) {
        await Sync.set(OPTIONS.IS_CUSTOM_DIRECTORY, false);
    }

    const history = await Local.get(STORE.HISTORY);
    if (history === undefined) {
        await Local.set(STORE.HISTORY, []);
    }
};

chrome.runtime.onInstalled.addListener(async () => {
    updateMenu();

    await updateDefaultValues();

    await onUpdate();
});

chrome.bookmarks.onChanged.addListener(async () => {
    // TODO improve update algorithm and use event data
    await onUpdate();
});

chrome.bookmarks.onMoved.addListener(async () => {
    // TODO improve update algorithm and use event data
    await onUpdate();
});

chrome.bookmarks.onRemoved.addListener(async () => {
    // TODO improve update algorithm and use event data
    await onUpdate();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // message listener is not async/await because of
    // bug in GC https://crbug.com/1304272
    switch (message.type) {
        case MESSAGE.QUERY:
            filterBookmarks(message.value).then(options => {
                sendResponse(options);
            });
            return true;
        case MESSAGE.UPDATE:
            onUpdate().then(() => sendResponse());
            return true;
        case MESSAGE.CALL:
            onCall(message.value).then(() => sendResponse());
            return true;
        default:
            break;
    }
});

chrome.commands.onCommand.addListener(() => {
    //code will be here
});

chrome.contextMenus.onClicked.addListener(async (info) => {
    switch (info.menuItemId) {
        case MENU.HISTORY:
            await chrome.tabs.create({
                url: "history/history.html"
            });
            break;
        case MENU.FREQUENCY:
            await chrome.tabs.create({
                url: "frequency/frequency.html"
            });
            break;
        default:
            break;
    }
});
