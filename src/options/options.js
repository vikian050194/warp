import {
    dom,
    Sync,
    send,
    OPTIONS,
    SORTING
} from "../common/index.js";

document.addEventListener("DOMContentLoaded", async () => {
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

    const $saveButton = document.getElementById("save");
    $saveButton.addEventListener("click", async () => {
        await Sync.set(OPTIONS.CUSTOM_DIRECTORY, $customDirectory.value);
        await Sync.set(OPTIONS.IS_CUSTOM_DIRECTORY, $isCustomDerectory.checked);

        await Sync.set(OPTIONS.HISTORY_MAX_COUNT, parseInt($maxCount.value));
        await Sync.set(OPTIONS.HISTORY_EXPIRATION_TIME, parseInt($expirationTime.value));

        await Sync.set(OPTIONS.RESULTS_PER_PAGE, parseInt($resultsPerPage.value));
        await Sync.set(OPTIONS.RESULTS_SORTING, $resultsSorting.value);

        await send.updateMessage();
    });
});
