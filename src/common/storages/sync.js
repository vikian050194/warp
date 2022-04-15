export class Sync {
    static async get(key){
        const valueObject = await chrome.storage.sync.get([key]);
        return valueObject[key];
    }

    static async set(key, value){
        await chrome.storage.sync.set({ [key]: value });
    }
}
