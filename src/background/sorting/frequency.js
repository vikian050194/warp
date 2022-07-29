import {
    compare as compareByAlphabet
} from "./alphabet.js";

const compare = (a, b, frequency) => {
    const af = frequency.find(({ id }) => a.id === id);
    const bf = frequency.find(({ id }) => b.id === id);

    const aj = af === undefined ? -1 : af.count;
    const bj = bf === undefined ? -1 : bf.count;

    if (aj === bj) {
        return compareByAlphabet(a, b);
    }

    if (aj === -1 && bj !== -1) {
        return 1;
    }

    if (aj !== -1 && bj === -1) {
        return -1;
    }

    if (aj > bj) {
        return -1;
    }

    return 1;
};

export const sortByFrequency = (items, frequency, isAscending = true) => {
    const result = [...items];

    result.sort((a, b) => compare(a, b, frequency) * (isAscending ? 1 : -1));

    return result;
};
