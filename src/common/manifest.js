export const getVersion = () => {
    return `v${chrome.runtime.getManifest()["version"]}`;
};