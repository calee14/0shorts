(()=>{"use strict";let e=!1;function o(e){document.body.style.backgroundColor=e}console.log("hello there"),chrome.action.onClicked.addListener((t=>{e=!e,console.log("hi"),chrome.runtime.sendMessage({action:"iconClicked"});const c=e?"orange":"white";chrome.scripting.executeScript({target:{tabId:t.id?t.id:-1},func:o,args:[c]}).then()}))})();