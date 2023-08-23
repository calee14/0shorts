/**
 * background.ts
 * Used for running functions that would run in the whole context of the 
 * browser and extension. This will run when there are changes to moving 
 * to a new page or closing a tab or clicking the extension icon. 
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