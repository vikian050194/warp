import {
    ui,
    dom,
    Sync,
    send,
    OPTIONS,
    SORTING
} from "../common/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    const $spinner = document.getElementById("spinner");
    const spinnerColor = await Sync.get(OPTIONS.UI_SELECTED_ITEM_COLOR);
    $spinner.style.borderBottomColor = spinnerColor;
    const backgroundSpinnerColor = `${spinnerColor}10`;
    $spinner.style.borderTopColor = backgroundSpinnerColor;
    $spinner.style.borderLeftColor = backgroundSpinnerColor;
    $spinner.style.borderRightColor = backgroundSpinnerColor;

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

    const $saveButton = document.getElementById("save");
    $saveButton.addEventListener("click", async () => {
        await Sync.set(OPTIONS.CUSTOM_DIRECTORY, $customDirectory.value);
        await Sync.set(OPTIONS.IS_CUSTOM_DIRECTORY, $isCustomDerectory.checked);

        await Sync.set(OPTIONS.HISTORY_MAX_COUNT, parseInt($maxCount.value));
        await Sync.set(OPTIONS.HISTORY_EXPIRATION_TIME, parseInt($expirationTime.value));

        await Sync.set(OPTIONS.RESULTS_PER_PAGE, parseInt($resultsPerPage.value));
        await Sync.set(OPTIONS.RESULTS_SORTING, $resultsSorting.value);

        await Sync.set(OPTIONS.UI_FONT_SIZE, $fontSize.value);
        await Sync.set(OPTIONS.UI_SELECTED_ITEM_COLOR, $selectedItemColor.value);
        await Sync.set(OPTIONS.UI_SELECTED_ITEM_FONT_WEIGHT, $selectedItemFontWeight.value);
        await Sync.set(OPTIONS.UI_SELECTED_ITEM_ARROW, $selectedItemArrow.checked);

        await Sync.set(OPTIONS.NEW_TAB_ON_SHIFT, $newTabOnShift.checked);
        await Sync.set(OPTIONS.NEW_TAB_KEEP_GROUP, $newTabKeepGroup.checked);

        await send.updateMessage();
    });

    setTimeout(() => {
        const $loader = document.getElementById("loader");
        $loader.style.display = "none";
    }, 200);
});
