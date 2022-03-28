export const commonLog = () => {
    console.log("foo from common.js");
}

export const setOption = (key, value) => {
    chrome.storage.sync.set({ [key]: value });
}

export const getOption = async (key) => {
    const valueObject = await chrome.storage.sync.get([key]);
    return valueObject[key];
};
