import {
    Local,
    STORE,
    dom,
    getVersion,
    fs
} from "../common/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    const $root = document.getElementById("root");

    const history = await Local.get(STORE.HISTORY);
    const bookmarks = await Local.get(STORE.BOOKMARKS);

    const getData = (source) => {
        switch (source) {
            case "bookmarks":
                return bookmarks;
            case "history":
                return history;
            default:
                return [];
        }
    };

    const onJson = async (source) => {
        const data = getData(source);
        fs.downloadJSON(source, data);
    };

    const onCsv = async (source) => {
        const data = getData(source);
        fs.downloadCSV(source, data);
    };

    const onTsv = async (source) => {
        const data = getData(source);
        fs.downloadTSV(source, data);
    };

    const columns = [
        new dom.DataColumn("data", "id", false),
        new dom.ActionColumn("", "JSON", onJson),
        new dom.ActionColumn("", "CSV", onCsv),
        new dom.ActionColumn("", "TSV", onTsv)
    ];

    const data = [
        { id: "bookmarks" },
        { id: "history" }
    ];

    const $table = dom.makeTable(columns, data);
    $root.append($table);

    // Version
    document.getElementById("version").innerText = getVersion();
});
