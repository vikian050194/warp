import assert from "node:assert";

import { filterBookmarks } from "../../../src/background/filters/index.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

const filter = (q, b) => filterBookmarks(q, b, true);

describe("complex filter by title", function () {
    it("single chunk - lower", function () {
        const query = "test";
        const bookmarks = [
            new BookmarkModel("1", "url1", "Test789", []),
            new BookmarkModel("2", "url2", "TEST456", []),
            new BookmarkModel("3", "url3", "test123", [])
        ];
        const expected = [
            new BookmarkModel("3", "url3", "test123", [])
        ];

        const actual = filter(query, bookmarks);

        assert.deepEqual(actual, expected);
    });
});
