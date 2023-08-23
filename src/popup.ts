console.log('popup.ts');

// sends message to content script
// (async () => {
//     const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
//     const response = await chrome.tabs.sendMessage(tab.id || 0, {greeting: "hello"});
//     // do something with response here, not outside the function
//     console.log(response);
// })();