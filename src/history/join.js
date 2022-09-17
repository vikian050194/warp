import { HistoryItemView } from "../common/index.js";

export const join = (history, bookmarks) => {
    const reversed = history.reverse();
    const maxIndex = reversed.length;
    return reversed.map((item, index) => {
        const bookmark = bookmarks.find(({ id }) => id === item.id);

        if(bookmark === undefined){
            return new HistoryItemView(maxIndex - index, item.date, `<NOT FOUND BOOKMARK #${item.id}>`);
        }

        const dirs = bookmark.dirs && bookmark.dirs.length !== 0 ? (bookmark.dirs.join("/") + ":") : "";
        const name = `${dirs}${bookmark.title}`;
        return new HistoryItemView(maxIndex - index, item.date, name);
    });
};
