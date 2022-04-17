import assert from "assert";

import { filterByDirs } from "../../../src/background/filters.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

describe("filter by dirs - case insensitive", function () {
    it("no matches", function () {
        const query = "test";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel(["dir1"], "bar"),
            new BookmarkModel(["dir2", "dir3"], "baz")
        ];
        const expected = [];

        const actual = filterByDirs(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("lower", function () {
        const query = "dir";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel(["Dir1"], "bar"),
            new BookmarkModel(["DIR2", "subdir"], "baz")
        ];
        const expected = [
            new BookmarkModel(["Dir1"], "bar"),
            new BookmarkModel(["DIR2", "subdir"], "baz")
        ];

        const actual = filterByDirs(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("capital - first", function () {
        const query = "cdir";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel(["adir"], "bar"),
            new BookmarkModel(["bdir", "Cdir"], "baz")
        ];
        const expected = [new BookmarkModel(["bdir", "Cdir"], "baz")];

        const actual = filterByDirs(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("capital - all", function () {
        const query = "bdir";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel(["adir"], "bar"),
            new BookmarkModel(["BDIR", "cdir"], "baz")
        ];
        const expected = [new BookmarkModel(["BDIR", "cdir"], "baz")];

        const actual = filterByDirs(query, bookmarks, false);

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

        const actual = filterByDirs(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });
});
