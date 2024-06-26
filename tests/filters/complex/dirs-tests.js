import assert from "node:assert";

import { ComplexFilter, FilteringConfiguration } from "../../../src/background/filters/index.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

const configuration = new FilteringConfiguration();
configuration.behavior.caseSensitive = false;
configuration.behavior.startsWith = true;
const testFilter = new ComplexFilter(configuration);
const filter = testFilter.filter;

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
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["dir1"]),
            new BookmarkModel("3", "url3", "baz", ["dir2"])
        ];
        const expected = [];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("lower", function () {
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

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("capital - first", function () {
        const query = "dir";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["Dir1"]),
            new BookmarkModel("3", "url3", "baz", ["foo", "Dir"])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "bar", ["Dir1"]),
            new BookmarkModel("3", "url3", "baz", ["foo", "Dir"])
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("CAPS", function () {
        const query = "BDIR";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["adir"]),
            new BookmarkModel("3", "url3", "baz", ["bdir", "cdir"])
        ];
        const expected = [
            new BookmarkModel("3", "url3", "baz", ["bdir", "cdir"])
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
