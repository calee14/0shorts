/**
 * popup.ts
 * Use this script to handle the js behind the extension popup.
 * Can be used to send messages to content.ts or to the background.ts
 */
import { DNRRule } from './types'

console.log('popup.ts');

(async () => {
    const storageBlockedUrls = await chrome.storage.local.get('blockedUrls');
    const blockedUrls: string[] = storageBlockedUrls['blockedUrls'];
    const storageUnblockedUrls =  await chrome.storage.local.get('unblockedUrls');
    const unblockedUrls: string[] = ['||facebook.com']; //storageUnblockedUrls['unblockedUrls']
    console.log(blockedUrls, unblockedUrls)

    const rules: DNRRule[] = [];
    var counter = 0;
    // update black list of urls. unblock sites if in unblocked url array
    blockedUrls.forEach((url: string) => {
        if(unblockedUrls.indexOf(url) > -1) return;
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

(async () => {
    // ul element that will contain blocked urls
    const list = document.getElementById('sites');

    const storageBlockedUrls = await chrome.storage.local.get('blockedUrls');
    const blockedUrls: string[] = storageBlockedUrls['blockedUrls'];
    const storageUnblockedUrls =  await chrome.storage.local.get('unblockedUrls');
    const unblockedUrls: string[] = storageUnblockedUrls['unblockedUrls']
    
    blockedUrls.forEach((url) => {
        const container = document.createElement('div');
        container.className = 'urlContainer';

        // url label html
        const urlLabel = document.createElement('label');
        urlLabel.className = 'urlLabel'
        urlLabel.innerText = url;
        // switch html
        const selector = `
        <label class="switch">
            <input class="selector" type="checkbox">
            <span class="slider"></span>
        </label>`;
        const urlSwitch = document.createElement('div');
        urlSwitch.className = 'switch';
        urlSwitch.innerHTML = selector;

        container.appendChild(urlLabel);
        container.appendChild(urlSwitch);
        
        list?.appendChild(container);
    })
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

