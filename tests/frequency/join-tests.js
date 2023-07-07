import assert from "node:assert";

import { join } from "../../src/frequency/join.js";
import {
    BookmarkModel,
    HistoryItem,
    FreakItemView
} from "../../src/common/index.js";

describe("frequency: join history items and bookmarks", function () {
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
            new FreakItemView(1, 1, 1, "title1")
        ];

        const actual = join(history, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("tree items in reverse order", () => {
        const history = [
            new HistoryItem("1", "date1"),
            new HistoryItem("2", "date2"),
            new HistoryItem("1", "date3"),
            new HistoryItem("3", "date4"),
            new HistoryItem("1", "date5")
        ];
        const bookmarks = [
            new BookmarkModel("1", "url1", "title1", []),
            new BookmarkModel("2", "url2", "title2", []),
            new BookmarkModel("3", "url3", "title3", [])
        ];

        const expected = [
            new FreakItemView(1, 1, 3, "title1"),
            new FreakItemView(2, 2, 1, "title2"),
            new FreakItemView(3, 3, 1, "title3")
        ];

        const actual = join(history, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("missed bookmark", () => {
        const history = [
            new HistoryItem("1", "date1"),
            new HistoryItem("2", "date2")
        ];
        const bookmarks = [
            new BookmarkModel("1", "url1", "title1", [])
        ];

        const expected = [
            new FreakItemView(1, 1, 1, "title1"),
            new FreakItemView(2, 2, 1, "<NOT FOUND BOOKMARK #2>")
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
            new FreakItemView(1, 1, 1, "dir1:title1")
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
            new FreakItemView(1, 1, 1, "dir1/dir2:title1")
        ];

        const actual = join(history, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
