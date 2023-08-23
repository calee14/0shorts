/**
 * background.ts
 * Used for running functions that would run in the whole context of the 
 * browser and extension. This will run when there are changes to moving 
 * to a new page or closing a tab or clicking the extension icon. 
 * The scripts in background.ts will run in the context of the entire browser
 * thus they can receive messages sent from the content.ts scripts.
 */
let active = false;

function makeOrange(color: string): void {
    document.body.style.backgroundColor = color;
}

console.log('background.ts');

// chrome.action.onClicked.addListener((tab) => {
//     active = !active;
//     console.log('hi');
//     const color = active ? 'orange' : 'white';
//     chrome.scripting.executeScript({
//         target: {tabId: tab.id ? tab.id : -1},
//         func: makeOrange,
//         args: [color]
//     }).then();
// });

// // recieve message from content.ts
// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         console.log(sender.tab ?
//             "from a content script:" + sender.tab.url :
//             "from the extension");
//         if (request.greeting === "hello")
//             sendResponse({ farewell: "goodbye" });
//     }
// );
