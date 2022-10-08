import assert from "node:assert";

import { join } from "../../src/history/join.js";
import {
    BookmarkModel,
    HistoryItem,
    HistoryItemView
} from "../../src/common/index.js";

describe("history: join history items and bookmarks", function () {
    it("empty history and empty bookmarks", () => {
        const history = [];
        const bookmarks = [];

        const expected = [];

        const actual = join(history, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("empty history", () => {
        const history = [];
        const bookmarks = [
            new BookmarkModel("1", "url", "title", [])
        ];

        const expected = [];

        const actual = join(history, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("one history item", () => {
        const history = [
            new HistoryItem("1", "date1")
        ];
        const bookmarks = [
            new BookmarkModel("1", "url1", "title1", [])
        ];

        const expected = [
            new HistoryItemView(1, "date1", "title1")
        ];

        const actual = join(history, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("two items in reverse order", () => {
        const history = [
            new HistoryItem("1", "date1"),
            new HistoryItem("2", "date2")
        ];
        const bookmarks = [
            new BookmarkModel("1", "url1", "title1", []),
            new BookmarkModel("2", "url2", "title2", [])
        ];

        const expected = [
            new HistoryItemView(2, "date2", "title2"),
            new HistoryItemView(1, "date1", "title1")
        ];

        const actual = join(history, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("bookmark is not found", () => {
        const history = [
            new HistoryItem("2", "date2")
        ];
        const bookmarks = [
            new BookmarkModel("1", "url", "title", [])
        ];

        const expected = [
            new HistoryItemView(1, "date2", "<NOT FOUND BOOKMARK #2>")
        ];

        const actual = join(history, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("second level", () => {
        const history = [
            new HistoryItem("1", "date1")
        ];
        const bookmarks = [
            new BookmarkModel("1", "url1", "title1", ["dir1"])
        ];

        const expected = [
            new HistoryItemView(1, "date1", "dir1:title1")
        ];

        const actual = join(history, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("third level", () => {
        const history = [
            new HistoryItem("1", "date1")
        ];
        const bookmarks = [
            new BookmarkModel("1", "url1", "title1", ["dir1", "dir2"])
        ];

        const expected = [
            new HistoryItemView(1, "date1", "dir1/dir2:title1")
        ];

        const actual = join(history, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
