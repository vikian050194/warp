import {
    ui,
    Sync,
    Local,
    OPTIONS,
    STORE,
    MENU,
    COUNTERS,
    SORTING,
    NEIGHBOUR
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

    const resultsPerPage = await Sync.get(OPTIONS.RESULTS_PER_PAGE);
    if (resultsPerPage === undefined) {
        await Sync.set(OPTIONS.RESULTS_PER_PAGE, 10);
    }

    const resultsSorting = await Sync.get(OPTIONS.RESULTS_SORTING);
    if (resultsSorting === undefined) {
        await Sync.set(OPTIONS.RESULTS_SORTING, SORTING.FREQUENCY);
    }

    const resultsLooping = await Sync.get(OPTIONS.RESULTS_LOOPING);
    if (resultsLooping === undefined) {
        await Sync.set(OPTIONS.RESULTS_LOOPING, true);
    }

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

    const fontSize = await Sync.get(OPTIONS.UI_FONT_SIZE);
    if (fontSize === undefined) {
        await Sync.set(OPTIONS.UI_FONT_SIZE, ui.defaultSize);
    }

    const color = await Sync.get(OPTIONS.UI_SELECTED_ITEM_COLOR);
    if (color === undefined) {
        await Sync.set(OPTIONS.UI_SELECTED_ITEM_COLOR, ui.defaultColor.value);
    }

    const weight = await Sync.get(OPTIONS.UI_SELECTED_ITEM_FONT_WEIGHT);
    if (weight === undefined) {
        await Sync.set(OPTIONS.UI_SELECTED_ITEM_FONT_WEIGHT, ui.defaultWeight);
    }

    const arrow = await Sync.get(OPTIONS.UI_SELECTED_ITEM_ARROW);
    if (arrow === undefined) {
        await Sync.set(OPTIONS.UI_SELECTED_ITEM_ARROW, true);
    }

    const group = await Sync.get(OPTIONS.NEW_TAB_KEEP_GROUP);
    if (group === undefined) {
        await Sync.set(OPTIONS.NEW_TAB_KEEP_GROUP, true);
    }

    const onShift = await Sync.get(OPTIONS.NEW_TAB_ON_SHIFT);
    if (onShift === undefined) {
        await Sync.set(OPTIONS.NEW_TAB_ON_SHIFT, true);
    }

    const neighbour = await Sync.get(OPTIONS.NEW_TAB_KEEP_NEIGHBOUR);
    if (neighbour === undefined) {
        await Sync.set(OPTIONS.NEW_TAB_KEEP_NEIGHBOUR, NEIGHBOUR.ALWAYS);
    }

    const isAutocloseEnabled = await Sync.get(OPTIONS.IS_AUTOCLOSE_ENABLED);
    if (isAutocloseEnabled === undefined) {
        await Sync.set(OPTIONS.IS_AUTOCLOSE_ENABLED, true);
    }

    const autocloseTime = await Sync.get(OPTIONS.AUTOCLOSE_TIME);
    if (autocloseTime === undefined) {
        await Sync.set(OPTIONS.AUTOCLOSE_TIME, 5);
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
