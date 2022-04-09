export const setOption = (key, value) => {
    chrome.storage.sync.set({ [key]: value });
}

export const getOption = async (key) => {
    const valueObject = await chrome.storage.sync.get([key]);
    return valueObject[key];
};

// TODO extract classes to separate files
export class LevelModel {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
}

export class BookmarkModel {
    constructor(dirs, title, url) {
        this.dirs = dirs;
        this.title = title;
        this.url = url;
    }
}
