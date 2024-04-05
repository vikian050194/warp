import {
    COLORS,
    SORTING,
    NEIGHBOUR
} from "../common/index.js";

// TODO remove unnecessary locales if possible
// probably something like .replace("_", " ") helps
const translations = {
    [SORTING.AS_IS]: "as is",
    [SORTING.ALPHABET]: "alphabet",
    [SORTING.HISTORY]: "history",
    [SORTING.FREQUENCY]: "frequency",
    [NEIGHBOUR.NEVER]: "never",
    [NEIGHBOUR.ONLY_IN_GROUP]: "only in group",
    [NEIGHBOUR.ONLY_WITHOUT_GROUP]: "only without group",
    [NEIGHBOUR.ALWAYS]: "always",
    [COLORS.BLUE]: "blue",
    [COLORS.VIOLET]: "violet",
    [COLORS.RED]: "red",
    [COLORS.ORANGE]: "orange",
    [COLORS.CYAN]: "cyan",
    [COLORS.YELLOW]: "yellow",
    [COLORS.PINK]: "pink",
    [COLORS.GREEN]: "green",
    [COLORS.GRAY]: "gray"
};

export const getTranslation = (key) => {
    return translations[key] === undefined ? key : translations[key];
};