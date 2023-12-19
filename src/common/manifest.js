export const getVersion = () => {
    return `v${chrome.runtime.getManifest()["version"]}`;
};

export const getName = () => {
    return chrome.runtime.getManifest()["name"];
};