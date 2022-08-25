import assert from "assert";

import { getCombinatios } from "../../src/background/filters/bookmarks.js";

const getAllCombinations = (n, k) => {
    const combinations = [];

    for (const combination of getCombinatios(n, k)) {
        combinations.push(combination);
    }

    return combinations;
};

describe("get combinations", function () {
    it("3 to 1", () => {
        const n = 3;
        const k = 1;

        const expected = [[0], [1], [2]];

        const actual = getAllCombinations(n, k);

        assert.deepEqual(actual, expected);
    });

    it("3 to 2", () => {
        const n = 3;
        const k = 2;

        const expected = [[0, 1], [0, 2], [1, 2]];

        const actual = getAllCombinations(n, k);

        assert.deepEqual(actual, expected);
    });

    it("3 to 3", () => {
        const n = 3;
        const k = 3;

        const expected = [[0, 1, 2]];

        const actual = getAllCombinations(n, k);

        assert.deepEqual(actual, expected);
    });

    it("4 to 2", () => {
        const n = 4;
        const k = 2;

        const expected = [
            [0, 1], [0, 2], [0, 3],
            [1, 2], [1, 3],
            [2, 3]
        ];

        const actual = getAllCombinations(n, k);

        assert.deepEqual(actual, expected);
    });

    it("4 to 3", () => {
        const n = 4;
        const k = 3;

        const expected = [
            [0, 1, 2],
            [0, 1, 3],
            [0, 2, 3],
            [1, 2, 3]
        ];

        const actual = getAllCombinations(n, k);

        assert.deepEqual(actual, expected);
    });
});
