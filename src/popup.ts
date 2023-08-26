/**
 * popup.ts
 * Use this script to handle the js behind the extension popup.
 * Can be used to send messages to content.ts or to the background.ts
 */
import { DNRRule } from './types'

console.log('popup.ts');

(async () => {
    const blockedUrls = await chrome.storage.local.get('blockedUrls');
    console.log(blockedUrls)

    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const yesInstagramId: DNRRule = {
        id: 101,
        priority: 2,
        action: {
            type: "allow"
        },
        condition: {
            urlFilter: "||youtube.com",
            resourceTypes: [
                "main_frame"
            ]
        }
    }
    const updateRuleOptions: chrome.declarativeNetRequest.UpdateRuleOptions = {
        removeRuleIds: existingRules.map((rule) => rule.id),
        addRules: [yesInstagramId as chrome.declarativeNetRequest.Rule]
    }
    // const currentRules = await chrome.declarativeNetRequest.updateDynamicRules(updateRuleOptions);
    // const oldRules = await chrome.declarativeNetRequest.getEnabledRulesets();
    console.log(existingRules)
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

