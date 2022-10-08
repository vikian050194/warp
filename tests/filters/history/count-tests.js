import assert from "node:assert";

import { filterHistoryByCount } from "../../../src/background/filters/index.js";
import { HistoryItem } from "../../../src/common/models/index.js";

describe("filter by max count", function () {
    it("empty history", function () {
        const threshold = 10;
        const history = [
        ];
        const expected = [
        ];

        const actual = filterHistoryByCount(history, threshold);

        assert.deepEqual(actual, expected);
    });

    it("history is less than threshold", function () {
        const threshold = 10;
        const history = [
            new HistoryItem("1", "date1")
        ];
        const expected = [
            new HistoryItem("1", "date1")
        ];

        const actual = filterHistoryByCount(history, threshold);

        assert.deepEqual(actual, expected);
    });

    it("history equals to threshold", function () {
        const threshold = 3;
        const history = [
            new HistoryItem("1", "date1"),
            new HistoryItem("2", "date2"),
            new HistoryItem("3", "date3")
        ];
        const expected = [
            new HistoryItem("1", "date1"),
            new HistoryItem("2", "date2"),
            new HistoryItem("3", "date3")
        ];

        const actual = filterHistoryByCount(history, threshold);

        assert.deepEqual(actual, expected);
    });

    it("history is greater than threshold", function () {
        const threshold = 2;
        const history = [
            new HistoryItem("1", "date1"),
            new HistoryItem("2", "date2"),
            new HistoryItem("3", "date3")
        ];
        const expected = [
            new HistoryItem("2", "date2"),
            new HistoryItem("3", "date3")
        ];

        const actual = filterHistoryByCount(history, threshold);

        assert.deepEqual(actual, expected);
    });
});
