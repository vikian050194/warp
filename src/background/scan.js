import {
    LevelModel,
    BookmarkModel
} from "../common/index.js";

export const getBookmarksList = async (bookmark) => {
    const result = [];
    const levels = [];
    const stack = [];

    if (bookmark) {
        stack.push(bookmark);
    }

    while (stack.length !== 0) {
        const bookmark = stack.pop();
        const level = levels[levels.length - 1];

        if (stack.length === 0 && bookmark && level && bookmark.id === level.id) {
            break;
        }

        if (level && bookmark.id === level.id) {
            levels.pop();
            continue;
        }

        if (bookmark.url) {
            result.push(new BookmarkModel(bookmark.id, bookmark.url, bookmark.title, [...levels.map(({ title }) => title)]));
        } else {
            const subs = await chrome.bookmarks.getChildren(bookmark.id);
            stack.push(bookmark);
            stack.push(...subs);
            levels.push(new LevelModel(bookmark.id, bookmark.title));
        }
    }

    return result.map(b => new BookmarkModel(b.id, b.url, b.title, b.dirs.slice(1)));
};
