import assert from "assert";

import { filerByTitle } from "../../src/background/filters.js";
import { BookmarkModel } from "../../src/common/models/index.js";

describe("Filter by title", function () {
    it("No bookmarks", function () {
        const query = "test";
        const bookmarks = [];
        const expected = [];

        const actual = filerByTitle(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("No matches", function () {
        const query = "test";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel([], "bar"),
            new BookmarkModel([], "baz")
        ];
        const expected = [];

        const actual = filerByTitle(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("One match", function () {
        const query = "test";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel([], "test - test"),
            new BookmarkModel([], "baz")
        ];
        const expected = [new BookmarkModel([], "test - test")];

        const actual = filerByTitle(query, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
