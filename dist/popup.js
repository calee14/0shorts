(()=>{"use strict";({975:function(e,t){var c=this&&this.__awaiter||function(e,t,c,o){return new(c||(c=Promise))((function(n,l){function i(e){try{r(o.next(e))}catch(e){l(e)}}function a(e){try{r(o.throw(e))}catch(e){l(e)}}function r(e){var t;e.done?n(e.value):(t=e.value,t instanceof c?t:new c((function(e){e(t)}))).then(i,a)}r((o=o.apply(e,t||[])).next())}))};function o(e){e.target instanceof HTMLInputElement&&console.log(e.target.checked)}Object.defineProperty(t,"__esModule",{value:!0}),console.log("popup.ts"),c(void 0,void 0,void 0,(function*(){const e=(yield chrome.storage.local.get("blockedUrls")).blockedUrls,t=(yield chrome.storage.local.get("unblockedUrls"),["||facebook.com"]);console.log(e,t);const c=[];var o=0;e.forEach((e=>{if(t.indexOf(e)>-1)return;const n={id:100+o,priority:1,action:{type:"redirect",redirect:{url:"https://google.com"}},condition:{urlFilter:e,resourceTypes:["main_frame"]}};o+=1,c.push(n)}));const n={removeRuleIds:(yield chrome.declarativeNetRequest.getDynamicRules()).map((e=>e.id)),addRules:c};yield chrome.declarativeNetRequest.updateDynamicRules(n)})),c(void 0,void 0,void 0,(function*(){const e=document.getElementById("sites"),t=(yield chrome.storage.local.get("blockedUrls")).blockedUrls,c=(yield chrome.storage.local.get("unblockedUrls"),["||facebook.com"]);t.forEach((t=>{const n=document.createElement("div");n.className="urlContainer";const l=document.createElement("label");l.className="urlLabel",l.innerText=t;const i=`\n        <label class="switch">\n            <input class="selector" url="${t}" type="checkbox" ${-1!==c.indexOf(t)?"checked":""}>\n            <span class="slider"></span>\n        </label>`,a=document.createElement("div");a.addEventListener("click",o),a.className="switch",a.innerHTML=i,n.appendChild(l),n.appendChild(a),null==e||e.appendChild(n)}))}))}})[975](0,{})})();