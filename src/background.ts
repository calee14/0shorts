let active = false;

function makeOrange(color: string): void {
    document.body.style.backgroundColor = color;
}

console.log('hello there');

chrome.action.onClicked.addListener((tab) => {
    active = !active;
    console.log('hi');
    chrome.runtime.sendMessage({ action: 'iconClicked' });
    const color = active ? 'orange' : 'white';
    chrome.scripting.executeScript({
        target: {tabId: tab.id ? tab.id : -1},
        func: makeOrange,
        args: [color]
    }).then();
});
