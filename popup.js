function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
};

let index = 0;
colors = ["#4285f4", "#34a853", "#fbbc05", "#ea4335"];

window.addEventListener("load", () => {
    let changeColor = document.getElementById("changeColor");

    // chrome.storage.sync.get("color", ({ color }) => {
    //     changeColor.style.backgroundColor = color;
    // });

    changeColor.addEventListener("click", async () => {
        changeColor.style.backgroundColor = colors[index];
        index = (index + 1) % colors.length;

        // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        // chrome.scripting.executeScript({
        //     target: { tabId: tab.id },
        //     function: setPageBackgroundColor,
        // });
    });

    // The body of this function will be executed as a content script inside the
    // current page
});
