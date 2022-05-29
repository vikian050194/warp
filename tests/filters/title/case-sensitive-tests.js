import assert from "assert";

import { filterByTitle } from "../../../src/background/filters.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

describe("filter by title - case sensitive", function () {
    it("no bookmarks", function () {
        const query = "test";
        const bookmarks = [];
        const expected = [];

        const actual = filterByTitle(query, bookmarks);

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

        const actual = filterByTitle(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("lower", function () {
        const query = "test";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "test", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "test", [])
        ];

        const actual = filterByTitle(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("capital - first", function () {
        const query = "Test";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "Test", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "Test", [])
        ];

        const actual = filterByTitle(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("capital - all", function () {
        const query = "TEST";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "TEST", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "TEST", [])
        ];

        const actual = filterByTitle(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("CAPS", function () {
        const query = "TEST";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "test", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [];

        const actual = filterByTitle(query, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
