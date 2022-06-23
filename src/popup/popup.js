import {
    send,
    dom,
    Sync,
    OPTIONS
} from "../common/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    let query = "";

    const makeDiv = dom.makeElementCreator("div");

    const $root = document.getElementById("root");

    const $query = makeDiv("query");
    const $options = makeDiv("options");

    $root.append($query, document.createElement("hr"), $options);

    let currentOptionIndex = 0;
    let maxIndex = 0;
    const resultsPerPage = await Sync.get(OPTIONS.RESULTS_PER_PAGE);
    let options = [];

    const render = () => {
        const elements = [];

        for (let index = 0; index < options.length; index++) {
            const option = options[index];
            const title = (option.dirs.length ? (option.dirs.join("/") + ":") : "") + option.title;
            const className = index == currentOptionIndex ? "selected" : null;
            elements.push(makeDiv({ id: index, text: title, className }));
        }

        for (let index = options.length; index < resultsPerPage; index++) {
            elements.push(makeDiv({ id: index, text: "...", className: "empty" }));
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
            case "Enter": {
                const option = options[currentOptionIndex];
                await send.callMessage(option.id);
                if (shiftKey) {
                    await chrome.tabs.create({
                        url: option.url
                    });
                } else {
                    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                    await chrome.tabs.update(
                        tab.id,
                        {
                            url: option.url
                        });
                }
                // TODO add option for this feature
                window.close();
                break;
            }
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
                options = options.slice(0, resultsPerPage);
                maxIndex = options.length - 1;
                render();
                break;
        }

        $query.innerText = query || "...";
    });
});
