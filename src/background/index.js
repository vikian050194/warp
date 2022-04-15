import {
    Sync,
    Local
} from "../common/index.js";
import { getBookmarksList } from "./foo.js";
import { filerByTitle } from "./filters.js";

const filterBookmarks = async (query) => {
    const bookmarks = await Local.get("bookmarks");
    return filerByTitle(query, bookmarks);
};

const onUpdate = async () => {
    // TODO use constants for options names
    const rootDirectoryName = await Sync.get("root-directory");
    const [root] = await chrome.bookmarks.search({ title: rootDirectoryName });

    const bookmarks = await getBookmarksList(root);
    await Local.set("bookmarks", bookmarks);
};

chrome.runtime.onInstalled.addListener(async () => {
    // TODO improve update algorithm and use event data
    await Sync.set("root-directory", "Warp");
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
    filterBookmarks(message).then(options => {
        sendResponse(options);
    });
    return true;
});

chrome.commands.onCommand.addListener(() => {
    //code will be here
});
