// ==UserScript==
// @name                  dollars
// @author                FOBshippingpoint
// @namespace             https://github.com/FOBshippingpoint/oreno-userscripts
// @description           A set of DOM API shorthand
// @license               MIT
// @version               1.0
// @icon                  https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/dollars/icon.png
// @include               https://github.com
// @updateURL             https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/dollars/dollars.user.js
// @supportURL            https://github.com/FOBshippingpoint/oreno-userscripts/issues
// @homepageURL           https://github.com/FOBshippingpoint/oreno-userscripts#readme
// ==/UserScript==

/**
 * Usage example:
 * # querySelector alias
 * $(".btn") # select one element that match class `btn`.
 * element.$(".btn") # select one element that match class `btn` under `element` subtree.
 *
 * # querySelectorAll alias
 * $$(".btn") # select all elements that match class `btn`, the type of "array" instead of "NodeList"
 * element.$$(".btn") # select all elements that match class `btn` under `element` subtree.
 *
 * # addEventListener alias
 * btn.on("click", (e) => { console.log("You click", e) })
 *
 * # removeEventListener alias
 * btn.off(onClick)
 */

Element.prototype.$ = Element.prototype.querySelector;
Element.prototype.$$ = function (...args) {
  return [...Element.prototype.querySelectorAll.apply(this, args)];
};

EventTarget.prototype.on = EventTarget.prototype.addEventListener;
EventTarget.prototype.off = EventTarget.prototype.removeEventListener;

if (typeof window.$ === "undefined") {
  window.$ = document.$;
}

if (typeof window.$$ === "undefined") {
  window.$$ = document.$$;
}
