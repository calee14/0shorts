/**
 * background.ts
 * Used for running functions that would run in the whole context of the 
 * browser and extension. This will run when there are changes to moving 
 * to a new page or closing a tab or clicking the extension icon. 
 * The scripts in background.ts will run in the context of the entire browser
 * thus they can receive messages sent from the content.ts scripts.
 */

import { DNRRule } from './types'

console.log('background.ts');

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
    const msg = `Navigation blocked to ${e.request.url} on tab ${e.request.tabId}.`;
    console.log(msg);
});

// let active = false;

// function makeOrange(color: string): void {
//     document.body.style.backgroundColor = color;
// }

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

// // recieve message from content.ts or popup.ts
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting === "hello")
            sendResponse({ farewell: "goodbye" });
    }
);

chrome.runtime.onInstalled.addListener(async (details) => {
    if(details.reason === "install") {
        await chrome.storage.local.set({
            blockedUrls: {'||facebook.com': true, '||instagram.com': true, '||tikok.com': true, '||twitter.com': true, '||youtube.com': true, '||tumblr.com': true, '||netflix.com': true, '||max.com': true},
        });

        const storageObj = await chrome.storage.local.get('blockedUrls');
        const blockedUrls: object = storageObj['blockedUrls'];

        const rules: DNRRule[] = [];
        var counter = 0;
        Object.keys(blockedUrls).forEach((url: string) => {
            const newRule: DNRRule = {
                id: 100+counter,
                priority: 1,
                action: {
                    type: "redirect",
                    redirect: { url: "https://google.com" }
                },
                condition: {
                    urlFilter: url,
                    resourceTypes: [
                        "main_frame"
                    ]
                }
            };
            counter += 1;
            rules.push(newRule);
        });
        // get existing rules
        const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
        // remove existing rules and add base rules
        const updateRuleOptions: chrome.declarativeNetRequest.UpdateRuleOptions = {
            removeRuleIds: existingRules.map((rule) => rule.id),
            addRules: rules as chrome.declarativeNetRequest.Rule[]
        };
        await chrome.declarativeNetRequest.updateDynamicRules(updateRuleOptions);
    }
})