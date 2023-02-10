// ==UserScript==
// @name                  TypeRacer Roboto Font
// @name:zh-TW            TypeRacer Roboto 字體
// @author                FOBshippingpoint
// @namespace             https://github.com/FOBshippingpoint/oreno-userscripts
// @description           Change default font to Roboto Mono on typeracer.com
// @description:zh-TW     將TypeRacer的輸入框字體換為Roboto Mono
// @license               MIT
// @version               1.0
// @match                 https://play.typeracer.com/
// @updateURL             https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/typeracer-roboto-font/typeracer_roboto_font.user.js
// @supportURL            https://github.com/FOBshippingpoint/oreno-userscripts/issues
// @homepageURL           https://github.com/FOBshippingpoint/oreno-userscripts#readme
// ==/UserScript==

// https://stackoverflow.com/questions/15505225/inject-css-stylesheet-as-string-using-javascript
/**
 * Utility function to add CSS in multiple passes.
 * @param {string} styleString
 */
function addStyle(styleString) {
  const style = document.createElement('style');
  style.textContent = styleString;
  document.head.append(style);
}

addStyle(`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

  .mainViewport table.inputPanel table div span {
    font-family: 'Roboto Mono', monospace;
  }
`);
