import { HistoryItemView } from "../common/index.js";

export const join = (history, bookmarks) => {
    const reversed = history.reverse();
    return reversed.map((item, index) => {
        const bookmark = bookmarks.find(({ id }) => id === item.id);

        if(bookmark === undefined){
            return new HistoryItemView(index + 1, item.date, `<NOT FOUND BOOKMARK #${item.id}>`);
        }

        const dirs = bookmark.dirs && bookmark.dirs.length !== 0 ? (bookmark.dirs.join("/") + ":") : "";
        const name = `${dirs}${bookmark.title}`;
        return new HistoryItemView(index + 1, item.date, name);
    });
};
