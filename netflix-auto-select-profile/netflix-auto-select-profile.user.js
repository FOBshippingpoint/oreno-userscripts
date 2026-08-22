// ==UserScript==
// @name                  Auto Select Profile on Netflix
// @author                FOBshippingpoint
// @namespace             https://github.com/FOBshippingpoint/oreno-userscripts
// @description           To select first profile on the page.
// @license               MIT
// @version               1.0
// @match                 https://www.netflix.com/browse*
// @icon                  https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/auto-select-profile/icon.png
// @include               https://github.com
// @updateURL             https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/auto-select-profile/auto-select-profile.user.js
// @supportURL            https://github.com/FOBshippingpoint/oreno-userscripts/issues
// @homepageURL           https://github.com/FOBshippingpoint/oreno-userscripts#readme
// ==/UserScript==

if (document.querySelector(".profile-gate-label")) {
  document.querySelector(".profile-name").click();
}
