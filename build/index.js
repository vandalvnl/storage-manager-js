"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var isStr=function(e){return"string"==typeof e||e instanceof String},fnDate=function(e){var t=new Date,o=new Date(1*t+864e5*e);return parseInt(e,10)?o:e},mapper=function(e,t){try{Object.keys(e).forEach(function(e){return t(e)})}catch(e){window.console.log(e)}};exports.Storages={cookie:"cookie",localStorage:"localstorage",sessionStorage:"sessionstorage"};var setExpires=function(e){return e.replace(/^ +/,"").replace(/=.*/,"=;expires="+(new Date).toUTCString()+";path=/")},op={cookie:{clear:function(){document.cookie.split(";").forEach(function(e){document.cookie=setExpires(e)})},get:function(e){return op.cookie.parser()[e]},parser:function(){return""===document.cookie?{}:document.cookie.split("; ").map(function(e){return e.split("=")}).reduce(function(e,t){return e[decodeURIComponent(t[0].trim())]=decodeURIComponent(t[1].trim()),e},{})},set:function(e,t,o){void 0===o&&(o={expires:"1969-12-31T23:59:59.000Z",path:"/"}),document.cookie=encodeURIComponent(e)+"="+decodeURIComponent(t)+";path="+o.path+";expires="+fnDate(o.expires)},unset:function(e){document.cookie=encodeURIComponent(e)+"=;"+(new Date).toUTCString()}},localstorage:{clear:function(){mapper(window.localStorage,op.localstorage.unset)},get:function(e){return window.localStorage.getItem(e)},parser:function(){return window.localStorage},set:function(e,t){return window.localStorage.setItem(e,t)},unset:function(e){try{window.localStorage.removeItem(e)}catch(e){window.localStorage.removeItem("")}}},sessionstorage:{clear:function(){mapper(window.sessionStorage,op.sessionstorage.unset)},get:function(e){return window.sessionStorage.getItem(e)},parser:function(){return window.sessionStorage},set:function(e,t){return window.sessionStorage.setItem(e,t)},unset:function(e){try{window.sessionStorage.removeItem(e)}catch(e){window.sessionStorage.removeItem("")}}}},normalize=function(e){return e.toLowerCase().trim()},getManager=function(e){var t=normalize(e);return 0<=["cookie","localstorage","sessionstorage"].indexOf(t)?t:normalize(exports.Storages.cookie)};function StorageManagerJs(n){return void 0===n&&(n="cookie"),n=Storage?getManager(n):"cookie",Object.freeze({all:e,cat:t,change:function(e){void 0===e&&(e="cookie");return n=getManager(e),this},clear:function(){return op[n].clear(),this},clearAll:i,create:o,delete:r,get:t,getItem:t,item:t,json:e,purge:i,remove:r,rm:r,set:o,setItem:o,touch:o,unset:r});function e(){return op[n].parser()}function t(e,t){var o=op[n].get(e);try{return"raw"===t||"r"===t?o:"array"===t||"a"===t?o.split(","):JSON.parse(o)}catch(e){return o}}function o(e,t,o){return isStr(t)?op[n].set(e,t.trim(),o):op[n].set(e,JSON.stringify(t),o),this}function r(e){return op[n].unset(e),this}function i(){return["cookie","localstorage","sessionstorage"].forEach(function(e){return op[e].clear()}),this}}exports.default=StorageManagerJs;