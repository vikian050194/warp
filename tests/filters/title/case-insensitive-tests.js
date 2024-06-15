import assert from "node:assert";

import { Behavior, TitleFilter } from "../../../src/background/filters/index.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

const behavior = new Behavior();
behavior.caseSensitive = false;
behavior.startsWith = true;
const testFilter = new TitleFilter(behavior);
const filter = testFilter.filter;

describe("class filter by title - case insensitive", function () {
    it("capital - first", function () {
        const query = "test";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "Test", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "Test", [])
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("capital - all", function () {
        const query = "test";
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
        const query = "TEST";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "test", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("second and third word", function () {
        const query = "zo";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo", []),
            new BookmarkModel("2", "url2", "Test zoom", []),
            new BookmarkModel("3", "url3", "baz hi zoro", [])
        ];
        const expected = [
            new BookmarkModel("2", "url2", "Test zoom", []),
            new BookmarkModel("3", "url3", "baz hi zoro", [])
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
