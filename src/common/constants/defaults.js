import * as OPTIONS from "./options.js";
import { FREQUENCY } from "./sorting.js";
import { ALWAYS } from "./neighbour.js";
import { P12 } from "./fonts.js";
import { BOLD } from "./weight.js";
import { RED } from "./colors.js";
import { D365 } from "./expiration.js";
import { T5 } from "./autoclose.js";
import { I10 } from "./page.js";

export const DEFAULTS = {
    [OPTIONS.CUSTOM_DIRECTORY]: "Warp",
    [OPTIONS.IS_CUSTOM_DIRECTORY]: false,

    [OPTIONS.HISTORY_MAX_COUNT]: 100000,
    [OPTIONS.HISTORY_EXPIRATION_TIME]: D365,

    [OPTIONS.SEARCH_IS_CASE_SENSITIVE]: false,

    [OPTIONS.RESULTS_PER_PAGE]: I10,
    [OPTIONS.RESULTS_SORTING]: FREQUENCY,
    [OPTIONS.RESULTS_LOOPING]: true,

    [OPTIONS.UI_SELECTED_ITEM_COLOR]: RED,
    [OPTIONS.UI_SELECTED_ITEM_ARROW]: true,
    [OPTIONS.UI_SELECTED_ITEM_FONT_WEIGHT]: BOLD,
    [OPTIONS.UI_FONT_SIZE]: P12,

    [OPTIONS.NEW_TAB_KEEP_GROUP]: true,
    [OPTIONS.NEW_TAB_KEEP_NEIGHBOUR]: ALWAYS,
    [OPTIONS.NEW_TAB_ON_SHIFT]: true,

    [OPTIONS.IS_AUTOCLOSE_ENABLED]: true,
    [OPTIONS.AUTOCLOSE_TIME]: T5,

    [OPTIONS.CHANGELOG_SHOW]: true
};
