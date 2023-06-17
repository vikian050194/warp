import assert from "node:assert";

import { getTranslation } from "../../src/options/translation.js";

describe("getTranslation", function () {
    it("expected key", function () {
        const input = "as_is";
        const expected = "as is";

        const actual = getTranslation(input);

        assert.equal(actual, expected);
    });

    it("unexpected key", function () {
        const input = "test";
        const expected = "test";

        const actual = getTranslation(input);

        assert.equal(actual, expected);
    });
});
