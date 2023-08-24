/**
 * popup.ts
 * Use this script to handle the js behind the extension popup.
 * Can be used to send messages to content.ts or to the background.ts
 */
console.log('popup.ts');

(async () => {
    const oldRules = await chrome.declarativeNetRequest.getAvailableStaticRuleCount();
})();

// sends message to content script
// (async () => {
//     const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
//     const response = await chrome.tabs.sendMessage(tab.id || 0, {greeting: "hello"});
//     // do something with response here, not outside the function
//     console.log(response);
// })();

// sends message to background.ts
// (async () => {
//     const response = await chrome.runtime.sendMessage({greeting: "hello"});
//     // do something with response here, not outside the function
//     console.log(response);
// })();

