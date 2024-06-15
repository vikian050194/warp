import assert from "node:assert";

import { Behavior, TitleFilter } from "../../../src/background/filters/index.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

const behavior = new Behavior();
behavior.caseSensitive = true;
behavior.startsWith = false;
const testFilter = new TitleFilter(behavior);
const filter = testFilter.filter;

describe("filter by title - contains", function () {
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
            new BookmarkModel("2", "url2", "bar", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("lower", function () {
        const query = "es";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "test", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "test", [])
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("capital - middle", function () {
        const query = "ES";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "tESt", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "tESt", [])
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("capital - all", function () {
        const query = "ES";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "TEST", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "TEST", [])
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("CAPS", function () {
        const query = "ES";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "test", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
