import {
    Sync,
    Local,
    OPTIONS,
    DEFAULTS,
    STORE,
    MENU,
    COUNTERS,
    EXPIRATION
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
    const history = await Local.get(STORE.HISTORY);
    if (history === undefined) {
        await Local.set(STORE.HISTORY, []);
    }

    const since = await Local.get(COUNTERS.SINCE);
    if (since === undefined) {
        await Local.set(COUNTERS.SINCE, new Date().toISOString());
        await Local.set(COUNTERS.OPEN_UPDATE, 0);
        await Local.set(COUNTERS.OPEN_CREATE, 0);
    }

    const customHandledOptions = [
        "HISTORY_EXPIRATION_TIME",
        "UI_FONT_SIZE"
    ];

    for (const key in OPTIONS) {
        if (customHandledOptions.includes(key)) {
            continue;
        }

        const currentValue = await Sync.get(OPTIONS[key]);
        if (currentValue === undefined) {
            await Sync.set(OPTIONS[key], DEFAULTS[OPTIONS[key]]);
        }
    }

    const expirationTime = await Sync.get(OPTIONS.HISTORY_EXPIRATION_TIME);
    if (expirationTime === undefined) {
        await Sync.set(OPTIONS.HISTORY_EXPIRATION_TIME, DEFAULTS[OPTIONS.HISTORY_EXPIRATION_TIME]);
    } else {
        let newValue = 0;
        switch (expirationTime) {
            case 31536000: {
                newValue = EXPIRATION.D365;
                break;
            }
            case 15552000: {
                newValue = EXPIRATION.D180;
                break;
            }
            case 7776000: {
                newValue = EXPIRATION.D90;
                break;
            }
            case 2678400: {
                newValue = EXPIRATION.D31;
                break;
            }
            case 1209600: {
                newValue = EXPIRATION.D14;
                break;
            }
            case 604800: {
                newValue = EXPIRATION.D7;
                break;
            }
            case 86400: {
                newValue = EXPIRATION.D1;
                break;
            }
        }
        if (newValue !== 0) {
            await Sync.set(OPTIONS.HISTORY_EXPIRATION_TIME, newValue);
        }
    }

    const fontSize = await Sync.get(OPTIONS.UI_FONT_SIZE);
    if (fontSize === undefined) {
        await Sync.set(OPTIONS.UI_FONT_SIZE, DEFAULTS[OPTIONS.UI_FONT_SIZE]);
    } else {
        if (fontSize.includes("px")) {
            const newValue = parseInt(fontSize.replace("px", ""));
            await Sync.set(OPTIONS.UI_FONT_SIZE, newValue);
        }
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

    chrome.contextMenus.create({
        id: MENU.COUNTERS,
        title: "Counters",
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
