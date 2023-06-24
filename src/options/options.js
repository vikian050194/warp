import {
    dom,
    Sync,
    send,
    OPTIONS,
    SORTING,
    NEIGHBOUR,
    FONTS,
    WEIGHTS,
    COLORS,
    AUTOCLOSE,
    EXPIRATION,
    PAGE
} from "../common/index.js";
import { descriptions } from "./description.js";
import { getTranslation } from "./translation.js";

document.addEventListener("DOMContentLoaded", async () => {
    const $rootElement = document.documentElement;
    const $modal = document.getElementById("modal-one");

    const icon = "{ &#8505; }";

    const openModal = (optionid) => {
        const description = descriptions.find(({ id }) => id === optionid);
        $modal.querySelector("h1").innerHTML = description.title;
        $modal.querySelector("div.description").innerHTML = description.paragraphs.map(p => `<p>${p}</p>`).join("");
        $modal.classList.add("open");
        const exits = $modal.querySelectorAll(".modal-exit");
        exits.forEach(function (exit) {
            exit.addEventListener("click", function (event) {
                event.preventDefault();
                $modal.classList.remove("open");
            });
        });
    };

    document.querySelectorAll("span.title").forEach(function (element) {
        const optionId = element.getAttribute("data-info-id");
        const description = descriptions.find(({ id }) => id === optionId);
        element.innerHTML = description.title;
    });

    document.querySelectorAll("span.info").forEach(function (trigger) {
        trigger.innerHTML = icon;
        trigger.addEventListener("click", function (event) {
            event.preventDefault();
            const optionId = event.target.getAttribute("data-info-id");
            openModal(optionId);
        });
    });

    const color = await Sync.get(OPTIONS.UI_SELECTED_ITEM_COLOR);
    $rootElement.style.setProperty("--new", color);

    const makeOption = dom.makeElementCreator("option");

    // Pins and tabs
    const pins = document.querySelectorAll("button.pin");
    const tabs = document.querySelectorAll("div.tab");

    const showTab = (showIndex) => {
        for (let index = 0; index < tabs.length; index++) {
            const tab = tabs[index];
            const value = tab.getAttribute("tab-id") === showIndex ? "block" : "none";
            tab.style.setProperty("display", value);
        }

        for (let index = 0; index < pins.length; index++) {
            const pin = pins[index];
            const value = pin.getAttribute("pin-id") === showIndex ? "underline" : "none";
            pin.style.setProperty("text-decoration", value);
        }
    };

    showTab("1");

    for (let index = 0; index < pins.length; index++) {
        const pin = pins[index];
        pin.addEventListener("click", (e) => {
            const showIndex = e.currentTarget.getAttribute("pin-id");
            showTab(showIndex);
        });
    }

    // Bookmarks
    const $customDirectory = document.getElementById(OPTIONS.CUSTOM_DIRECTORY);
    $customDirectory.value = await Sync.get(OPTIONS.CUSTOM_DIRECTORY);

    const $isCustomDerectory = document.getElementById(OPTIONS.IS_CUSTOM_DIRECTORY);
    $isCustomDerectory.checked = await Sync.get(OPTIONS.IS_CUSTOM_DIRECTORY);

    // History
    const $maxCount = document.getElementById(OPTIONS.HISTORY_MAX_COUNT);
    $maxCount.value = await Sync.get(OPTIONS.HISTORY_MAX_COUNT);

    const $expirationTime = document.getElementById(OPTIONS.HISTORY_EXPIRATION_TIME);
    for (const value of EXPIRATION.ORDERED) {
        $expirationTime.append(
            makeOption({ text: value, value }),
        );
    }
    $expirationTime.value = await Sync.get(OPTIONS.HISTORY_EXPIRATION_TIME);

    // Results
    const $resultsPerPage = document.getElementById(OPTIONS.RESULTS_PER_PAGE);
    for (const value of PAGE.ORDERED) {
        $resultsPerPage.append(
            makeOption({ text: value, value }),
        );
    }
    $resultsPerPage.value = await Sync.get(OPTIONS.RESULTS_PER_PAGE);

    const $resultsSorting = document.getElementById(OPTIONS.RESULTS_SORTING);
    for (const value of SORTING.ORDERED) {
        $resultsSorting.append(
            makeOption({ text: getTranslation(value), value }),
        );
    }
    $resultsSorting.value = await Sync.get(OPTIONS.RESULTS_SORTING);

    const $resultsLooping = document.getElementById(OPTIONS.RESULTS_LOOPING);
    $resultsLooping.checked = await Sync.get(OPTIONS.RESULTS_LOOPING);

    // Appearance
    const $fontSize = document.getElementById(OPTIONS.UI_FONT_SIZE);
    for (const value of FONTS.ORDERED) {
        $fontSize.append(
            makeOption({ text: value, value }),
        );
    }
    $fontSize.value = await Sync.get(OPTIONS.UI_FONT_SIZE);

    const $selectedItemColor = document.getElementById(OPTIONS.UI_SELECTED_ITEM_COLOR);
    for (const value of COLORS.ORDERED) {
        $selectedItemColor.append(
            makeOption({ text: getTranslation(value), value }),
        );
    }
    $selectedItemColor.value = await Sync.get(OPTIONS.UI_SELECTED_ITEM_COLOR);

    const $selectedItemFontWeight = document.getElementById(OPTIONS.UI_SELECTED_ITEM_FONT_WEIGHT);
    for (const value of WEIGHTS.ORDERED) {
        $selectedItemFontWeight.append(
            makeOption({ text: value, value }),
        );
    }
    $selectedItemFontWeight.value = await Sync.get(OPTIONS.UI_SELECTED_ITEM_FONT_WEIGHT);

    const $selectedItemArrow = document.getElementById(OPTIONS.UI_SELECTED_ITEM_ARROW);
    $selectedItemArrow.checked = await Sync.get(OPTIONS.UI_SELECTED_ITEM_ARROW);

    const $newTabOnShift = document.getElementById(OPTIONS.NEW_TAB_ON_SHIFT);
    $newTabOnShift.checked = await Sync.get(OPTIONS.NEW_TAB_ON_SHIFT);

    const $newTabKeepGroup = document.getElementById(OPTIONS.NEW_TAB_KEEP_GROUP);
    $newTabKeepGroup.checked = await Sync.get(OPTIONS.NEW_TAB_KEEP_GROUP);

    const $keepTogether = document.getElementById(OPTIONS.NEW_TAB_KEEP_NEIGHBOUR);
    for (const value of NEIGHBOUR.ORDERED) {
        $keepTogether.append(
            makeOption({ text: getTranslation(value), value }),
        );
    }
    $keepTogether.value = await Sync.get(OPTIONS.NEW_TAB_KEEP_NEIGHBOUR);

    // Autoclose
    const $isAutocloseEnabled = document.getElementById(OPTIONS.IS_AUTOCLOSE_ENABLED);
    $isAutocloseEnabled.checked = await Sync.get(OPTIONS.IS_AUTOCLOSE_ENABLED);

    const $autocloseTimeSec = document.getElementById(OPTIONS.AUTOCLOSE_TIME);
    for (const value of AUTOCLOSE.ORDERED) {
        $autocloseTimeSec.append(
            makeOption({ text: value.toString(), value }),
        );
    }
    $autocloseTimeSec.value = await Sync.get(OPTIONS.AUTOCLOSE_TIME);

    // Save
    const $saveButton = document.getElementById("save");
    $saveButton.addEventListener("click", async () => {
        await Sync.set(OPTIONS.CUSTOM_DIRECTORY, $customDirectory.value);
        await Sync.set(OPTIONS.IS_CUSTOM_DIRECTORY, $isCustomDerectory.checked);

        await Sync.set(OPTIONS.HISTORY_MAX_COUNT, parseInt($maxCount.value));
        await Sync.set(OPTIONS.HISTORY_EXPIRATION_TIME, parseInt($expirationTime.value));

        await Sync.set(OPTIONS.RESULTS_PER_PAGE, parseInt($resultsPerPage.value));
        await Sync.set(OPTIONS.RESULTS_SORTING, $resultsSorting.value);
        await Sync.set(OPTIONS.RESULTS_LOOPING, $resultsLooping.checked);

        await Sync.set(OPTIONS.UI_FONT_SIZE, $fontSize.value);
        await Sync.set(OPTIONS.UI_SELECTED_ITEM_COLOR, $selectedItemColor.value);
        await Sync.set(OPTIONS.UI_SELECTED_ITEM_FONT_WEIGHT, $selectedItemFontWeight.value);
        await Sync.set(OPTIONS.UI_SELECTED_ITEM_ARROW, $selectedItemArrow.checked);

        await Sync.set(OPTIONS.NEW_TAB_ON_SHIFT, $newTabOnShift.checked);
        await Sync.set(OPTIONS.NEW_TAB_KEEP_GROUP, $newTabKeepGroup.checked);
        await Sync.set(OPTIONS.NEW_TAB_KEEP_NEIGHBOUR, $keepTogether.value);

        await Sync.set(OPTIONS.IS_AUTOCLOSE_ENABLED, $isAutocloseEnabled.checked);
        await Sync.set(OPTIONS.AUTOCLOSE_TIME, $autocloseTimeSec.value);

        await send.updateMessage();
    });
});
