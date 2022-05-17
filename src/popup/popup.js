import {
    send
} from "../common/index.js";

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

    let currentOptionIndex = 0;
    let maxIndex = 0;
    const placeholderSize = 3;
    let options = [];

    const render = () => {
        const elements = [];

        for (let index = 0; index < options.length; index++) {
            const option = options[index];
            const title = (option.dirs.length ? (option.dirs.join("/") + ":") : "") + option.title;
            const className = index == currentOptionIndex ? "selected" : null;
            elements.push(makeDiv(index, title, className));
        }

        for (let index = options.length; index < placeholderSize; index++) {
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
            case "Enter":
                if (shiftKey) {
                    await chrome.tabs.create({
                        url: options[currentOptionIndex].url
                    });
                } else {
                    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                    await chrome.tabs.update(
                        tab.id,
                        {
                            url: options[currentOptionIndex].url
                        });
                }
                // TODO add setting for this feature
                window.close();
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
                } else {
                    if (key == "Backspace") {
                        query = query.slice(0, query.length - 1);
                    } else {
                        break;
                    }
                }
                options = await send.queryMessage(query);
                maxIndex = options.length - 1;
                render();
                break;
        }

        $query.innerText = query || "...";
    });
});
