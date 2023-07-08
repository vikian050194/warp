import assert from "node:assert";

import {
    sortByFrequency
} from "../../../src/background/sorting/frequency.js";
import {
    BookmarkModel,
    FrequencyModel
} from "../../../src/common/index.js";

describe("sorting by frequency", function () {
    it("no bookmarks, no frequency - asc", () => {
        const bookmarks = [];
        const frequency = [];

        const expected = [];

        const actual = sortByFrequency(bookmarks, frequency);

        assert.deepEqual(actual, expected);
    });

    it("no bookmarks, no frequency - desc", () => {
        const bookmarks = [];
        const frequency = [];

        const expected = [];

        const actual = sortByFrequency(bookmarks, frequency, false);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks, no frequency - asc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];
        const frequency = [];

        const expected = [
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("3", "url3", "bm3", [])
        ];

        const actual = sortByFrequency(bookmarks, frequency);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks, no frequency - desc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];
        const frequency = [];

        const expected = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("1", "url1", "bm1", [])
        ];

        const actual = sortByFrequency(bookmarks, frequency, false);

        assert.deepEqual(actual, expected);
    });

    it("two bookmarks, partial frequency - asc", () => {
        const bookmarks = [
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];
        const frequency = [
            new FrequencyModel("1", 1)
        ];

        const expected = [
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];

        const actual = sortByFrequency(bookmarks, frequency);

        assert.deepEqual(actual, expected);
    });

    it("two bookmarks, partial frequency - desc", () => {
        const bookmarks = [
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];
        const frequency = [
            new FrequencyModel("1", 1)
        ];

        const expected = [
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("1", "url1", "bm1", [])
        ];

        const actual = sortByFrequency(bookmarks, frequency, false);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks, partial frequency - asc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];
        const frequency = [
            new FrequencyModel("2", 2)
        ];

        const expected = [
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("3", "url3", "bm3", [])
        ];

        const actual = sortByFrequency(bookmarks, frequency);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks, partial frequency - desc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];
        const frequency = [
            new FrequencyModel("2", 2)
        ];

        const expected = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];

        const actual = sortByFrequency(bookmarks, frequency, false);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks, frequency - asc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];
        const frequency = [
            new FrequencyModel("3", 3),
            new FrequencyModel("2", 2),
            new FrequencyModel("1", 1)
        ];

        const expected = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("1", "url1", "bm1", [])
        ];

        const actual = sortByFrequency(bookmarks, frequency);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks, frequency - desc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];
        const frequency = [
            new FrequencyModel("3", 3),
            new FrequencyModel("2", 2),
            new FrequencyModel("1", 1)
        ];

        const expected = [
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("3", "url3", "bm3", [])
        ];

        const actual = sortByFrequency(bookmarks, frequency, false);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks, two frequency items have equal values - asc", () => {
        const bookmarks = [
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("3", "url3", "bm3", [])
        ];
        const frequency = [
            new FrequencyModel("2", 3),
            new FrequencyModel("1", 3),
            new FrequencyModel("3", 1)
        ];

        const expected = [
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("3", "url3", "bm3", [])
        ];

        const actual = sortByFrequency(bookmarks, frequency);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks, two frequency items have equal values - desc", () => {
        const bookmarks = [
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("3", "url3", "bm3", [])
        ];
        const frequency = [
            new FrequencyModel("2", 3),
            new FrequencyModel("1", 3),
            new FrequencyModel("3", 1)
        ];

        const expected = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("1", "url1", "bm1", [])
        ];

        const actual = sortByFrequency(bookmarks, frequency, false);

        assert.deepEqual(actual, expected);
    });
});
