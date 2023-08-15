import assert from "node:assert";

import { filterHistoryByCount as filter } from "../../../src/background/filters/index.js";
import { HistoryModel } from "../../../src/common/models/index.js";

describe("filter by max count", function () {
    it("empty history", function () {
        const threshold = 10;
        const history = [
        ];
        const expected = [
        ];

        const actual = filter(history, threshold);

        assert.deepEqual(actual, expected);
    });

    it("history is less than threshold", function () {
        const threshold = 10;
        const history = [
            new HistoryModel("1", "date1")
        ];
        const expected = [
            new HistoryModel("1", "date1")
        ];

        const actual = filter(history, threshold);

        assert.deepEqual(actual, expected);
    });

    it("history equals to threshold", function () {
        const threshold = 3;
        const history = [
            new HistoryModel("1", "date1"),
            new HistoryModel("2", "date2"),
            new HistoryModel("3", "date3")
        ];
        const expected = [
            new HistoryModel("1", "date1"),
            new HistoryModel("2", "date2"),
            new HistoryModel("3", "date3")
        ];

        const actual = filter(history, threshold);

        assert.deepEqual(actual, expected);
    });

    it("history is greater than threshold", function () {
        const threshold = 2;
        const history = [
            new HistoryModel("1", "date1"),
            new HistoryModel("2", "date2"),
            new HistoryModel("3", "date3")
        ];
        const expected = [
            new HistoryModel("2", "date2"),
            new HistoryModel("3", "date3")
        ];

        const actual = filter(history, threshold);

        assert.deepEqual(actual, expected);
    });
});
