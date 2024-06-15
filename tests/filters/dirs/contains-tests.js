import assert from "node:assert";

import { Behavior, DirsFilter } from "../../../src/background/filters/index.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

const behavior = new Behavior();
behavior.caseSensitive = true;
behavior.startsWith = false;
const testFilter = new DirsFilter(behavior);
const filter = testFilter.filter;

describe("filter by dirs - contains", function () {
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
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["dir1"]),
            new BookmarkModel("3", "url3", "baz", ["dir2", "dir3"])
        ];
        const expected = [];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("lower - first dir - one bm", function () {
        const query = "ir1";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["adir1"]),
            new BookmarkModel("3", "url3", "baz", ["bdir2", "cdir3"])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "bar", ["adir1"])
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("lower - first dir - multiple bms", function () {
        const query = "dir";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["dir"]),
            new BookmarkModel("3", "url3", "baz", ["d2", "subdir"])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "bar", ["dir"]),
            new BookmarkModel("3", "url3", "baz", ["d2", "subdir"])
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
