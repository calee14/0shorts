(()=>{"use strict";({975:function(e,t){var o=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(c,r){function l(e){try{s(n.next(e))}catch(e){r(e)}}function i(e){try{s(n.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?c(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(l,i)}s((n=n.apply(e,t||[])).next())}))};function n(){return o(this,void 0,void 0,(function*(){const e=(yield chrome.storage.local.get("blockedUrls")).blockedUrls;console.log(e);const t=[];var o=0;Object.keys(e).forEach((n=>{if(!1===e[n])return;const c={id:100+o,priority:1,action:{type:"redirect",redirect:{url:"https://google.com"}},condition:{urlFilter:n,resourceTypes:["main_frame"]}};o+=1,t.push(c)}));const n={removeRuleIds:(yield chrome.declarativeNetRequest.getDynamicRules()).map((e=>e.id)),addRules:t};yield chrome.declarativeNetRequest.updateDynamicRules(n)}))}function c(e){var t;return o(this,void 0,void 0,(function*(){if(e.target instanceof HTMLInputElement)try{const o=e.target.checked,c=null!==(t=e.target.getAttribute("url"))&&void 0!==t?t:"",r=(yield chrome.storage.local.get("blockedUrls")).blockedUrls;r[c]=o,yield chrome.storage.local.set({blockedUrls:r}),yield n()}catch(e){console.error("An error occured. It is likely due to the input element not having the url attribute."),console.error("Here is the error:",e)}}))}Object.defineProperty(t,"__esModule",{value:!0}),console.log("popup.ts"),o(void 0,void 0,void 0,(function*(){yield n()})),o(void 0,void 0,void 0,(function*(){const e=document.getElementById("sites"),t=(yield chrome.storage.local.get("blockedUrls")).blockedUrls;Object.keys(t).forEach((o=>{const n=document.createElement("div");n.className="urlContainer";const r=document.createElement("label");r.className="urlLabel",r.innerText=o.substring(2);const l=`\n        <label class="switch">\n            <input class="selector" url="${o}" type="checkbox" ${!1!==t[o]?"checked":""}>\n            <span class="slider"></span>\n        </label>`,i=document.createElement("div");i.addEventListener("click",c),i.className="switch",i.innerHTML=l,n.appendChild(r),n.appendChild(i),null==e||e.appendChild(n)}))}))}})[975](0,{})})();