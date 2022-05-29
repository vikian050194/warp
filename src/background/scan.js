import {
    LevelModel,
    BookmarkModel
} from "../common/index.js";

export const getBookmarksList = async (bookmark) => {
    const result = [];
    const levels = [];
    const stack = [];

    if (!bookmark) {
        return result;
    }

    stack.push(bookmark);

    while (stack) {
        const current = stack.pop();
        const lastLevel = levels[levels.length - 1];

        if (!stack.length && current && lastLevel && current.id == lastLevel.id) {
            return result.map(b => new BookmarkModel(b.id, b.url, b.title, b.dirs.slice(1)));
        }

        if (lastLevel && current.title == lastLevel.title && current.id == lastLevel.id) {
            levels.pop();
            continue;
        }

        if (current.url) {
            result.push(new BookmarkModel(current.id, current.url, current.title, [...levels.map(({ title }) => title)]));
        } else {
            const subs = await chrome.bookmarks.getChildren(current.id);
            stack.push(current);
            stack.push(...subs);
            levels.push(new LevelModel(current.id, current.title));
        }
    }

    return [];
};
