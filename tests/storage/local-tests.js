import assert from "node:assert";

import { Local } from "../../src/common/storages/index.js";

describe("storage: local", function () {
    const localStorage = new Map();

    before(() => {
        global.chrome = {};
        global.chrome.storage = {};
        global.chrome.storage.local = {};
        global.chrome.storage.local.get = async ([key]) => {
            return Promise.resolve({ [key]: localStorage.get(key) });
        };
        global.chrome.storage.local.set = (object) => {
            for (const key in object) {
                localStorage.set(key, object[key]);
            }
        };
    });

    beforeEach(() => {
        localStorage.clear();
    });

    it("get undefined", async () => {
        const key = "test";

        const expected = undefined;

        const actual = await Local.get(key);

        assert.equal(actual, expected);
    });

    it("get", async () => {
        const key = "test";
        const value = "value";
        localStorage.set(key, value);

        const expected = "value";

        const actual = await Local.get(key);

        assert.equal(actual, expected);
    });

    it("set", async () => {
        const key = "test";
        const value = "value";

        const expected = "value";

        await Local.set(key, value);
        const actual = localStorage.get(key);

        assert.equal(actual, expected);
    });

});
