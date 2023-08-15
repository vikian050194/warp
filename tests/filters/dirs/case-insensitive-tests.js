import assert from "node:assert";

import { filterBookmarksByDirs as filter } from "../../../src/background/filters/index.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

describe("filter by dirs - case insensitive", function () {
    it("no matches", function () {
        const query = "test";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["dir1"]),
            new BookmarkModel("3", "url3", "baz", ["dir2", "dir3"])
        ];
        const expected = [];

        const actual = filter(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("lower", function () {
        const query = "dir";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["Dir1"]),
            new BookmarkModel("3", "url3", "baz", ["DIR2", "subdir"])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "bar", ["Dir1"]),
            new BookmarkModel("3", "url3", "baz", ["DIR2", "subdir"])
        ];

        const actual = filter(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("capital - first", function () {
        const query = "cdir";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["adir"]),
            new BookmarkModel("3", "url3", "baz", ["bdir", "Cdir"])
        ];
        const expected = [
            new BookmarkModel("3", "url3", "baz", ["bdir", "Cdir"])
        ];

        const actual = filter(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("capital - all", function () {
        const query = "bdir";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["adir"]),
            new BookmarkModel("3", "url3", "baz", ["BDIR", "cdir"])
        ];
        const expected = [
            new BookmarkModel("3", "url3", "baz", ["BDIR", "cdir"])
        ];

        const actual = filter(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("CAPS", function () {
        const query = "BDIR";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["adir"]),
            new BookmarkModel("3", "url3", "baz", ["bdir", "cdir"])
        ];
        const expected = [];

        const actual = filter(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("second word", function () {
        const query = "zo";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["Dir1 zoo"]),
            new BookmarkModel("3", "url3", "baz", ["DIR2", "subdir Zoo"])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "bar", ["Dir1 zoo"]),
            new BookmarkModel("3", "url3", "baz", ["DIR2", "subdir Zoo"])
        ];

        const actual = filter(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });
});
