import {
    Sync,
    send,
    Keys
} from "../common/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    const $rootDirectory = document.getElementById(Keys.ROOT);
    $rootDirectory.value = await Sync.get(Keys.ROOT);

    const $isRoot = document.getElementById(Keys.IS_ROOT);
    $isRoot.checked = await Sync.get(Keys.IS_ROOT);

    const $saveButton = document.getElementById("save");
    $saveButton.addEventListener("click", async () => {
        await Sync.set(Keys.ROOT, $rootDirectory.value);
        await Sync.set(Keys.IS_ROOT, $isRoot.checked);

        await send.updateMessage();
    });
});
