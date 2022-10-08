import assert from "node:assert";

import { groupByIdAndOrderDesc as group } from "../../src/frequency/join.js";
import {
    FreakItem,
    HistoryItem
} from "../../src/common/index.js";

describe("frequency: group history", function () {
    it("empty history", () => {
        const history = [];

        const expected = [];

        const actual = group(history);

        assert.deepEqual(actual, expected);
    });

    it("three different items", () => {
        const history = [
            new HistoryItem("1", "date1"),
            new HistoryItem("2", "date2"),
            new HistoryItem("1", "date3"),
            new HistoryItem("3", "date4"),
            new HistoryItem("1", "date5")
        ];

        const expected = [
            new FreakItem("1", 3),
            new FreakItem("2", 1),
            new FreakItem("3", 1)
        ];

        const actual = group(history);

        assert.deepEqual(actual, expected);
    });
});
