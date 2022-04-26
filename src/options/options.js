import {
    Sync,
    send
} from "../common/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    const $rootDirectory = document.getElementById("root-directory");

    const value = await Sync.get("root-directory");
    $rootDirectory.value = value;

    const $saveButton = document.getElementById("save");
    $saveButton.addEventListener("click", async () => {
        await Sync.set("root-directory", $rootDirectory.value);
        await send.updateMessage();
    });
});
