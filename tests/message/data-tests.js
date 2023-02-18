import assert from "node:assert";

import { CallData } from "../../src/common/message/index.js";

describe("message", function () {
    it("data", function () {
        const actual = new CallData("bookmarkId", "tabId", "tabIndex", "groupId", "newTab", "keepGroup");

        assert.equal(actual.bookmarkId, "bookmarkId");
        assert.equal(actual.tabId, "tabId");
        assert.equal(actual.tabIndex, "tabIndex");
        assert.equal(actual.groupId, "groupId");
        assert.equal(actual.newTab, "newTab");
        assert.equal(actual.keepGroup, "keepGroup");
    });
});
