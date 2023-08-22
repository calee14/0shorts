chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'iconClicked') {
        // Handle the icon click action, e.g., update the UI or perform an action
        console.log('Icon click action received in popup.');
    }
});