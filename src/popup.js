// TODO extract classes to separate files
class LevelModel {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
}

class BookmarkModel {
    constructor(dirs, title, url) {
        this.dirs = dirs;
        this.title = title;
        this.url = url;
    }
}


// TODO extract get/set functions to separate file
const setOption = (key, value) => {
    chrome.storage.sync.set({ [key]: value });
}

const getOption = async (key) => {
    const valueObject = await chrome.storage.sync.get([key]);
    return valueObject[key];
}

// TODO move searching to background
// TODO update list on change* events
const getBookmarksList = async (bookmark) => {
    const result = [];
    const levels = [];
    const stack = [];
    stack.push(bookmark);

    while (stack) {
        const current = stack.pop();
        const lastLevel = levels[levels.length - 1];

        if (!stack.length && current && lastLevel && current.id == lastLevel.id) {
            return result.map(b => new BookmarkModel(b.dirs.slice(1), b.title, b.url));
        }

        if (lastLevel && current.title == lastLevel.title && current.id == lastLevel.id) {
            levels.pop();
            continue;
        }

        if (current.url) {
            result.push(new BookmarkModel([...levels.map(({ title }) => title)], current.title, current.url));
        } else {
            const subs = await chrome.bookmarks.getChildren(current.id);
            stack.push(current);
            stack.push(...subs);
            levels.push(new LevelModel(current.id, current.title));
        }
    }
};

const makeDiv = (id, text = null, className = null) => {
    const newElement = document.createElement("div");
    newElement.id = id;
    if (className) {
        newElement.className = className;
    }
    if (text) {
        const textContent = document.createTextNode(text);
        newElement.appendChild(textContent);
    }
    return newElement;
};

document.addEventListener("DOMContentLoaded", async () => {
    let query = "";

    const $root = document.getElementById("root");

    const $query = makeDiv("query");
    const $options = makeDiv("options");

    $root.append($query, document.createElement("hr"), $options);

    // TODO use constants for options names
    const rootDirectoryName = await getOption("root-directory");
    const [root] = await chrome.bookmarks.search({ title: rootDirectoryName });

    const bookmarks = await getBookmarksList(root);

    const search = (query) => {
        const parts = query.split(" ");
        return bookmarks.filter(b => b.title.indexOf(parts[0]) == 0);
    };

    let currentOptionIndex = 0;
    let maxIndex = 0;
    let foo = 3;
    let options = [];

    const render = () => {
        const elements = [];
        for (let index = 0; index < options.length; index++) {
            const option = options[index];
            const title = option.dirs.join("/") + ":" + option.title;
            const className = index == currentOptionIndex ? "selected" : null;
            elements.push(makeDiv(index, title, className));
        }
        for (let index = options.length; index < foo; index++) {
            elements.push(makeDiv(index, "...", "empty"));

        }
        while ($options.firstChild) {
            $options.removeChild($options.firstChild);
        }
        $options.append(...elements);
    };

    $query.innerText = "...";
    render();

    document.addEventListener("keydown", async ({ key, shiftKey }) => {
        switch (key) {
            case "Backspace":
                query = query.slice(0, query.length - 1);
                break;
            case "Enter":
                if (shiftKey) {
                    chrome.tabs.create({
                        url: options[currentOptionIndex].url
                    });
                } else {
                    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                    chrome.tabs.update(
                        tab.id, {
                        url: options[currentOptionIndex].url
                    });
                }
                break;
            case "ArrowUp":
                currentOptionIndex -= currentOptionIndex > 0 ? 1 : 0;
                render();
                break;
            case "ArrowDown":
                currentOptionIndex += currentOptionIndex < maxIndex ? 1 : 0;
                render();
                break;
            default:
                if (key.length == 1) {
                    query += key;
                    options = search(query);
                    maxIndex = options.length - 1;
                    render();
                }
                break;
        }

        $query.innerText = query || "...";
    });
});
