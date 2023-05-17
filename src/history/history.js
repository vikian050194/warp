import {
    Local,
    STORE,
    dom
} from "../common/index.js";
import { join } from "./join.js";

const getHistoryViews = async () => {
    const history = await Local.get(STORE.HISTORY);
    const bookmarks = await Local.get(STORE.BOOKMARKS);
    return join(history, bookmarks);
};

document.addEventListener("DOMContentLoaded", async () => {
    const $root = document.getElementById("root");

    // Table
    const descriptions = await getHistoryViews();

    const columns = [
        new dom.Column("index", "#"),
        new dom.Column("date", "date"),
        new dom.Column("name", "full name")
    ];

    const $table = dom.makeTable(columns, descriptions);
    $root.append($table);

    // No data
    if (descriptions.length === 0) {
        $root.append(dom.makeElement("div", { text: "There is no data yet. Use extension at least once to get it!", className: "message" }));
    }

    // Reset
    const $resetButton = document.getElementById("reset");
    $resetButton.addEventListener("click", async () => {
        await Local.set(STORE.HISTORY, []);

        location.reload();
    });
});
