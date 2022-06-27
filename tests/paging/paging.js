import assert from "assert";

import { splitByPages } from "../../src/popup/paging.js";

describe("paging", function () {
    it("empty input", function () {
        const resultsPerPage = 10;
        const input = [

        ];
        const expected = [
            []
        ];

        const actual = splitByPages(input, resultsPerPage);

        assert.deepEqual(actual, expected);
    });

    it("input less than threshold", function () {
        const resultsPerPage = 10;
        const input = [
            "aaa",
            "bbb",
            "ccc"
        ];
        const expected = [
            [
                "aaa",
                "bbb",
                "ccc"
            ]
        ];

        const actual = splitByPages(input, resultsPerPage);

        assert.deepEqual(actual, expected);
    });

    it("input is equal to threshold", function () {
        const resultsPerPage = 3;
        const input = [
            "aaa",
            "bbb",
            "ccc"
        ];
        const expected = [
            [
                "aaa",
                "bbb",
                "ccc"
            ]
        ];

        const actual = splitByPages(input, resultsPerPage);

        assert.deepEqual(actual, expected);
    });

    it("input is splited to two pages - second page is not full", function () {
        const resultsPerPage = 3;
        const input = [
            "aaa",
            "bbb",
            "ccc",
            "ddd",
            "eee"
        ];
        const expected = [
            [
                "aaa",
                "bbb",
                "ccc"
            ], [
                "ddd",
                "eee"
            ]
        ];

        const actual = splitByPages(input, resultsPerPage);

        assert.deepEqual(actual, expected);
    });

    it("input is splited to two pages - second page is full", function () {
        const resultsPerPage = 3;
        const input = [
            "aaa",
            "bbb",
            "ccc",
            "ddd",
            "eee",
            "fff"
        ];
        const expected = [
            [
                "aaa",
                "bbb",
                "ccc"
            ], [
                "ddd",
                "eee",
                "fff"
            ]
        ];

        const actual = splitByPages(input, resultsPerPage);

        assert.deepEqual(actual, expected);
    });
});
