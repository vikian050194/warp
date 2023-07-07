import { makeElement, makeElementCreator } from "./element.js";

class BaseColumn {
    constructor(title) {
        this.title = title;
    }
}

export class DataColumn extends BaseColumn {
    constructor(title, key, editable = false) {
        super(title);
        this.key = key;
        this.editable = editable;
    }
}

export class ActionColumn extends BaseColumn {
    constructor(title, icon, func) {
        super(title);
        this.icon = icon;
        this.func = func;
    }
}

const makeTr = makeElementCreator("tr");
const makeTd = makeElementCreator("td");
const makeInput = makeElementCreator("input");

const makeDataColumn = (column, data) => {
    const { key, editable } = column;
    if (editable) {
        if (typeof (data[key]) === typeof (true)) {
            const type = "checkbox";
            const input = makeInput({ type });
            input.checked = data[key];
            input.addEventListener("change", (e) => {
                data[key] = e.target.checked;
            });
            const td = makeTd();
            td.appendChild(input);
            return td;
        } else {
            const type = "text";
            const input = makeInput({ type });
            input.value = data[key];
            input.addEventListener("change", (e) => {
                data[key] = e.target.value;
            });
            const td = makeTd();
            td.appendChild(input);
            return td;
        }
    } else {
        const td = makeTd({ text: data[key] });
        return td;
    }
};

const makeActionColumn = (column, data) => {
    const type = "button";
    const { icon } = column;
    const input = makeInput({ type, value: icon });
    input.addEventListener("click", () => {
        column.func(data.id);
    });
    const td = makeTd();
    td.appendChild(input);
    return td;
};

export const makeTable = (columns, collection) => {
    const table = makeElement("table");

    const head = makeElement("thead");
    const body = makeElement("tbody");

    table.appendChild(head);
    table.appendChild(body);

    const headRow = makeTr();
    head.appendChild(headRow);
    for (const { title } of columns) {
        const column = makeElement("th", { text: title });
        headRow.appendChild(column);
    }

    for (const item of collection) {
        const row = makeTr();
        body.appendChild(row);
        for (const column of columns) {
            if (column instanceof DataColumn) {
                const td = makeDataColumn(column, item);
                row.appendChild(td);
            }
            if (column instanceof ActionColumn) {
                const td = makeActionColumn(column, item);
                row.appendChild(td);
            }
        }
    }

    return table;
};
