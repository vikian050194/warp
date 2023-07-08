import { HistoryView } from "../common/index.js";

export const join = (history, bookmarks) => {
    const reversed = history.reverse();
    const maxIndex = reversed.length;
    return reversed.map((item, index) => {
        const bookmark = bookmarks.find(({ id }) => id === item.id);

        const originalIndex = maxIndex - index - 1;

        if(bookmark === undefined){
            return new HistoryView(originalIndex, maxIndex - index, item.date, `<NOT FOUND BOOKMARK #${item.id}>`);
        }

        const dirs = bookmark.dirs && bookmark.dirs.length !== 0 ? (bookmark.dirs.join("/") + ":") : "";
        const name = `${dirs}${bookmark.title}`;
        return new HistoryView(originalIndex, maxIndex - index, item.date, name);
    });
};
