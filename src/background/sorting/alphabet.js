const join = a => a.dirs.join() + a.title;

export const compare = (a, b) => {
    const aj = join(a);
    const bj = join(b);

    if (aj === bj) {
        return 0;
    }

    if (aj > bj) {
        return 1;
    }

    return -1;
};

export const sortByAlphabet = (items, isAscending = true) => {
    const result = [...items];

    result.sort((a, b) => compare(a, b) * (isAscending ? 1 : -1));

    return result;
};
