import {
    Sync,
    send,
    OPTIONS
} from "../common/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    const $customDirectory = document.getElementById(OPTIONS.CUSTOM_DIRECTORY);
    $customDirectory.value = await Sync.get(OPTIONS.CUSTOM_DIRECTORY);

    const $isCustomDerectory = document.getElementById(OPTIONS.IS_CUSTOM_DIRECTORY);
    $isCustomDerectory.checked = await Sync.get(OPTIONS.IS_CUSTOM_DIRECTORY);

    const $maxCount = document.getElementById(OPTIONS.HISTORY_MAX_COUNT);
    $maxCount.value = await Sync.get(OPTIONS.HISTORY_MAX_COUNT);

    const $expirationTime = document.getElementById(OPTIONS.HISTORY_EXPIRATION_TIME);
    $expirationTime.value = await Sync.get(OPTIONS.HISTORY_EXPIRATION_TIME);

    const $saveButton = document.getElementById("save");
    $saveButton.addEventListener("click", async () => {
        await Sync.set(OPTIONS.CUSTOM_DIRECTORY, $customDirectory.value);
        await Sync.set(OPTIONS.IS_CUSTOM_DIRECTORY, $isCustomDerectory.checked);

        await Sync.set(OPTIONS.HISTORY_MAX_COUNT, parseInt($maxCount.value));
        await Sync.set(OPTIONS.HISTORY_EXPIRATION_TIME, parseInt($expirationTime.value));

        await send.updateMessage();
    });
});
