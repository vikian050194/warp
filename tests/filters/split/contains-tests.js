import assert from "node:assert";

import { Behavior, SplitFilter } from "../../../src/background/filters/index.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

const behavior = new Behavior();
behavior.caseSensitive = true;
behavior.startsWith = false;
const testFilter = new SplitFilter(behavior);
const filter = testFilter.filter;

describe("filter by split - contains", function () {
    it("no bookmarks", function () {
        const query = "FB";
        const bookmarks = [];
        const expected = [];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("no matches", function () {
        const query = "FB";
        const bookmarks = [
            new BookmarkModel("1", "url1", "Foo", []),
            new BookmarkModel("2", "url2", "Bar", []),
            new BookmarkModel("3", "url3", "Baz", [])
        ];
        const expected = [];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("title only", function () {
        const query = "oo 3";
        const bookmarks = [
            new BookmarkModel("1", "url1", "foo 123", []),
            new BookmarkModel("2", "url2", "foo bar", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [
            new BookmarkModel("1", "url1", "foo 123", [])
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
