function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
};

document.addEventListener("DOMContentLoaded", async () => {
    let query = "";

    const [root] = await chrome.bookmarks.search({ title: "Warp" });
    const subTree = await chrome.bookmarks.getSubTree(root.id);
    const bookmarks = subTree[0].children;

    const search = (query) => {
        const parts = query.split(" ");
        console.log(parts);

        const matched = bookmarks.filter(b => b.title && b.url && b.title == parts[0]);
        if (matched.length == 1) {
            chrome.tabs.create({
                url: matched[0].url
            });
        }
    };

    const $query = document.getElementById("query");

    document.addEventListener("keydown", ({ key }) => {
        if (key == "Backspace") {
            query = query.slice(0, query.length - 1);
        } else {
            query += key;
        }

        $query.innerText = query;
        search(query);
    });

    // const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
});
