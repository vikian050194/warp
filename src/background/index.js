import {
    getOption,
    setOption,
    LevelModel,
    BookmarkModel
} from "../common.js";

// TODO update list on change* events
const getBookmarksList = async (bookmark) => {
    const result = [];
    const levels = [];
    const stack = [];
    stack.push(bookmark);

    while (stack) {
        const current = stack.pop();
        const lastLevel = levels[levels.length - 1];

        if (!stack.length && current && lastLevel && current.id == lastLevel.id) {
            return result.map(b => new BookmarkModel(b.dirs.slice(1), b.title, b.url));
        }

        if (lastLevel && current.title == lastLevel.title && current.id == lastLevel.id) {
            levels.pop();
            continue;
        }

        if (current.url) {
            result.push(new BookmarkModel([...levels.map(({ title }) => title)], current.title, current.url));
        } else {
            const subs = await chrome.bookmarks.getChildren(current.id);
            stack.push(current);
            stack.push(...subs);
            levels.push(new LevelModel(current.id, current.title));
        }
    }
};

const filterBookmarks = async (query) => {
    const parts = query.split(" ");
    const bookmarks = await getOption("bookmarks");
    return bookmarks.filter(b => b.title.indexOf(parts[0]) == 0);
};

const onUpdate = async () => {
    // TODO use constants for options names
    const rootDirectoryName = await getOption("root-directory");
    const [root] = await chrome.bookmarks.search({ title: rootDirectoryName });

    const bookmarks = await getBookmarksList(root);
    setOption("bookmarks", bookmarks);
}

chrome.runtime.onInstalled.addListener(async (e) => {
    console.log("onInstalled", e);
    setOption("root-directory", "Warp");

    await onUpdate();
});

chrome.runtime.onStartup.addListener((e) => {
    console.log("onStartup", e);
});

chrome.bookmarks.onChanged.addListener(async (e) => {
    console.log("onChanged", e);
    await onUpdate();
});

chrome.bookmarks.onChildrenReordered.addListener((e) => {
    console.log("onChildrenReordered", e);
});

chrome.bookmarks.onMoved.addListener(async (e) => {
    console.log("onMoved", e);
    await onUpdate();
});

chrome.bookmarks.onRemoved.addListener(async (e) => {
    console.log("onRemoved", e);
    await onUpdate();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message", message);
    // message listener is not async/await because of
    // bug in GC https://crbug.com/1304272
    filterBookmarks(message).then(options => {
        console.log("Options", options);
        sendResponse(options);
    });
    return true;
});

chrome.commands.onCommand.addListener((command) => {
    console.log(`Command "${command}"`);
});
