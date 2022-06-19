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
        default:
            break;
    }
});
