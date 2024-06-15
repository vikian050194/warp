import assert from "node:assert";

import { ComplexFilter, FilteringConfiguration } from "../../../src/background/filters/index.js";
import { BookmarkModel } from "../../../src/common/models/index.js";

const configuration = new FilteringConfiguration();
configuration.behavior.caseSensitive = true;
configuration.behavior.startsWith = true;
const testFilter = new ComplexFilter(configuration);
const filter = testFilter.filter;

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
