import assert from "node:assert";

import { ComplexFilter, FilteringConfiguration } from "../../../src/background/filters/index.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

const configuration = new FilteringConfiguration();
configuration.behavior.caseSensitive = false;
configuration.behavior.startsWith = true;
const testFilter = new ComplexFilter(configuration);
const filter = testFilter.filter;

describe("complex mix filter", function () {
    it("abbreviation - first level dir and title", function () {
        const query = "db";
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

    it("abbreviation - all levels dirs and title", function () {
        const query = "dsb";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
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

    it("split - all levels dirs and title", function () {
        const query = "di s ba";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", ["dir1"]),
            new BookmarkModel("3", "url3", "baz", ["dir2", "subdir"])
        ];
        const expected = [
            new BookmarkModel("3", "url3", "baz", ["dir2", "subdir"])
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    // TODO add more unit tests for ComplexFilter
    it("title before abbreviation", function () {
        const query = "aa";
        const bookmarks = [
            new BookmarkModel("1", "url1", "ac", ["ab"]),
            new BookmarkModel("2", "url2", "aaf", ["dir1"])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "aaf", ["dir1"]),
            new BookmarkModel("1", "url1", "ac", ["ab"])
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
