import assert from "node:assert";

import { AbbreviationFilter, Behavior } from "../../../src/background/filters/index.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

const behavior = new Behavior();
behavior.caseSensitive = false;
behavior.startsWith = true;
const testFilter = new AbbreviationFilter(behavior);
const filter = testFilter.filter;

describe("filter by abbreviation - case insensitive", function () {
    it("no bookmarks", function () {
        const query = "fb";
        const bookmarks = [];
        const expected = [];

        const actual = filter(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("no matches", function () {
        const query = "fb";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "bar", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [];

        const actual = filter(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("no results", function () {
        const query = "b";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo bar", []),
            new BookmarkModel("2", "url2", "Test", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [];

        const actual = filter(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("titles only", function () {
        const query = "mm";
        const bookmarks = [
            new BookmarkModel("1", "url1", "match me", ["foo", "bar"]),
            new BookmarkModel("2", "url2", "Test", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [
            new BookmarkModel("1", "url1", "match me", ["foo", "bar"])
        ];

        const actual = filter(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("dirs only", function () {
        const query = "fb";
        const bookmarks = [
            new BookmarkModel("1", "url1", "match", ["foo", "bar"]),
            new BookmarkModel("2", "url2", "Test", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [
            new BookmarkModel("1", "url1", "match", ["foo", "bar"])
        ];

        const actual = filter(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("title and dirs", function () {
        const query = "fm";
        const bookmarks = [
            new BookmarkModel("1", "url1", "match", ["foo", "bar"]),
            new BookmarkModel("2", "url2", "Test", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [
            new BookmarkModel("1", "url1", "match", ["foo", "bar"])
        ];

        const actual = filter(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("title and dirs - all levels", function () {
        const query = "fbm";
        const bookmarks = [
            new BookmarkModel("1", "url1", "match", ["foo", "bar"]),
            new BookmarkModel("2", "url2", "Test", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [
            new BookmarkModel("1", "url1", "match", ["foo", "bar"])
        ];

        const actual = filter(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });
});
