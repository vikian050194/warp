import assert from "node:assert";

import { Message, send } from "../../src/common/message/index.js";

describe("send", function () {
    let isCalled = false;
    let args = null;

    before(() => {
        global.chrome = {};
        global.chrome.runtime = {};
        global.chrome.runtime.sendMessage = function () {
            isCalled = true;
            args = [...arguments];
        };
    });

    beforeEach(() => {
        isCalled = false;
        args = null;
    });

    it("queryMessage", async () => {
        const query = "test";
        await send.queryMessage(query);

        assert.equal(isCalled, true);
        assert.deepEqual(args, [new Message("query", "test")]);
    });

    it("updateMessage", async () => {
        await send.updateMessage();

        assert.equal(isCalled, true);
        assert.deepEqual(args, [new Message("update", undefined)]);
    });

    it("callMessage", async () => {
        const id = 1234;
        await send.callMessage(id);

        assert.equal(isCalled, true);
        assert.deepEqual(args, [new Message("call", 1234)]);
    });
});
