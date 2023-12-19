// TODO use getName from "manifest.js"
const name = "warp";

const download = (source, content, fileType, mimeType) => {
    const date = new Date().toISOString().slice(0, 10);
    const filename = `${name}-${source}-${date}.${fileType}`;

    const a = document.createElement("a");
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    a.setAttribute("href", url);
    a.setAttribute("download", filename);
    a.click();
};

export const downloadJSON = (source, data) => download(source, JSON.stringify(data), "json", "application/json");

const stringifyArrayAsTable = (data, delimiter) => {
    const headers = [];
    const content = [];

    for (const key in data[0]) {
        headers.push(key);
    }

    content.push(headers);

    for (const item of data) {
        const row = [];
        for (const key of headers) {
            row.push(item[key]);
        }
        content.push(row);
    }

    return content.map(c => c.join(delimiter)).join("\n");
};

export const downloadCSV = (source, data) => {
    download(source, stringifyArrayAsTable(data, ","), "csv", "text/csv");
};

export const downloadTSV = (source, data) => {
    download(source, stringifyArrayAsTable(data, "\t"), "tsv", "text/tab-separated-values");
};