import {
    Sync,
    Local,
    OPTIONS,
    STORE,
    MENU
} from "../../common/index.js";
import { getBookmarksList } from "../scan.js";

const getRoot = async () => {
    const searchInCustomDerectory = await Sync.get(OPTIONS.IS_CUSTOM_DIRECTORY);

    if (searchInCustomDerectory) {
        const customDirectoryName = await Sync.get(OPTIONS.CUSTOM_DIRECTORY);
        const [root] = await chrome.bookmarks.search({ title: customDirectoryName });
        return root;
    }

    const [root] = await chrome.bookmarks.get("1");
    return root;
};

const updateDefaultValues = async () => {
    const customDirectory = await Sync.get(OPTIONS.CUSTOM_DIRECTORY);
    if (customDirectory === undefined) {
        await Sync.set(OPTIONS.CUSTOM_DIRECTORY, "Warp");
    }

    const isCustomDirectory = await Sync.get(OPTIONS.IS_CUSTOM_DIRECTORY);
    if (isCustomDirectory === undefined) {
        await Sync.set(OPTIONS.IS_CUSTOM_DIRECTORY, false);
    }

    const maxCount = await Sync.get(OPTIONS.HISTORY_MAX_COUNT);
    if (maxCount === undefined) {
        await Sync.set(OPTIONS.HISTORY_MAX_COUNT, 100000);
    }

    const expirationTime = await Sync.get(OPTIONS.HISTORY_EXPIRATION_TIME);
    if (expirationTime === undefined) {
        await Sync.set(OPTIONS.HISTORY_EXPIRATION_TIME, 31536000);
    }

    const history = await Local.get(STORE.HISTORY);
    if (history === undefined) {
        await Local.set(STORE.HISTORY, []);
    }
};

const updateMenu = () => {
    chrome.contextMenus.create({
        id: MENU.HISTORY,
        title: "History",
        contexts: ["action"],
        type: "normal",
        enabled: true
    });

    chrome.contextMenus.create({
        id: MENU.FREQUENCY,
        title: "Frequency",
        contexts: ["action"],
        type: "normal",
        enabled: true
    });
};

export const onInstall = async () => {
    updateMenu();

    await updateDefaultValues();

    await onUpdate();
};

export const onUpdate = async () => {
    const root = await getRoot();
    const bookmarks = await getBookmarksList(root);
    await Local.set(STORE.BOOKMARKS, bookmarks);
};
