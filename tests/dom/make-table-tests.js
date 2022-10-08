import assert from "node:assert";

import { dom } from "../../src/common/index.js";
import { MockDomElement } from "./mock.js";

describe("dom: makeTable", function () {
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

    it("empty table", () => {
        const columns = [];
        const collection = [];

        const actual = dom.makeTable(columns, collection);

        assert.equal(actual.tag, "table");

        const [head, body] = actual.children;

        assert.equal(head.tag, "thead");
        assert.equal(head.children.length, 1);

        const [headRow] = head.children;

        assert.equal(headRow.tag, "tr");
        assert.equal(headRow.children.length, 0);

        assert.equal(body.tag, "tbody");
        assert.equal(body.children.length, 0);
    });

    it("one column without rows", () => {
        const columns = [
            new dom.Column("key1", "Key 1")
        ];
        const collection = [];

        const actual = dom.makeTable(columns, collection);

        assert.equal(actual.tag, "table");

        const [head, body] = actual.children;

        assert.equal(head.tag, "thead");
        assert.equal(head.children.length, 1);

        const [headRow] = head.children;

        assert.equal(headRow.tag, "tr");
        assert.equal(headRow.children.length, 1);

        const [headCell] = headRow.children;

        assert.equal(headCell.tag, "th");
        assert.equal(headCell.children.length, 1);

        const [headCellText] = headCell.children;

        assert.equal(headCellText.tag, "text");
        assert.equal(headCellText.value, "Key 1");

        assert.equal(body.tag, "tbody");
        assert.equal(body.children.length, 0);
    });

    it("one column and one row", () => {
        const columns = [
            new dom.Column("key1", "Key 1")
        ];
        const collection = [
            {
                key1: "value1"
            }
        ];

        const actual = dom.makeTable(columns, collection);

        assert.equal(actual.tag, "table");

        const [head, body] = actual.children;

        assert.equal(head.tag, "thead");
        assert.equal(head.children.length, 1);

        const [headRow] = head.children;

        assert.equal(headRow.tag, "tr");
        assert.equal(headRow.children.length, 1);

        assert.equal(body.tag, "tbody");
        assert.equal(body.children.length, 1);

        const [bodyRow] = body.children;

        assert.equal(bodyRow.tag, "tr");
        assert.equal(bodyRow.children.length, 1);

        const [bodyCell] = bodyRow.children;

        assert.equal(bodyCell.tag, "td");
        assert.equal(bodyCell.children.length, 1);

        const [bodyCellText] = bodyCell.children;

        assert.equal(bodyCellText.tag, "text");
        assert.equal(bodyCellText.value, "value1");
    });
});
