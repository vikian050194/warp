import assert from "node:assert";

import { filterBookmarksBySplit as filter } from "../../../src/background/filters/index.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

describe("filter by split - case sensitive", function () {
    it("no bookmarks", function () {
        const query = "FB";
        const bookmarks = [];
        const expected = [];

        const actual = filter(query, bookmarks, true);

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

        const actual = filter(query, bookmarks, true);

        assert.deepEqual(actual, expected);
    });

    it("title only", function () {
        const query = "Fo Ba";
        const bookmarks = [
            new BookmarkModel("1", "url1", "Foo Bar", []),
            new BookmarkModel("2", "url2", "foo Bar", []),
            new BookmarkModel("3", "url3", "baz", [])
        ];
        const expected = [
            new BookmarkModel("1", "url1", "Foo Bar", [])
        ];

        const actual = filter(query, bookmarks, true);

        assert.deepEqual(actual, expected);
    });
});
