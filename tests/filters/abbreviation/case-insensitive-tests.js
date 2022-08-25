import assert from "assert";

import { filterBookmarksByAbbreviation } from "../../../src/background/filters/index.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

describe("filter by abbreviation - case insensitive", function () {
    it("no bookmarks", function () {
        const query = "fb";
        const bookmarks = [];
        const expected = [];

        const actual = filterBookmarksByAbbreviation(query, bookmarks, false);

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

        const actual = filterBookmarksByAbbreviation(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("title only", function () {
        const query = "fb";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo bar", []),
            new BookmarkModel("2", "url2", "Test", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [
            new BookmarkModel("1", "url1", "foo bar", [])
        ];

        const actual = filterBookmarksByAbbreviation(query, bookmarks, false);

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

        const actual = filterBookmarksByAbbreviation(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("title and dirs", function () {
        const query = "bm";
        const bookmarks = [
            new BookmarkModel("1", "url1", "match", ["foo", "bar"]),
            new BookmarkModel("2", "url2", "Test", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [
            new BookmarkModel("1", "url1", "match", ["foo", "bar"])
        ];

        const actual = filterBookmarksByAbbreviation(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("title and dirs - complex query", function () {
        const query = "ba m";
        const bookmarks = [
            new BookmarkModel("1", "url1", "match", ["foo", "bar"]),
            new BookmarkModel("2", "url2", "Test", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [
            new BookmarkModel("1", "url1", "match", ["foo", "bar"])
        ];

        const actual = filterBookmarksByAbbreviation(query, bookmarks, false);

        assert.deepEqual(actual, expected);
    });
});
