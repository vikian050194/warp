import {
    send,
    dom,
    Sync,
    OPTIONS,
    CallData
} from "../common/index.js";
import { splitByPages } from "./paging.js";

document.addEventListener("DOMContentLoaded", async () => {
    // Get options
    const isAutocloseEnabled = await Sync.get(OPTIONS.IS_AUTOCLOSE_ENABLED);
    const autocloseTimeSec = await Sync.get(OPTIONS.AUTOCLOSE_TIME);

    const isArrow = await Sync.get(OPTIONS.UI_SELECTED_ITEM_ARROW);

    const resultsPerPage = await Sync.get(OPTIONS.RESULTS_PER_PAGE);
    const resultsLooping = await Sync.get(OPTIONS.RESULTS_LOOPING);

    const color = await Sync.get(OPTIONS.UI_SELECTED_ITEM_COLOR);
    const weight = await Sync.get(OPTIONS.UI_SELECTED_ITEM_FONT_WEIGHT);
    const fontSize = await Sync.get(OPTIONS.UI_FONT_SIZE);

    const keepGroup = await Sync.get(OPTIONS.NEW_TAB_KEEP_GROUP);
    const newOnShift = await Sync.get(OPTIONS.NEW_TAB_ON_SHIFT);

    // Autoclose
    let autocloseId = null;
    const resetAutoclose = () => clearTimeout(autocloseId);

    // Indexes
    let currentOptionIndex = 0;
    let maxOptionIndex = 0;

    let currentPageIndex = 0;
    let maxPageIndex = 0;

    // Input and output
    let query = "";
    let pages = [[]];

    // UI items
    const arrowChar = "&#10148;";
    const visibleArrow = isArrow ? `<span>${arrowChar}</span>` : "";
    const invisibleArrow = isArrow ? `<span style="color:white;">${arrowChar}</span>` : "";
    const placeholder = `${invisibleArrow}...`;
    const queryPlaceholder = "";

    // UI builders
    const makeDiv = dom.makeElementCreator("div");
    const makeSpan = dom.makeElementCreator("span");

    const getPager = () => `${currentPageIndex + 1}/${pages.length}`;
    const makeId = (id) => `opt-${id}`;

    // DOM elements creating and updating
    const $rootElement = document.documentElement;
    const $root = document.getElementById("root");

    const $query = makeDiv({ id: "query" });
    const $options = makeDiv({ id: "options" });
    const $paging = makeDiv({ className: "paging" });

    $root.append($query, document.createElement("hr"), $options, document.createElement("hr"), $paging);

    const $backPage = makeSpan({ id: "back", text: "back", className: "arrow" });
    const $currentPage = makeSpan({ id: "pager", text: getPager(), className: "pager" });
    const $nextPage = makeSpan({ id: "next", text: "next", className: "arrow" });

    $paging.append($backPage, $currentPage, $nextPage);

    $rootElement.style.setProperty("--selected-item-color", color);
    $rootElement.style.setProperty("--selected-item-font-weight", weight);
    $rootElement.style.setProperty("--font-size", fontSize);

    // Render
    const render = () => {
        const elements = [];

        for (let index = 0; index < pages[currentPageIndex].length; index++) {
            const option = pages[currentPageIndex][index];
            const isSelected = index == currentOptionIndex;
            const titlePrefix = isSelected ? visibleArrow : invisibleArrow;
            const title = titlePrefix + (option.dirs.length ? (option.dirs.join("/") + ":") : "") + option.title;
            const className = isSelected ? "selected" : null;
            elements.push(makeDiv({ id: makeId(index), innerHTML: title, className }));
        }

        for (let index = pages[currentPageIndex].length; index < resultsPerPage; index++) {
            elements.push(makeDiv({ id: makeId(index), innerHTML: placeholder, className: "empty" }));
        }

        while ($options.firstChild) {
            $options.removeChild($options.firstChild);
        }

        $options.append(...elements);

        $backPage.classList.toggle("active", currentPageIndex > 0);
        $currentPage.innerText = getPager();
        $nextPage.classList.toggle("active", currentPageIndex < maxPageIndex);

        $query.innerText = query || queryPlaceholder;
    };

    const onKey = async () => {
        const options = await send.queryMessage(query);
        currentPageIndex = 0;
        pages = splitByPages(options, resultsPerPage);
        maxPageIndex = pages.length - 1;
        maxOptionIndex = pages[currentPageIndex].length - 1;
        if (currentOptionIndex > maxOptionIndex) {
            currentOptionIndex = maxOptionIndex;
        }
    };

    await onKey();
    render();

    document.addEventListener("keydown", async ({ key, shiftKey, ctrlKey }) => {
        switch (key) {
            case "Enter": {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                const option = pages[currentPageIndex][currentOptionIndex];
                const useKeepGroup = keepGroup !== ctrlKey && tab.groupId >= 0;
                const useNewTab = newOnShift === shiftKey;
                const callData = new CallData(option.id, tab.id, tab.index, tab.groupId, useNewTab, useKeepGroup);
                await send.callMessage(callData);
                if (isAutocloseEnabled) {
                    autocloseId = setTimeout(window.close, autocloseTimeSec * 1000);
                }
                break;
            }
            case "ArrowUp":
                resetAutoclose();
                if (resultsLooping) {
                    currentOptionIndex = currentOptionIndex > 0 ? currentOptionIndex - 1 : maxOptionIndex;
                } else {
                    currentOptionIndex -= currentOptionIndex > 0 ? 1 : 0;
                }
                render();
                break;
            case "ArrowDown":
                resetAutoclose();
                if (resultsLooping) {
                    currentOptionIndex = currentOptionIndex < maxOptionIndex ? currentOptionIndex + 1 : 0;
                } else {
                    currentOptionIndex += currentOptionIndex < maxOptionIndex ? 1 : 0;
                }
                render();
                break;
            case "ArrowRight":
                resetAutoclose();
                currentOptionIndex = 0;
                currentPageIndex += currentPageIndex < maxPageIndex ? 1 : 0;
                maxOptionIndex = pages[currentPageIndex].length - 1;
                render();
                break;
            case "ArrowLeft":
                resetAutoclose();
                currentOptionIndex = 0;
                currentPageIndex -= currentPageIndex > 0 ? 1 : 0;
                maxOptionIndex = pages[currentPageIndex].length - 1;
                render();
                break;
            default: {
                resetAutoclose();
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
    });
});
