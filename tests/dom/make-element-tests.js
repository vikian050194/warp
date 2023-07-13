import assert from "node:assert";

import { dom } from "../../src/common/index.js";
import { MockDomElement } from "./mock.js";

describe("dom: makeElement", function () {
    before(() => {
        global.document = {
            createElement: tag => {
                return new MockDomElement(tag);
            },
            createTextNode: value => {
                return { tag: "text", value };
            }
        };
    });

    it("pure div", () => {
        const actual = dom.makeElement("div");

        assert.equal(actual.tag, "div");
        assert.equal(actual.child, undefined);
    });

    it("div with id", () => {
        const actual = dom.makeElement("div", { id: "123" });

        assert.equal(actual.tag, "div");
        assert.equal(actual.id, "123");
    });

    it("div with className", () => {
        const actual = dom.makeElement("div", { className: "456" });

        assert.equal(actual.tag, "div");
        assert.equal(actual.className, "456");
    });

    it("div with classList", () => {
        const actual = dom.makeElement("div", { classList: ["456", "abc"] });

        assert.equal(actual.tag, "div");
        assert.equal(actual.className, "456 abc");
    });

    it("div with text", () => {
        const actual = dom.makeElement("div", { text: "789" });
        const [child] = actual.children;

        assert.equal(actual.tag, "div");
        assert.equal(child.tag, "text");
        assert.equal(child.value, "789");
    });

    it("div with custom attribute", () => {
        const actual = dom.makeElement("div", { "data-test": "target" });

        assert.equal(actual.tag, "div");
        assert.equal(actual["data-test"], "target");
    });
});
