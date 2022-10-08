import assert from "node:assert";

import { Sync } from "../../src/common/storages/index.js";

describe("storage: sync", function () {
    const syncStorage = new Map();

    before(() => {
        global.chrome = {};
        global.chrome.storage = {};
        global.chrome.storage.sync = {};
        global.chrome.storage.sync.get = async ([key]) => {
            return Promise.resolve({ [key]: syncStorage.get(key) });
        };
        global.chrome.storage.sync.set = (object) => {
            for (const key in object) {
                syncStorage.set(key, object[key]);
            }
        };
    });

    beforeEach(() => {
        syncStorage.clear();
    });

    it("get undefined", async () => {
        const key = "test";

        const expected = undefined;

        const actual = await Sync.get(key);

        assert.equal(actual, expected);
    });

    it("get", async () => {
        const key = "test";
        const value = "value";
        syncStorage.set(key, value);

        const expected = "value";

        const actual = await Sync.get(key);

        assert.equal(actual, expected);
    });

    it("set", async () => {
        const key = "test";
        const value = "value";

        const expected = "value";

        await Sync.set(key, value);
        const actual = syncStorage.get(key);

        assert.equal(actual, expected);
    });

});
