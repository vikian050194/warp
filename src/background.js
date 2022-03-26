// TODO extract get/set functions to separate file
const setOption = (key, value) => {
    chrome.storage.sync.set({ [key]: value });
}

const getOption = async (key) => {
    const valueObject = await chrome.storage.sync.get([key]);
    return valueObject[key];
}

chrome.runtime.onInstalled.addListener((e) => {
    console.log("onInstalled", e);
    setOption("root-directory", "Warp")
});

chrome.runtime.onStartup.addListener((e) => {
    console.log("onStartup", e);
});

chrome.bookmarks.onChanged.addListener((e) => {
    console.log("onChanged", e);
});

chrome.bookmarks.onChildrenReordered.addListener((e) => {
    console.log("onChildrenReordered", e);
});

chrome.bookmarks.onMoved.addListener((e) => {
    console.log("onMoved", e);
});

chrome.bookmarks.onRemoved.addListener((e) => {
    console.log("onRemoved", e);
});

chrome.runtime.onMessage.addListener((message, callback) => {
    console.log(`Message "${message} ${callback}"`);
});

chrome.commands.onCommand.addListener((command) => {
    console.log(`Command "${command}"`);
});
