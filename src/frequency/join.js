import {
    FreakItem,
    FreakItemView
} from "../common/index.js";

export const groupByIdAndOrderDesc = (history) => {
    const frequency = {};
    for (const item of history) {
        if (frequency[item.id] === undefined) {
            frequency[item.id] = 1;
        } else {
            frequency[item.id]++;
        }
    }

    const orderedFrequency = [];

    for (const id in frequency) {
        if (Object.hasOwnProperty.call(frequency, id)) {
            const count = frequency[id];
            orderedFrequency.push(new FreakItem(id, count));
        }
    }

    orderedFrequency.sort(({ count: a }, { count: b }) => b - a);

    return orderedFrequency;
};

export const join = (history, bookmarks) => {
    const frequency = groupByIdAndOrderDesc(history);
    return frequency.map((element, index) => {
        const bookmark = bookmarks.find(({ id }) => id === element.id);

        if(bookmark === undefined){
            return new FreakItemView(index + 1, element.count, `<NOT FOUND BOOKMARK #${element.id}>`);
        }

        const dirs = bookmark.dirs && bookmark.dirs.length !== 0 ? (bookmark.dirs.join("/") + ":") : "";
        const name = `${dirs}${bookmark.title}`;
        return new FreakItemView(index +1, element.count, name);
    });
};
