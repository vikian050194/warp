const startsWith = (line, pattern, caseSensitive = true) => {
    const l = caseSensitive ? line : line.toLowerCase();
    return l.indexOf(pattern) == 0;
};

export const filterBookmarksByTitle = (query, bookmarks, caseSensitive = true) => {
    return bookmarks.filter(b => startsWith(b.title, query, caseSensitive));
};

export const filterBookmarksByDirs = (query, bookmarks, caseSensitive = true) => {
    return bookmarks.filter(b => {
        return b.dirs.some(d => startsWith(d, query, caseSensitive));
    });
};

export const filterBookmarks = (query, bookmarks) => {
    const result = [];

    const first = filterBookmarksByTitle(query, bookmarks);
    result.push(...first);

    const second = filterBookmarksByTitle(query.toLowerCase(), bookmarks, false);
    const secondNew = second.filter(b => result.indexOf(b) == -1);
    result.push(...secondNew);

    const third = filterBookmarksByDirs(query, bookmarks);
    const thirdNew = third.filter(b => result.indexOf(b) == -1);
    result.push(...thirdNew);

    const forth = filterBookmarksByDirs(query.toLowerCase(), bookmarks, false);
    const forthNew = forth.filter(b => result.indexOf(b) == -1);
    result.push(...forthNew);

    return result;
};
