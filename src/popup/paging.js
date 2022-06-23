export const splitByPages = (input, size) => {
    const result = [];

    for (let i = 0; i < input.length; i += size) {
        result.push(input.slice(i, i + size));
    }

    return result;
};
