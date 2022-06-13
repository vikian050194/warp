const startsWith = (line, pattern, caseSensitive = true) => {
    const l = caseSensitive ? line : line.toLowerCase();
    return l.indexOf(pattern) == 0;
};

export const filterByTitle = (query, bookmarks, caseSensitive = true) => {
    return bookmarks.filter(b => startsWith(b.title, query, caseSensitive));
};

export const filterByDirs = (query, bookmarks, caseSensitive = true) => {
    return bookmarks.filter(b => {
        return b.dirs.some(d => startsWith(d, query, caseSensitive));
    });
};

export const filter = (query, bookmarks) => {
    const result = [];

    const first = filterByTitle(query, bookmarks);
    result.push(...first);

    const second = filterByTitle(query.toLowerCase(), bookmarks, false);
    const secondNew = second.filter(b => result.indexOf(b) == -1);
    result.push(...secondNew);

    const third = filterByDirs(query, bookmarks);
    const thirdNew = third.filter(b => result.indexOf(b) == -1);
    result.push(...thirdNew);

    const forth = filterByDirs(query.toLowerCase(), bookmarks, false);
    const forthNew = forth.filter(b => result.indexOf(b) == -1);
    result.push(...forthNew);

    return result;
};

export const filterByCount = (history, threshold) => {
    if (history.length <= threshold) {
        return history;
    }

    return history.slice(history.length - threshold);
};

export const filterByTime = (history, threshold) => history.filter(i => new Date(i.date) >= threshold);
