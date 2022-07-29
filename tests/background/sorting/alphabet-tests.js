import assert from "assert";

import { sortByAlphabet } from "../../../src/background/sorting/alphabet.js";
import { BookmarkModel } from "../../../src/common/index.js";

describe("sorting by alphabet", function () {
    it("no bookmarks - asc", () => {
        const bookmarks = [];

        const expected = [];

        const actual = sortByAlphabet(bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("no bookmarks - desc", () => {
        const bookmarks = [];

        const expected = [];

        const actual = sortByAlphabet(bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("one bookmark - asc", () => {
        const bookmarks = [
            new BookmarkModel("1", "url1", "bm", ["dir1"])
        ];

        const expected = [
            new BookmarkModel("1", "url1", "bm", ["dir1"])
        ];

        const actual = sortByAlphabet(bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("one bookmark - desc", () => {
        const bookmarks = [
            new BookmarkModel("1", "url1", "bm", ["dir1"])
        ];

        const expected = [
            new BookmarkModel("1", "url1", "bm", ["dir1"])
        ];

        const actual = sortByAlphabet(bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("one bookmark with equal title - asc", () => {
        const bookmarks = [
            new BookmarkModel("1", "url1", "bm", ["dir1"]),
            new BookmarkModel("2", "url1", "bm", ["dir1"])
        ];

        const expected = [
            new BookmarkModel("1", "url1", "bm", ["dir1"]),
            new BookmarkModel("2", "url1", "bm", ["dir1"])
        ];

        const actual = sortByAlphabet(bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("one bookmark with equal title - desc", () => {
        const bookmarks = [
            new BookmarkModel("1", "url1", "bm", ["dir1"]),
            new BookmarkModel("2", "url1", "bm", ["dir1"])
        ];

        const expected = [
            new BookmarkModel("1", "url1", "bm", ["dir1"]),
            new BookmarkModel("2", "url1", "bm", ["dir1"])
        ];

        const actual = sortByAlphabet(bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks in root dir - asc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];

        const expected = [
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("3", "url3", "bm3", [])
        ];

        const actual = sortByAlphabet(bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks in root dir - desc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("1", "url1", "bm1", []),
            new BookmarkModel("2", "url2", "bm2", [])
        ];

        const expected = [
            new BookmarkModel("3", "url3", "bm3", []),
            new BookmarkModel("2", "url2", "bm2", []),
            new BookmarkModel("1", "url1", "bm1", [])
        ];

        const actual = sortByAlphabet(bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks in one dir - asc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm3", ["dir1"]),
            new BookmarkModel("1", "url1", "bm1", ["dir1"]),
            new BookmarkModel("2", "url2", "bm2", ["dir1"])
        ];

        const expected = [
            new BookmarkModel("1", "url1", "bm1", ["dir1"]),
            new BookmarkModel("2", "url2", "bm2", ["dir1"]),
            new BookmarkModel("3", "url3", "bm3", ["dir1"])
        ];

        const actual = sortByAlphabet(bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks in one dir - desc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm3", ["dir1"]),
            new BookmarkModel("1", "url1", "bm1", ["dir1"]),
            new BookmarkModel("2", "url2", "bm2", ["dir1"])
        ];

        const expected = [
            new BookmarkModel("3", "url3", "bm3", ["dir1"]),
            new BookmarkModel("2", "url2", "bm2", ["dir1"]),
            new BookmarkModel("1", "url1", "bm1", ["dir1"])
        ];

        const actual = sortByAlphabet(bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks in different dirs - asc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm", ["dir3"]),
            new BookmarkModel("1", "url1", "bm", ["dir1"]),
            new BookmarkModel("2", "url2", "bm", ["dir2"])
        ];

        const expected = [
            new BookmarkModel("1", "url1", "bm", ["dir1"]),
            new BookmarkModel("2", "url2", "bm", ["dir2"]),
            new BookmarkModel("3", "url3", "bm", ["dir3"])
        ];

        const actual = sortByAlphabet(bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks in different dirs - desc", () => {
        const bookmarks = [
            new BookmarkModel("3", "url3", "bm", ["dir3"]),
            new BookmarkModel("1", "url1", "bm", ["dir1"]),
            new BookmarkModel("2", "url2", "bm", ["dir2"])
        ];

        const expected = [
            new BookmarkModel("3", "url3", "bm", ["dir3"]),
            new BookmarkModel("2", "url2", "bm", ["dir2"]),
            new BookmarkModel("1", "url1", "bm", ["dir1"])
        ];

        const actual = sortByAlphabet(bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks in different dirs and levels - asc", () => {
        const bookmarks = [
            new BookmarkModel("1", "url1", "bm", ["dir2", "subdir2"]),
            new BookmarkModel("2", "url2", "bm", ["dir3", "subdir3", "subsubdir3"]),
            new BookmarkModel("3", "url3", "bm", ["dir1"])
        ];

        const expected = [
            new BookmarkModel("3", "url3", "bm", ["dir1"]),
            new BookmarkModel("1", "url1", "bm", ["dir2", "subdir2"]),
            new BookmarkModel("2", "url2", "bm", ["dir3", "subdir3", "subsubdir3"])
        ];

        const actual = sortByAlphabet(bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks in different dirs and levels - desc", () => {
        const bookmarks = [
            new BookmarkModel("1", "url1", "bm", ["dir2", "subdir2"]),
            new BookmarkModel("2", "url2", "bm", ["dir3", "subdir3", "subsubdir3"]),
            new BookmarkModel("3", "url3", "bm", ["dir1"])
        ];

        const expected = [
            new BookmarkModel("2", "url2", "bm", ["dir3", "subdir3", "subsubdir3"]),
            new BookmarkModel("1", "url1", "bm", ["dir2", "subdir2"]),
            new BookmarkModel("3", "url3", "bm", ["dir1"])
        ];

        const actual = sortByAlphabet(bookmarks, false);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks in second level - asc", () => {
        const bookmarks = [
            new BookmarkModel("1", "url1", "a", ["dir", "subdir2"]),
            new BookmarkModel("2", "url2", "b", ["dir", "subdir2"]),
            new BookmarkModel("3", "url3", "c", ["dir", "subdir1"])
        ];

        const expected = [
            new BookmarkModel("3", "url3", "c", ["dir", "subdir1"]),
            new BookmarkModel("1", "url1", "a", ["dir", "subdir2"]),
            new BookmarkModel("2", "url2", "b", ["dir", "subdir2"])
        ];

        const actual = sortByAlphabet(bookmarks);

        assert.deepEqual(actual, expected);
    });

    it("three bookmarks in second level - desc", () => {
        const bookmarks = [
            new BookmarkModel("1", "url1", "a", ["dir", "subdir2"]),
            new BookmarkModel("2", "url2", "b", ["dir", "subdir2"]),
            new BookmarkModel("3", "url3", "c", ["dir", "subdir1"])
        ];

        const expected = [
            new BookmarkModel("2", "url2", "b", ["dir", "subdir2"]),
            new BookmarkModel("1", "url1", "a", ["dir", "subdir2"]),
            new BookmarkModel("3", "url3", "c", ["dir", "subdir1"])
        ];

        const actual = sortByAlphabet(bookmarks, false);

        assert.deepEqual(actual, expected);
    });
});
