/**
 * content.ts
 * Used for writing functions that will run in the contenxt of the web page (tab).
 * The scripts will be loaded into each web page and run in the background of the
 * web app.
 * The scripts in content.ts can send messages to background.ts as long as there is
 * listener on the background.ts end.
 */
console.log('content.ts');

// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         console.log(sender.tab ?
//             "from a content script:" + sender.tab.url :
//             "from the extension");
//         if (request.greeting === "hello")
//             sendResponse({ farewell: "goodbye" });
//     }
// );

// send message to background.ts
(async () => {
    const response = await chrome.runtime.sendMessage({greeting: "hello"});
    // do something with response here, not outside the function
    console.log(response);
})();