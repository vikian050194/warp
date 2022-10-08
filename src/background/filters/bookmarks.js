const startsWith = (line, pattern, caseSensitive) => {
    const l = caseSensitive ? line : line.toLowerCase();
    return l.indexOf(pattern) == 0;
};

export const filterBookmarksByTitle = (query, bookmarks, caseSensitive) => {
    return bookmarks.filter(b => startsWith(b.title, query, caseSensitive));
};

export const filterBookmarksByDirs = (query, bookmarks, caseSensitive) => {
    return bookmarks.filter(b => {
        return b.dirs.some(d => startsWith(d, query, caseSensitive));
    });
};

class ChunkedBookmarkModel {
    constructor(id, chunks) {
        this.id = id;
        this.chunks = chunks;
    }
}

export const getCombinatios = function* (n, k) {
    const maxN = n - 1;
    const maxK = k - 1;

    const combinations = [];

    const combination = [];

    for (let index = 0; index < k; index++) {
        combination.push(index);
    }

    combinations.push(combination);

    yield combination;

    while (!combinations[combinations.length - 1].every((value, index) => value === n - (k - index))) {
        const lastCombination = combinations[combinations.length - 1];
        const newCombination = [...lastCombination];
        let memory = false;

        for (let index = maxK; index >= 0; index--) {
            newCombination[index]++;

            if (memory) {
                for (let fix = index; fix < maxK && newCombination[fix + 1] !== newCombination[fix] + 1; fix++) {
                    newCombination[fix + 1] = newCombination[fix] + 1;
                    memory = false;
                }
            }

            if (newCombination[index] > maxN || memory) {
                memory = true;
            } else {
                break;
            }
        }

        combinations.push(newCombination);

        yield newCombination;
    }
};

export const filterBookmarksByAbbreviation = (query, bookmarks, caseSensitive) => {
    const patterns = query.indexOf(" ") === -1 ? query.split("") : query.split(" ");
    const k = patterns.length;

    const flatBookmarks = bookmarks.map(b => {
        const chunks = [];

        for (const dir of b.dirs) {
            chunks.push(...dir.split(" "));
        }

        chunks.push(...b.title.split(" "));

        return new ChunkedBookmarkModel(b.id, chunks);
    });

    const possibleBookmarks = flatBookmarks.filter(b => b.chunks.length >= patterns.length);

    const mathedBookmarkIds = [];

    for (const bookmark of possibleBookmarks) {
        const n = bookmark.chunks.length;

        for (const combination of getCombinatios(n, k)) {
            let isMatched = true;

            for (let index = 0; index < k; index++) {
                const pattern = patterns[index];
                const foo = bookmark.chunks[combination[index]];

                if (startsWith(foo, pattern, caseSensitive)) {
                    continue;
                }

                isMatched = false;
                break;
            }

            if (isMatched) {
                mathedBookmarkIds.push(bookmark.id);
                break;
            }
        }
    }

    return bookmarks.filter(b => mathedBookmarkIds.includes(b.id));
};

export const filterBookmarks = (query, bookmarks) => {
    const result = [];

    const titleSensitive = filterBookmarksByTitle(query, bookmarks, true);
    result.push(...titleSensitive);

    const titleInsensitive = filterBookmarksByTitle(query.toLowerCase(), bookmarks, false);
    const titleInsensitiveUnique = titleInsensitive.filter(b => result.indexOf(b) == -1);
    result.push(...titleInsensitiveUnique);

    const dirsSensitive = filterBookmarksByDirs(query, bookmarks, true);
    const dirsSensitiveUnique = dirsSensitive.filter(b => result.indexOf(b) == -1);
    result.push(...dirsSensitiveUnique);

    const dirsInsensitive = filterBookmarksByDirs(query.toLowerCase(), bookmarks, false);
    const dirsInsensitiveUnique = dirsInsensitive.filter(b => result.indexOf(b) == -1);
    result.push(...dirsInsensitiveUnique);

    const abbreviationSensitive = filterBookmarksByAbbreviation(query, bookmarks, true);
    const abbreviationSensitiveUnique = abbreviationSensitive.filter(b => result.indexOf(b) == -1);
    result.push(...abbreviationSensitiveUnique);

    const abbreviationInsensitive = filterBookmarksByAbbreviation(query.toLowerCase(), bookmarks, false);
    const abbreviationInsensitiveUnique = abbreviationInsensitive.filter(b => result.indexOf(b) == -1);
    result.push(...abbreviationInsensitiveUnique);

    return result;
};
