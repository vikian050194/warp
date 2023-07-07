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
            new dom.DataColumn("Key 1", "key1")
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

    it("one data column and one row", () => {
        const columns = [
            new dom.DataColumn("Key 1", "key1")
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

    it("one editable boolean data column and one row", () => {
        const columns = [
            new dom.DataColumn("Key 1", "key1", true)
        ];
        const collection = [
            {
                key1: true
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

        const [bodyCellInput] = bodyCell.children;

        assert.equal(bodyCellInput.tag, "input");
        assert.equal(bodyCellInput.type, "checkbox");
        assert.equal(bodyCellInput.checked, true);
    });

    it("one editable string data column and one row", () => {
        const columns = [
            new dom.DataColumn("Key 1", "key1", true)
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

        assert.equal(bodyCellText.tag, "input");
        assert.equal(bodyCellText.type, "text");
        assert.equal(bodyCellText.value, "value1");
    });

    it("one action column and one row", () => {
        let actualId = null;
        const handler = (id) => actualId = id;
        const columns = [
            new dom.ActionColumn("Key 1", "i", handler)
        ];
        const collection = [
            {
                id: 42
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

        const [bodyCellInput] = bodyCell.children;

        assert.equal(bodyCellInput.tag, "input");
        assert.equal(bodyCellInput.value, "i");
        bodyCellInput.onclick();
        assert.equal(actualId, 42);
    });
});
