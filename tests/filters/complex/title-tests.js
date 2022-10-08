import assert from "node:assert";

import { filterBookmarks } from "../../../src/background/filters/index.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

describe("complex filter by title", function () {
    it("no bookmarks", function () {
        const query = "test";
        const bookmarks = [];
        const expected = [];

        const actual = filterBookmarks(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("no matches", function () {
        const query = "test";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [];

        const actual = filterBookmarks(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("lower", function () {
        const query = "test";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo - test - 123", []),
            new BookmarkModel("2", "url2", "TEST - test - 456", []),
            new BookmarkModel("3", "url3", "test123", [])
        ];
        const expected = [
            new BookmarkModel("3", "url3", "test123", []),
            new BookmarkModel("2", "url2", "TEST - test - 456", [])
        ];

        const actual = filterBookmarks(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("capital", function () {
        const query = "TEST";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo - test - 123", []),
            new BookmarkModel("2", "url2", "TEST - test - 456", []),
            new BookmarkModel("3", "url3", "test123", [])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "TEST - test - 456", []),
            new BookmarkModel("3", "url3", "test123", [])
        ];

        const actual = filterBookmarks(query, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
