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
            new BookmarkModel([], "foo"),
            new BookmarkModel([], "bar"),
            new BookmarkModel([], "baz")
        ];
        const expected = [];

        const actual = filterByTitle(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("lower", function () {
        const query = "test";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel([], "test"),
            new BookmarkModel([], "baz")
        ];
        const expected = [new BookmarkModel([], "test")];

        const actual = filterByTitle(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("capital - first", function () {
        const query = "Test";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel([], "Test"),
            new BookmarkModel([], "baz")
        ];
        const expected = [new BookmarkModel([], "Test")];

        const actual = filterByTitle(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("capital - all", function () {
        const query = "TEST";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel([], "TEST"),
            new BookmarkModel([], "baz")
        ];
        const expected = [new BookmarkModel([], "TEST")];

        const actual = filterByTitle(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("CAPS", function () {
        const query = "TEST";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel([], "test"),
            new BookmarkModel([], "baz")
        ];
        const expected = [];

        const actual = filterByTitle(query, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
