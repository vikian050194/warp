import assert from "assert";

import {
    sortByHistory
} from "../../../src/background/sorting/history.js";
import {
    BookmarkModel,
    HistoryItem
} from "../../../src/common/index.js";

describe("sorting by history", function () {
    it("no bookmarks, no history - asc", () => {
        const bookmarks = [];
        const history = [];

        const expected = [];

        const actual = sortByHistory(bookmarks, history);

        assert.deepEqual(actual, expected);
    });

    it("no bookmarks, no history - desc", () => {
        const bookmarks = [];
        const history = [];

        const expected = [];

        const actual = sortByHistory(bookmarks, history, false);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks, no history - asc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];
        const history = [];

        const expected = [
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("3", "url3", "bm3", [])
        ];

        const actual = sortByHistory(bookmarks, history);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks, no history - desc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];
        const history = [];

        const expected = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("1", "url1", "bm1", [])
        ];

        const actual = sortByHistory(bookmarks, history, false);

        assert.deepEqual(actual, expected);
    });

    it("two bookmarks, partial history - asc", () => {
        const bookmarks = [
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];
        const history = [
            new HistoryItem("1")
        ];

        const expected = [
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];

        const actual = sortByHistory(bookmarks, history);

        assert.deepEqual(actual, expected);
    });

    it("two bookmarks, partial history - desc", () => {
        const bookmarks = [
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];
        const history = [
            new HistoryItem("1")
        ];

        const expected = [
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("1", "url1", "bm1", [])
        ];

        const actual = sortByHistory(bookmarks, history, false);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks, partial history - asc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];
        const history = [
            new HistoryItem("2")
        ];

        const expected = [
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("3", "url3", "bm3", [])
        ];

        const actual = sortByHistory(bookmarks, history);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks, partial history - desc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];
        const history = [
            new HistoryItem("2")
        ];

        const expected = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];

        const actual = sortByHistory(bookmarks, history, false);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks, history - asc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];
        const history = [
            new HistoryItem("3"),
            new HistoryItem("2"),
            new HistoryItem("1")
        ];

        const expected = [
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("3", "url3", "bm3", [])
        ];

        const actual = sortByHistory(bookmarks, history);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks, history - desc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];
        const history = [
            new HistoryItem("3"),
            new HistoryItem("2"),
            new HistoryItem("1")
        ];

        const expected = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("1", "url1", "bm1", [])
        ];

        const actual = sortByHistory(bookmarks, history, false);

        assert.deepEqual(actual, expected);
    });

    it("two bookmarks, few calls in history - asc", () => {
        const bookmarks = [
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];
        const history = [
            new HistoryItem("2"),
            new HistoryItem("1"),
            new HistoryItem("2"),
            new HistoryItem("1"),
            new HistoryItem("2")
        ];

        const expected = [
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("1", "url1", "bm1", [])
        ];

        const actual = sortByHistory(bookmarks, history);

        assert.deepEqual(actual, expected);
    });
});
