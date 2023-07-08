import assert from "node:assert";

import { groupByIdAndOrderDesc as group } from "../../src/frequency/join.js";
import {
    FrequencyModel,
    HistoryModel
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
            new HistoryModel("1", "date1"),
            new HistoryModel("2", "date2"),
            new HistoryModel("1", "date3"),
            new HistoryModel("3", "date4"),
            new HistoryModel("1", "date5")
        ];

        const expected = [
            new FrequencyModel("1", 3),
            new FrequencyModel("2", 1),
            new FrequencyModel("3", 1)
        ];

        const actual = group(history);

        assert.deepEqual(actual, expected);
    });
});
