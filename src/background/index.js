import {
    MESSAGE,
    MENU
} from "../common/index.js";
import {
    System,
    User
} from "./handlers/index.js";

chrome.runtime.onInstalled.addListener(System.onInstall);

chrome.bookmarks.onChanged.addListener(System.onUpdate);
chrome.bookmarks.onMoved.addListener(System.onUpdate);
chrome.bookmarks.onRemoved.addListener(System.onUpdate);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // message listener is not async/await because of
    // bug in GC https://crbug.com/1304272
    // TODO issue is closed so it's time to update the code
    switch (message.type) {
        case MESSAGE.QUERY:
            User.onFilter(message.value).then(options => {
                sendResponse(options);
            });
            return true;
        case MESSAGE.UPDATE:
            System.onUpdate().then(() => sendResponse());
            return true;
        case MESSAGE.CALL:
            User.onCall(message.value).then(() => sendResponse());
            return true;
        default:
            break;
    }
});

chrome.contextMenus.onClicked.addListener(async (info) => {
    // TODO is it possible to remove following switch?
    switch (info.menuItemId) {
        case MENU.HISTORY:
            await chrome.tabs.create({
                url: "history/history.html"
            });
            break;
        case MENU.FREQUENCY:
            await chrome.tabs.create({
                url: "frequency/frequency.html"
            });
            break;
        case MENU.COUNTERS:
            await chrome.tabs.create({
                url: "counters/counters.html"
            });
            break;
        case MENU.DOWNLOAD:
            await chrome.tabs.create({
                url: "download/download.html"
            });
            break;
        case MENU.CHANGELOG:
            await chrome.tabs.create({
                url: "changelog/changelog.html"
            });
            break;
        case MENU.HELP:
            await chrome.tabs.create({
                url: "help/help.html"
            });
            break;
        default:
            break;
    }
});
