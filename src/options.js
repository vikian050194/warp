// TODO extract get/set functions to separate file
const setOption = (key, value) => {
    chrome.storage.sync.set({ [key]: value });
}

const getOption = async (key) => {
    const valueObject = await chrome.storage.sync.get([key]);
    return valueObject[key];
}

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
