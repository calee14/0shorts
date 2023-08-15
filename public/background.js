const webRequestCallback = async (details) => {
    console.log('here')
    console.log(details.url);
};
const filter = {urls: []};
chrome.webRequest.onCompleted.addListener(webRequestCallback, filter);