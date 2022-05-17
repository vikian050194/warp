import {
    Sync,
    Local,
    type,
    Keys
} from "../common/index.js";
import { getBookmarksList } from "./scan.js";
import { filter } from "./filters.js";

const filterBookmarks = async (query) => {
    const bookmarks = await Local.get("bookmarks");
    return filter(query, bookmarks);
};

const getRoot = async () => {
    const searchRoot = await Sync.get(Keys.IS_ROOT);

    if (searchRoot) {
        const rootDirectoryName = await Sync.get(Keys.ROOT);
        const [root] = await chrome.bookmarks.search({ title: rootDirectoryName });
        return root;
    }

    const [root] = await chrome.bookmarks.get("1");
    return root;
};

const onUpdate = async () => {
    const root = await getRoot();

    const bookmarks = await getBookmarksList(root);
    await Local.set("bookmarks", bookmarks);
};

chrome.runtime.onInstalled.addListener(async () => {
    const root = await Sync.get(Keys.ROOT);
    if (root === undefined) {
        await Sync.set(Keys.ROOT, "Warp");
    }

    const is_root = await Sync.get(Keys.IS_ROOT);
    if (is_root === undefined) {
        await Sync.set(Keys.IS_ROOT, true);
    }

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
        case type.QUERY:
            filterBookmarks(message.value).then(options => {
                sendResponse(options);
            });
            return true;
        case type.UPDATE:
            onUpdate().then(() => sendResponse());
            return true;
        default:
            break;
    }

    filterBookmarks(message).then(options => {
        sendResponse(options);
    });
    return true;
});

chrome.commands.onCommand.addListener(() => {
    //code will be here
});
