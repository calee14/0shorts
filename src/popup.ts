/**
 * popup.ts
 * Use this script to handle the js behind the extension popup.
 * Can be used to send messages to content.ts or to the background.ts
 */
import { DNRRule } from './types'

console.log('popup.ts');

(async () => {
    const storageObj = await chrome.storage.local.get('blockedUrls');
    const blockedUrls: string[] = storageObj['blockedUrls'];
    const unblockedUrls = ["||facebook.com"]// await chrome.storage.local.get('unblockedUrls');
    console.log(blockedUrls, unblockedUrls)

    const rules: DNRRule[] = [];
    var counter = 0;
    blockedUrls.forEach((url: string) => {
        if(unblockedUrls.indexOf(url) > -1) return;
        console.log(url, url in unblockedUrls)
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

    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const updateRuleOptions: chrome.declarativeNetRequest.UpdateRuleOptions = {
        removeRuleIds: existingRules.map((rule) => rule.id),
        addRules: rules as chrome.declarativeNetRequest.Rule[]
    }
    await chrome.declarativeNetRequest.updateDynamicRules(updateRuleOptions);

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

