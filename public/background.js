const webRequestCallback = async (details) => {
    console.log('here')
    console.log(details.url);
};
const filter = {urls: []};

chrome.webRequest.onCompleted.addListener(webRequestCallback, filter);

const onBeforeWebRequestCallback = async (details) => {
    console.log('here before')
    console.log(details.url);
    blockingResponse = {cancel: true}
};

chrome.webRequest.onBeforeRequest.addListener(onBeforeWebRequestCallback, filter);