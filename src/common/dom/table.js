import { makeElement, makeElementCreator } from "./element.js";

export class Column {
    constructor(key, title) {
        this.key = key;
        this.title = title;
    }
}

const makeTr = makeElementCreator("tr");
const makeTd = makeElementCreator("td");

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
        for (const { key } of columns) {
            const td = makeTd({ text: item[key] });
            row.appendChild(td);
        }
    }

    return table;
};
