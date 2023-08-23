/**
 * content.ts
 * Used for writing functions that will run in the contenxt of the web page (tab).
 * The scripts will be loaded into each web page and run in the background of the
 * web app.
 */
console.log('content.ts');

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting === "hello")
            sendResponse({ farewell: "goodbye" });
    }
);