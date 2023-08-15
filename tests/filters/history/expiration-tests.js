import assert from "node:assert";

import { filterHistoryByTime as filter } from "../../../src/background/filters/index.js";
import { HistoryModel } from "../../../src/common/models/index.js";

describe("filter by expiration time", function () {
    it("empty history", function () {
        const threshold = new Date("2022-06-12T12:01:20.000Z");
        const history = [
        ];
        const expected = [
        ];

        const actual = filter(history, threshold);

        assert.deepEqual(actual, expected);
    });

    it("history is not expired", function () {
        const threshold = new Date("2022-06-12T12:00:20.000Z");
        const history = [
            new HistoryModel("1", "2022-06-12T12:01:20.000Z")
        ];
        const expected = [
            new HistoryModel("1", "2022-06-12T12:01:20.000Z")
        ];

        const actual = filter(history, threshold);

        assert.deepEqual(actual, expected);
    });

    it("one history item is expired", function () {
        const threshold = new Date("2022-06-12T12:30:00.000Z");
        const history = [
            new HistoryModel("1", "2022-06-12T12:00:20.000Z"),
            new HistoryModel("2", "2022-06-12T13:00:00.000Z"),
            new HistoryModel("3", "2022-06-12T14:00:00.000Z")
        ];
        const expected = [
            new HistoryModel("2", "2022-06-12T13:00:00.000Z"),
            new HistoryModel("3", "2022-06-12T14:00:00.000Z")
        ];

        const actual = filter(history, threshold);

        assert.deepEqual(actual, expected);
    });

    it("history is expired", function () {
        const threshold = new Date("2022-06-13T12:01:20.370Z");
        const history = [
            new HistoryModel("1", "2022-06-12T12:01:20.370Z"),
            new HistoryModel("2", "2022-06-12T13:01:20.370Z"),
            new HistoryModel("3", "2022-06-12T14:01:20.370Z")
        ];
        const expected = [
        ];

        const actual = filter(history, threshold);

        assert.deepEqual(actual, expected);
    });
});
