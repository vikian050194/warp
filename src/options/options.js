import {
    ui,
    dom,
    Sync,
    send,
    OPTIONS,
    SORTING,
    NEIGHBOUR
} from "../common/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    const $rootElement = document.documentElement;

    const color = await Sync.get(OPTIONS.UI_SELECTED_ITEM_COLOR);
    $rootElement.style.setProperty("--new", color);

    const makeOption = dom.makeElementCreator("option");

    // Bookmarks
    const $customDirectory = document.getElementById(OPTIONS.CUSTOM_DIRECTORY);
    $customDirectory.value = await Sync.get(OPTIONS.CUSTOM_DIRECTORY);

    const $isCustomDerectory = document.getElementById(OPTIONS.IS_CUSTOM_DIRECTORY);
    $isCustomDerectory.checked = await Sync.get(OPTIONS.IS_CUSTOM_DIRECTORY);

    // History
    const $maxCount = document.getElementById(OPTIONS.HISTORY_MAX_COUNT);
    $maxCount.value = await Sync.get(OPTIONS.HISTORY_MAX_COUNT);

    const $expirationTime = document.getElementById(OPTIONS.HISTORY_EXPIRATION_TIME);
    $expirationTime.value = await Sync.get(OPTIONS.HISTORY_EXPIRATION_TIME);

    // Results
    const $resultsPerPage = document.getElementById(OPTIONS.RESULTS_PER_PAGE);
    $resultsPerPage.value = await Sync.get(OPTIONS.RESULTS_PER_PAGE);

    const $resultsSorting = document.getElementById(OPTIONS.RESULTS_SORTING);
    $resultsSorting.append(
        makeOption({ text: "as is", value: SORTING.AS_IS }),
        makeOption({ text: "alphabet", value: SORTING.ALPHABET }),
        makeOption({ text: "frequency", value: SORTING.FREQUENCY }),
        makeOption({ text: "history", value: SORTING.HISTORY })
    );
    $resultsSorting.value = await Sync.get(OPTIONS.RESULTS_SORTING);

    const $resultsLooping = document.getElementById(OPTIONS.RESULTS_LOOPING);
    $resultsLooping.checked = await Sync.get(OPTIONS.RESULTS_LOOPING);

    // Appearance
    const $fontSize = document.getElementById(OPTIONS.UI_FONT_SIZE);
    for (const value of ui.sizes) {
        $fontSize.append(
            makeOption({ text: value, value }),
        );
    }
    $fontSize.value = await Sync.get(OPTIONS.UI_FONT_SIZE);

    const $selectedItemColor = document.getElementById(OPTIONS.UI_SELECTED_ITEM_COLOR);
    for (const { value, name } of ui.colors) {
        $selectedItemColor.append(
            makeOption({ text: name, value }),
        );
    }
    $selectedItemColor.value = await Sync.get(OPTIONS.UI_SELECTED_ITEM_COLOR);

    const $selectedItemFontWeight = document.getElementById(OPTIONS.UI_SELECTED_ITEM_FONT_WEIGHT);
    for (const value of ui.weights) {
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
    $keepTogether.append(
        makeOption({ text: "never", value: NEIGHBOUR.NEVER }),
        makeOption({ text: "only in group", value: NEIGHBOUR.ONLY_IN_GROUP }),
        makeOption({ text: "only without group", value: NEIGHBOUR.ONLY_WITHOUT_GROUP }),
        makeOption({ text: "always", value: NEIGHBOUR.ALWAYS })
    );
    $keepTogether.value = await Sync.get(OPTIONS.NEW_TAB_KEEP_NEIGHBOUR);

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

        await send.updateMessage();
    });
});
