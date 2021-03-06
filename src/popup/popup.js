import {
    send,
    dom,
    Sync,
    Local,
    OPTIONS,
    COUNTERS
} from "../common/index.js";
import { splitByPages } from "./paging.js";

document.addEventListener("DOMContentLoaded", async () => {
    let query = "";
    let pages = [[]];

    const resultsPerPage = await Sync.get(OPTIONS.RESULTS_PER_PAGE);

    let currentOptionIndex = 0;
    let maxOptionIndex = 0;

    let currentPageIndex = 0;
    let maxPageIndex = 0;

    const makeDiv = dom.makeElementCreator("div");
    const makeSpan = dom.makeElementCreator("span");

    const getPager = () => `${currentPageIndex + 1}/${pages.length}`;

    const $root = document.getElementById("root");

    const $query = makeDiv({ id: "query" });
    const $options = makeDiv({ id: "options" });
    const $paging = makeDiv({ className: "paging" });

    $root.append($query, document.createElement("hr"), $options, document.createElement("hr"), $paging);

    const $backPage = makeSpan({ id: "back", text: "back", className: "arrow" });
    const $currentPage = makeSpan({ id: "pager", text: getPager(), className: "pager" });
    const $nextPage = makeSpan({ id: "next", text: "next", className: "arrow" });

    $paging.append($backPage, $currentPage, $nextPage);

    const render = () => {
        const elements = [];

        for (let index = 0; index < pages[currentPageIndex].length; index++) {
            const option = pages[currentPageIndex][index];
            const title = (option.dirs.length ? (option.dirs.join("/") + ":") : "") + option.title;
            const className = index == currentOptionIndex ? "selected" : null;
            elements.push(makeDiv({ id: index, text: title, className }));
        }

        for (let index = pages[currentPageIndex].length; index < resultsPerPage; index++) {
            elements.push(makeDiv({ id: index, text: "...", className: "empty" }));
        }

        while ($options.firstChild) {
            $options.removeChild($options.firstChild);
        }

        $options.append(...elements);

        $backPage.classList.toggle("animated", currentPageIndex > 0);
        $currentPage.innerText = getPager();
        $nextPage.classList.toggle("animated", currentPageIndex < maxPageIndex);
    };

    $query.innerText = "...";

    const onKey = async () => {
        const options = await send.queryMessage(query);
        currentPageIndex = 0;
        pages = splitByPages(options, resultsPerPage);
        maxPageIndex = pages.length - 1;
        maxOptionIndex = pages[currentPageIndex].length - 1;
    };

    await onKey();
    render();

    document.addEventListener("keydown", async ({ key, shiftKey }) => {
        switch (key) {
            case "Enter": {
                const option = pages[currentPageIndex][currentOptionIndex];
                await send.callMessage(option.id);
                if (shiftKey) {
                    const create = await Local.get(COUNTERS.OPEN_CREATE);
                    await Local.set(COUNTERS.OPEN_CREATE, create + 1);
                    await chrome.tabs.create({
                        url: option.url
                    });
                } else {
                    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                    const update = await Local.get(COUNTERS.OPEN_UPDATE);
                    await Local.set(COUNTERS.OPEN_UPDATE, update + 1);
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
                currentOptionIndex += currentOptionIndex < maxOptionIndex ? 1 : 0;
                render();
                break;
            case "ArrowRight":
                currentOptionIndex = 0;
                currentPageIndex += currentPageIndex < maxPageIndex ? 1 : 0;
                maxOptionIndex = pages[currentPageIndex].length - 1;
                render();
                break;
            case "ArrowLeft":
                currentOptionIndex = 0;
                currentPageIndex -= currentPageIndex > 0 ? 1 : 0;
                maxOptionIndex = pages[currentPageIndex].length - 1;
                render();
                break;
            default: {
                if (key.length == 1) {
                    query += key;
                } else {
                    if (key == "Backspace") {
                        query = query.slice(0, query.length - 1);
                    } else {
                        break;
                    }
                }
                await onKey();
                render();
                break;
            }
        }

        $query.innerText = query || "...";
    });
});
