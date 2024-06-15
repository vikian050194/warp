export class Filters {
    title = true;
    dirs = true;
    split = true;
    abbreviation = true;
}

// TODO use deafult values instead of inline values
export class Behavior {
    caseSensitive = false;
    startsWith = true;
}

export class FilteringConfiguration {
    behavior = new Behavior();
    filters = new Filters();
}

export class BaseAlgorithm {
    /**
    * @param {Behavior} configuration
    */
    constructor(configuration) {
        this.caseSensitive = configuration.caseSensitive;
        this.startsWith = configuration.startsWith;
    }

    itStartsWith = (line, pattern) => {
        const l = this.caseSensitive ? line : line.toLowerCase();
        return l.indexOf(pattern) == 0;
    };

    itContains = (line, pattern) => {
        const l = this.caseSensitive ? line : line.toLowerCase();
        return l.indexOf(pattern) != -1;
    };

    search = (line, pattern) => {
        if (this.startsWith) {
            return this.itStartsWith(line, pattern);
        }

        return this.itContains(line, pattern);
    };

    filter = () => {
        throw new Error("not implemented");
    };
}

export class TitleFilter extends BaseAlgorithm {
    filter = (query, bookmarks) => {
        return bookmarks.filter(bookmark => {
            return bookmark.title.split(" ").some(chunk => this.search(chunk, query));
        });
    };
}

export class DirsFilter extends BaseAlgorithm {
    filter = (query, bookmarks) => {
        return bookmarks.filter(bookmark => {
            return bookmark.dirs.some(directory => directory.split(" ").some(chunk => this.search(chunk, query)));
        });
    };
}

export class BaseCombinationFilter extends BaseAlgorithm {
    getCombinatios = function* (n, k) {
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
}

export class SplitFilter extends BaseCombinationFilter {
    filter = (query, bookmarks) => {
        const patterns = query.split(" ");
        const k = patterns.length;

        if (k < 2) {
            return [];
        }

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

            for (const combination of this.getCombinatios(n, k)) {
                let isMatched = true;

                for (let index = 0; index < k; index++) {
                    const pattern = patterns[index];
                    const chunk = bookmark.chunks[combination[index]];

                    if (this.search(chunk, pattern)) {
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
}

export class AbbreviationFilter extends BaseCombinationFilter {
    filter = (query, bookmarks) => {
        const patterns = query.split("");
        const k = patterns.length;

        if (k < 2) {
            return [];
        }

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

            for (const combination of this.getCombinatios(n, k)) {
                let isMatched = true;

                for (let index = 0; index < k; index++) {
                    const pattern = patterns[index];
                    const chunk = bookmark.chunks[combination[index]];

                    if (this.search(chunk, pattern)) {
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
}

/**
* @param {FilteringConfiguration} configuration
*/
export const getFilters = (configuration) => {
    const result = [];

    if (configuration.filters.title) {
        result.push(new TitleFilter(configuration.behavior));
    }

    if (configuration.filters.dirs) {
        result.push(new DirsFilter(configuration.behavior));
    }

    if (configuration.filters.split) {
        result.push(new SplitFilter(configuration.behavior));
    }

    if (configuration.filters.abbreviation) {
        result.push(new AbbreviationFilter(configuration.behavior));
    }

    return result;
};

export class ComplexFilter {
    /**
    * @param {FilteringConfiguration} configuration
    */
    constructor(configuration) {
        this.configuration = configuration;
    }

    filter = (query, bookmarks) => {
        let bookmarksPool = [...bookmarks];
        const result = [];

        for (const item of getFilters(this.configuration)) {
            const q = this.configuration.behavior.caseSensitive ? query : query.toLowerCase();
            const filteredBookmarks = item.filter(q, bookmarksPool);
            const uniqueBookmarks = filteredBookmarks.filter(b => result.indexOf(b) == -1);
            bookmarksPool = bookmarksPool.filter(b => uniqueBookmarks.indexOf(b) == -1);
            result.push(...uniqueBookmarks);
        }

        return result;
    };
}

class ChunkedBookmarkModel {
    constructor(id, chunks) {
        this.id = id;
        this.chunks = chunks;
    }
}
