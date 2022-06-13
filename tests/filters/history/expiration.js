import assert from "assert";

import { filterByTime } from "../../../src/background/filters.js";
import { HistoryItem } from "../../../src/common/models/index.js";

describe("filter by expiration time", function () {
    it("empty history", function () {
        const threshold = new Date("2022-06-12T12:01:20.000Z");
        const history = [
        ];
        const expected = [
        ];

        const actual = filterByTime(history, threshold);

        assert.deepEqual(actual, expected);
    });

    it("history is not expired", function () {
        const threshold = new Date("2022-06-12T12:00:20.000Z");
        const history = [
            new HistoryItem("1", "2022-06-12T12:01:20.000Z")
        ];
        const expected = [
            new HistoryItem("1", "2022-06-12T12:01:20.000Z")
        ];

        const actual = filterByTime(history, threshold);

        assert.deepEqual(actual, expected);
    });

    it("one history item is expired", function () {
        const threshold = new Date("2022-06-12T12:30:00.000Z");
        const history = [
            new HistoryItem("1", "2022-06-12T12:00:20.000Z"),
            new HistoryItem("2", "2022-06-12T13:00:00.000Z"),
            new HistoryItem("3", "2022-06-12T14:00:00.000Z")
        ];
        const expected = [
            new HistoryItem("2", "2022-06-12T13:00:00.000Z"),
            new HistoryItem("3", "2022-06-12T14:00:00.000Z")
        ];

        const actual = filterByTime(history, threshold);

        assert.deepEqual(actual, expected);
    });

    it("history is expired", function () {
        const threshold = new Date("2022-06-13T12:01:20.370Z");
        const history = [
            new HistoryItem("1", "2022-06-12T12:01:20.370Z"),
            new HistoryItem("2", "2022-06-12T13:01:20.370Z"),
            new HistoryItem("3", "2022-06-12T14:01:20.370Z")
        ];
        const expected = [
        ];

        const actual = filterByTime(history, threshold);

        assert.deepEqual(actual, expected);
    });
});
