import {
    Local,
    STORE,
    dom,
    getVersion
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
    const historyViews = await getHistoryViews();

    const onDelete = async (id) => {
        const history = await Local.get(STORE.HISTORY);
        const remainingHistory = history.filter((r, indexId) => indexId !== id);
        await Local.set(STORE.HISTORY, remainingHistory);
        location.reload();
    };

    const columns = [
        new dom.DataColumn("#", "index", false),
        new dom.DataColumn("date", "date", false),
        new dom.DataColumn("full name", "name", false),
        new dom.ActionColumn("delete", "X", onDelete)
    ];

    const $table = dom.makeTable(columns, historyViews);
    $root.append($table);

    // No data
    if (historyViews.length === 0) {
        $root.append(dom.makeElement("div", { text: "There is no data yet. Use extension at least once to get it!", className: "message" }));
    }

    // Reset
    const $resetButton = document.getElementById("reset");
    $resetButton.addEventListener("click", async () => {
        await Local.set(STORE.HISTORY, []);

        location.reload();
    });

    // Version
    document.getElementById("version").innerText = getVersion();
});
