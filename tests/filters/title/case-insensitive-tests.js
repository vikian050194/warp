import assert from "assert";

import { filterByTitle } from "../../../src/background/filters.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

describe("filter by title - case insensitive", function () {
    it("capital - first", function () {
        const query = "test";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel([], "Test"),
            new BookmarkModel([], "baz")
        ];
        const expected = [new BookmarkModel([], "Test")];

        const actual = filterByTitle(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("capital - all", function () {
        const query = "test";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel([], "TEST"),
            new BookmarkModel([], "baz")
        ];
        const expected = [new BookmarkModel([], "TEST")];

        const actual = filterByTitle(query, bookmarks, false);

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

        const actual = filterByTitle(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });
});
