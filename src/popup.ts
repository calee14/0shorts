/**
 * popup.ts
 * Use this script to handle the js behind the extension popup.
 * Can be used to send messages to content.ts or to the background.ts
 */
import { DNRRule } from './types'

console.log('popup.ts');

async function updateBlockedSites() {
  const storageBlockedUrls = await chrome.storage.local.get('blockedUrls');
  const blockedUrls = storageBlockedUrls['blockedUrls'];
  // const storageUnblockedUrls =  await chrome.storage.local.get('unblockedUrls');
  // const unblockedUrls: string[] = ['||facebook.com']; //storageUnblockedUrls['unblockedUrls']
  console.log(blockedUrls)

  const rules: DNRRule[] = [];
  var counter = 0;
  // update black list of urls. unblock sites if in unblocked url array
  Object.keys(blockedUrls).forEach((url: string) => {
    if (blockedUrls[url] === false) return;
    const newRule: DNRRule = {
      id: 100 + counter,
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

  // update rule for url filtering in browser
  const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
  const updateRuleOptions: chrome.declarativeNetRequest.UpdateRuleOptions = {
    removeRuleIds: existingRules.map((rule) => rule.id),
    addRules: rules as chrome.declarativeNetRequest.Rule[]
  }
  await chrome.declarativeNetRequest.updateDynamicRules(updateRuleOptions);
};

(async () => {
  await updateBlockedSites();
})();

async function clickedUrl(event: Event) {
  if (event.target instanceof HTMLInputElement) {
    try {
      // update the local storage of blocked urls
      const checked = event.target.checked;
      const url = event.target.getAttribute('url') ?? '';

      const storageBlockedUrls = await chrome.storage.local.get('blockedUrls');
      const blockedUrls = storageBlockedUrls['blockedUrls'];

      blockedUrls[url] = checked;

      await chrome.storage.local.set({ blockedUrls: blockedUrls });
      await updateBlockedSites();
    } catch (error) {
      console.error('An error occured. It is likely due to the input element not having the url attribute.');
      console.error('Here is the error:', error);
    }
  }
}

(async () => {
  // ul element that will contain blocked urls
  const list = document.getElementById('sites');

  const storageBlockedUrls = await chrome.storage.local.get('blockedUrls');
  const blockedUrls = storageBlockedUrls['blockedUrls'];
  // const storageUnblockedUrls =  await chrome.storage.local.get('unblockedUrls');
  // const unblockedUrls: string[] = ['||facebook.com'] //storageUnblockedUrls['unblockedUrls'];

  Object.keys(blockedUrls).forEach((url: string) => {
    const container = document.createElement('div');
    container.className = 'urlContainer';

    // url label html
    const urlLabel = document.createElement('label');
    urlLabel.className = 'urlLabel'
    urlLabel.innerText = url.substring(2);
    // switch html
    const selector = `
        <label class="switch">
            <input class="selector" url="${url}" type="checkbox" ${blockedUrls[url] !== false ? 'checked' : ''}>
            <span class="slider"></span>
        </label>`;
    const urlSwitch = document.createElement('div');
    urlSwitch.addEventListener('click', clickedUrl);
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

