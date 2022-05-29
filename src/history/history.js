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

    const descriptions = await getHistoryViews();

    const columns = [
        new dom.Column("index", "#"),
        new dom.Column("date", "date"),
        new dom.Column("name", "full name")
    ];

    const $table = dom.makeTable(columns, descriptions);
    $root.append($table);

    const $resetButton = document.getElementById("reset");
    $resetButton.addEventListener("click", async () => {
        await Local.set(STORE.HISTORY, []);
    });
});
