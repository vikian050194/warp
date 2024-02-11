import { getVersion } from "../common/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    const version = getVersion();

    // Version
    document.getElementById("version").innerText = version;
});
