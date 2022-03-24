// chrome.runtime.onInstalled.addListener(() => {
// run scan function
// });

chrome.runtime.onStartup.addListener(() => {
    // run scan function
});

// chrome.bookmarks.onChanged.addListener(() => {
// run scan function
// });

// chrome.bookmarks.onChildrenReordered.addListener(() => {
// run scan function
// });

// chrome.bookmarks.onMoved.addListener(() => {
// run scan function
// });

// chrome.bookmarks.onRemoved.addListener(() => {
// run scan function
// });

// chrome.bookmarks.getTree((tree) => {
//     debugger;
// });

chrome.runtime.onMessage.addListener((message, callback) => {
    console.log(`Message "${message} ${callback}"`);
});

chrome.commands.onCommand.addListener((command) => {
    console.log(`Command "${command}"`);
});
