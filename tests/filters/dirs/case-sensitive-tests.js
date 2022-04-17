import assert from "assert";

import { filterByDirs } from "../../../src/background/filters.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

describe("filter by dirs - case sensitive", function () {
    it("no bookmarks", function () {
        const query = "test";
        const bookmarks = [];
        const expected = [];

        const actual = filterByDirs(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("no matches", function () {
        const query = "test";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel(["dir1"], "bar"),
            new BookmarkModel(["dir2", "dir3"], "baz")
        ];
        const expected = [];

        const actual = filterByDirs(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("lower - first dir - one bm", function () {
        const query = "adir";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel(["adir"], "bar"),
            new BookmarkModel(["bdir", "cdir"], "baz")
        ];
        const expected = [new BookmarkModel(["adir"], "bar")];

        const actual = filterByDirs(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("lower - first dir - multiple bms", function () {
        const query = "dir";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel(["dir1"], "bar"),
            new BookmarkModel(["dir2", "subdir"], "baz")
        ];
        const expected = [
            new BookmarkModel(["dir1"], "bar"),
            new BookmarkModel(["dir2", "subdir"], "baz")
        ];

        const actual = filterByDirs(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("lower - second dir - one bm", function () {
        const query = "cdir";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel(["adir"], "bar"),
            new BookmarkModel(["bdir", "cdir"], "baz")
        ];
        const expected = [new BookmarkModel(["bdir", "cdir"], "baz")];

        const actual = filterByDirs(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("capital - first dir - multiple bms", function () {
        const query = "Dir";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel(["Dir"], "bar"),
            new BookmarkModel(["Dir", "subdir"], "baz")
        ];
        const expected = [
            new BookmarkModel(["Dir"], "bar"),
            new BookmarkModel(["Dir", "subdir"], "baz")
        ];

        const actual = filterByDirs(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("capital - second dir - one bm", function () {
        const query = "Cdir";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel(["adir"], "bar"),
            new BookmarkModel(["bdir", "Cdir"], "baz")
        ];
        const expected = [new BookmarkModel(["bdir", "Cdir"], "baz")];

        const actual = filterByDirs(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("CAPS", function () {
        const query = "BDIR";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel(["adir"], "bar"),
            new BookmarkModel(["bdir", "cdir"], "baz")
        ];
        const expected = [];

        const actual = filterByDirs(query, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
