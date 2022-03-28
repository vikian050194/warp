import {
    getOption,
    setOption
} from "./common.js"

document.addEventListener("DOMContentLoaded", async () => {
    const $rootDirectory = document.getElementById("root-directory");

    const value = await getOption("root-directory");
    console.log(value);
    $rootDirectory.value = value;

    const $saveButton = document.getElementById("save");
    $saveButton.addEventListener("click", () => {
        setOption("root-directory", $rootDirectory.value);
    })
});
