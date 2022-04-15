export class Local {
    static async get(key){
        const valueObject = await chrome.storage.local.get([key]);
        return valueObject[key];
    }

    static async set(key, value){
        await chrome.storage.local.set({ [key]: value });
    }
}
