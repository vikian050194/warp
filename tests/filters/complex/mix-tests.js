import assert from "node:assert";

import { filterBookmarks as filter } from "../../../src/background/filters/index.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

describe("complex mix filter", function () {
    it("abbreviation - first level dir and title", function () {
        const query = "db";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", [] ),
            new BookmarkModel("2", "url2", "bar", ["dir1"]),
            new BookmarkModel("3", "url3", "baz", ["dir2", "subdir"])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "bar", ["dir1"]),
            new BookmarkModel("3", "url3", "baz", ["dir2", "subdir"])
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("abbreviation - all levels dirs and title", function () {
        const query = "dsb";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", [] ),
            new BookmarkModel("2", "url2", "bar", ["dir1"]),
            new BookmarkModel("3", "url3", "baz", ["dir2", "subdir"])
        ];
        const expected = [
            new BookmarkModel("3", "url3", "baz", ["dir2", "subdir"])
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("split - first level dir and title", function () {
        const query = "di ba";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", [] ),
            new BookmarkModel("2", "url2", "bar", ["dir1"]),
            new BookmarkModel("3", "url3", "baz", ["dir2", "subdir"])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "bar", ["dir1"]),
            new BookmarkModel("3", "url3", "baz", ["dir2", "subdir"])
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("split - all levels dirs and title", function () {
        const query = "di s ba";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", [] ),
            new BookmarkModel("2", "url2", "bar", ["dir1"]),
            new BookmarkModel("3", "url3", "baz", ["dir2", "subdir"])
        ];
        const expected = [
            new BookmarkModel("3", "url3", "baz", ["dir2", "subdir"])
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
