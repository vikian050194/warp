import {
    compare as compareByAlphabet
} from "./alphabet.js";

const findLastIndex = (elements, target) => {
    const indexes = elements.map((value, index) => value === target ? index : -1).filter(x => x > -1);

    if (indexes.length === 0) {
        return -1;
    }

    return indexes[indexes.length - 1];
};

const compare = (a, b, history) => {
    const ids = history.map(({ id }) => id);
    const aj = findLastIndex(ids, a.id);
    const bj = findLastIndex(ids, b.id);

    if (aj === bj) {
        return compareByAlphabet(a, b);
    }

    if(aj === -1 && bj !== -1){
        return 1;
    }

    if(aj !== -1 && bj === -1){
        return -1;
    }

    if (aj > bj) {
        return -1;
    }

    return 1;
};

export const sortByHistory = (items, history, isAscending = true) => {
    const result = [...items];

    result.sort((a, b) => compare(a, b, history) * (isAscending ? 1 : -1));

    return result;
};
