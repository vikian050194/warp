import assert from "node:assert";

import { dom } from "../../src/common/index.js";
import { MockDomElement } from "./mock.js";

describe("dom: makeElementCreator", function () {
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
        const makeDiv = dom.makeElementCreator("div");

        const actual = makeDiv();

        assert.equal(actual.tag, "div");
    });

    it("div with id, className and text", () => {
        const makeDiv = dom.makeElementCreator("div");

        const actual = makeDiv({
            id: "123",
            className: "456",
            text: "789"
        });
        const [child] = actual.children;
        
        assert.equal(actual.tag, "div");
        assert.equal(actual.id, "123");
        assert.equal(actual.className, "456");
        assert.equal(child.tag, "text");
        assert.equal(child.value, "789");
    });
});
