import assert from "assert";

import { filter } from "../../../src/background/filters.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

describe("complex filter by title", function () {
    it("no bookmarks", function () {
        const query = "test";
        const bookmarks = [];
        const expected = [];

        const actual = filter(query, bookmarks);

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

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("lower", function () {
        const query = "test";
        const bookmarks = [
            new BookmarkModel([], "foo - test - 123"),
            new BookmarkModel([], "TEST - test - 456"),
            new BookmarkModel([], "test123")
        ];
        const expected = [
            new BookmarkModel([], "test123"),
            new BookmarkModel([], "TEST - test - 456")
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("capital", function () {
        const query = "TEST";
        const bookmarks = [
            new BookmarkModel([], "foo - test - 123"),
            new BookmarkModel([], "TEST - test - 456"),
            new BookmarkModel([], "test123")
        ];
        const expected = [
            new BookmarkModel([], "TEST - test - 456"),
            new BookmarkModel([], "test123")
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
