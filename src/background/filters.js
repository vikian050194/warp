export const filerByTitle = (query, bookmarks) => {
    const parts = query.split(" ");
    return bookmarks.filter(b => b.title.indexOf(parts[0]) == 0);
};
