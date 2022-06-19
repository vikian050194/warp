import assert from "assert";

import { filterBookmarksByDirs } from "../../../src/background/filters/index.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

describe("filter by dirs - case sensitive", function () {
    it("no bookmarks", function () {
        const query = "test";
        const bookmarks = [];
        const expected = [];

        const actual = filterBookmarksByDirs(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("no matches", function () {
        const query = "test";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["dir1"]),
            new BookmarkModel("3", "url3", "baz", ["dir2", "dir3"])
        ];
        const expected = [];

        const actual = filterBookmarksByDirs(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("lower - first dir - one bm", function () {
        const query = "adir";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["adir"]),
            new BookmarkModel("3", "url3", "baz", ["bdir", "cdir"])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "bar", ["adir"])
        ];

        const actual = filterBookmarksByDirs(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("lower - first dir - multiple bms", function () {
        const query = "dir";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["dir1"]),
            new BookmarkModel("3", "url3", "baz", ["dir2", "subdir"])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "bar", ["dir1"]),
            new BookmarkModel("3", "url3", "baz", ["dir2", "subdir"])
        ];

        const actual = filterBookmarksByDirs(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("lower - second dir - one bm", function () {
        const query = "cdir";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["adir"]),
            new BookmarkModel("3", "url3", "baz", ["bdir", "cdir"])
        ];
        const expected = [
            new BookmarkModel("3", "url3", "baz", ["bdir", "cdir"])
        ];

        const actual = filterBookmarksByDirs(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("capital - first dir - multiple bms", function () {
        const query = "Dir";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["Dir"]),
            new BookmarkModel("3", "url3", "baz", ["Dir", "subdir"])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "bar", ["Dir"]),
            new BookmarkModel("3", "url3", "baz", ["Dir", "subdir"])
        ];

        const actual = filterBookmarksByDirs(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("capital - second dir - one bm", function () {
        const query = "Cdir";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["adir"]),
            new BookmarkModel("3", "url3", "baz", ["bdir", "Cdir"])
        ];
        const expected = [
            new BookmarkModel("3", "url3", "baz", ["bdir", "Cdir"])
        ];

        const actual = filterBookmarksByDirs(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("CAPS", function () {
        const query = "BDIR";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar",["adir"]),
            new BookmarkModel("3", "url3", "baz", ["bdir", "cdir"])
        ];
        const expected = [];

        const actual = filterBookmarksByDirs(query, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
