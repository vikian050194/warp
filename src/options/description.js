import {
    OPTIONS,
    DEFAULTS,
    SORTING,
    NEIGHBOUR
} from "../common/index.js";
import { getTranslation } from "./translation.js";

class Description {
    constructor(id, title, paragraphs) {
        this.id = id;
        this.title = title;
        this.paragraphs = paragraphs;
    }
}

const getDefault = (key) => `<i>Default value is &laquo;${getTranslation(DEFAULTS[key])}&raquo;.</i>`;

const makeDescription = (key, title, paragraphs) => new Description(key, title, [...paragraphs, getDefault(key)]);

export const descriptions = [
    makeDescription(
        OPTIONS.IS_CUSTOM_DIRECTORY,
        "Custom directory",
        [
            "Enable it to be more specific. Probably you would like to have one particular directory with only frequently used bookmarks that have short adjusted names and sub-directories structure for fast and easy search.",
            "Or disable it for unlimited search through all bookmarks in &laquo;Bookmarks bar&raquo;.", 
            "But take into account that unlimited search could be slow in some cases."
        ]
    ),
    makeDescription(
        OPTIONS.CUSTOM_DIRECTORY,
        "Custom directory name",
        [
            "Directory with bookmarks to search for.",
            "Name should be unique! Extension is trying to search for it by name and it should get only one result.",
            "You can check the uniqueness of the name via search in &laquo;Bookmarks manager&raquo;."
        ]
    ),

    makeDescription(
        OPTIONS.HISTORY_MAX_COUNT,
        "History size",
        [
            "History size is limited.",
            "Oldest items will be automatically deleted if actual size becomes above specified threshold."
        ]
    ),
    makeDescription(
        OPTIONS.HISTORY_EXPIRATION_TIME,
        "History expiration time",
        [
            "History items have expiration time in days.",
            "Oldest items will be automatically deleted if they become older than specified threshold."
        ]
    ),

    makeDescription(
        OPTIONS.SEARCH_IS_CASE_SENSITIVE,
        "Case sensitivity",
        [
            "Search algorithms work taking into account (or not) case sensitivity."
        ]
    ),

    makeDescription(
        OPTIONS.SEARCH_IS_STARTS_WITH,
        "Starts with",
        [
            "Search algorithms use \"starts with\" for sub-searching if enabled.",
            "Otherwise \"contains\" is used."
        ]
    ),

    makeDescription(
        OPTIONS.SEARCH_SPLIT,
        "Split search",
        [
            "Split searching algorithm.",
            "Disable it if you are not using it to improve performance.",
            "It's heavy."
        ]
    ),

    makeDescription(
        OPTIONS.SEARCH_ABBREVIATION,
        "Abbreviation search",
        [
            "Abbreviation searching algorithm.",
            "Disable it if you are not using it to improve performance.",
            "It's heavy."
        ]
    ),

    makeDescription(
        OPTIONS.RESULTS_PER_PAGE,
        "Page size",
        [
            "Searching results are splitted by pages.",
            "Optimal page size depends on your workflow."
        ]
    ),
    makeDescription(
        OPTIONS.RESULTS_SORTING,
        "Results sorting",
        [
            "Searching results are sorted in one of predefined ways.",
            `&laquo;${getTranslation(SORTING.AS_IS)}&raquo; - order of elements yielded by depth-first pre-order search.`,
            `&laquo;${getTranslation(SORTING.ALPHABET)}&raquo; - alphabetical order of full names (directories plus name).`,
            `&laquo;${getTranslation(SORTING.HISTORY)}&raquo; - order according to usage history.`,
            `&laquo;${getTranslation(SORTING.FREQUENCY)}&raquo; - order according to usage frequency.`
        ]
    ),
    makeDescription(
        OPTIONS.RESULTS_LOOPING,
        "Results looping",
        [
            "Jump at the end or at the beginning on attempt to move out of list boundaries."
        ]
    ),

    makeDescription(
        OPTIONS.UI_FONT_SIZE,
        "Font size",
        [
            "Popup font size in pixels."
        ]
    ),
    makeDescription(
        OPTIONS.UI_SELECTED_ITEM_COLOR,
        "Selected item color",
        [
            "Color of selected item.",
            "It's also used in different places on options page."
        ]
    ),
    makeDescription(
        OPTIONS.UI_SELECTED_ITEM_FONT_WEIGHT,
        "Selected item font weight",
        [
            "Font weight of selected item."
        ]
    ),
    makeDescription(
        OPTIONS.UI_SELECTED_ITEM_ARROW,
        "Arrow pointer",
        [
            "Arrow appears in front of selected item."
        ]
    ),

    makeDescription(
        OPTIONS.NEW_TAB_ON_SHIFT,
        "Additional action",
        [
            "If enabled press additional \"Shift\" (in other words \"Shift+Enter\") to open new tab.",
            "If disabled than the same action leads to current tab update."
        ]
    ),
    makeDescription(
        OPTIONS.NEW_TAB_KEEP_GROUP,
        "Keep group",
        [
            "If enabled press additional \"Ctrl\" to open new tab in the current group if it exists.",
            "Do not press \"Ctrl\" to get opposite behaviour.",
            "If disabled then logic is inverted."
        ]
    ),
    makeDescription(
        OPTIONS.NEW_TAB_KEEP_NEIGHBOUR,
        "Keep neighbour",
        [
            "Open new tab next to active one.",
            `&laquo;${getTranslation(NEIGHBOUR.NEVER)}&raquo; - always most right position.`,
            `&laquo;${getTranslation(NEIGHBOUR.ONLY_IN_GROUP)}&raquo; - next to active inside group.`,
            `&laquo;${getTranslation(NEIGHBOUR.ONLY_WITHOUT_GROUP)}&raquo; - next to active without group.`,
            `&laquo;${getTranslation(NEIGHBOUR.ALWAYS)}&raquo; - always next to active.`
        ]
    ),

    makeDescription(
        OPTIONS.IS_AUTOCLOSE_ENABLED,
        "Autoclose enabled",
        [
            "If enabled then popup will be closed automatically after usage.",
            "It's possible to cancel closing by any key pressing."
        ]
    ),
    makeDescription(
        OPTIONS.AUTOCLOSE_TIME,
        "Autoclose time",
        [
            "Popup autoclose time in seconds."
        ]
    ),

    makeDescription(
        OPTIONS.CHANGELOG_SHOW,
        "Show on update",
        [
            "If enabled then changelog page will be shown automatically on extension version update."
        ]
    )
];