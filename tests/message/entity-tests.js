import assert from "node:assert";

import { Message } from "../../src/common/message/index.js";

describe("message", function () {
    it("entity", function () {
        const actual = new Message("type", "value");

        assert.equal(actual.type, "type");
        assert.equal(actual.value, "value");
    });
});
