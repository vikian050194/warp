import assert from "assert";

import { filter } from "../../../src/background/filters.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

describe("complex filter by dirs", function () {
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
            new BookmarkModel(["dir1"], "bar"),
            new BookmarkModel(["dir2"], "baz")
        ];
        const expected = [];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("lower", function () {
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

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("capital - first", function () {
        const query = "dir";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel(["Dir1"], "bar"),
            new BookmarkModel(["foo", "Dir"], "baz")
        ];
        const expected = [
            new BookmarkModel(["Dir1"], "bar"),
            new BookmarkModel(["foo", "Dir"], "baz")
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("CAPS", function () {
        const query = "BDIR";
        const bookmarks = [
            new BookmarkModel([], "foo"),
            new BookmarkModel(["adir"], "bar"),
            new BookmarkModel(["bdir", "cdir"], "baz")
        ];
        const expected = [new BookmarkModel(["bdir", "cdir"], "baz")];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
