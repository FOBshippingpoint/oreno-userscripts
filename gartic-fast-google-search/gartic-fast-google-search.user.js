// ==UserScript==
// @name                  Gartic.io Press F4 Search in Google Image
// @author                FOBshippingpoint
// @match                 https://gartic.io/*
// @namespace             https://github.com/FOBshippingpoint/oreno-userscripts
// @license               MIT
// @version               1.0
// @icon                  https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/gartic-fast-google-search/icon.png
// @updateURL             https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/gartic-fast-google-search/gartic-fast-google-search.user.js
// @supportURL            https://github.com/FOBshippingpoint/oreno-userscripts/issues
// @homepageURL           https://github.com/FOBshippingpoint/oreno-userscripts#readme
// ==/UserScript==

// Press F4 to open keyword in google image search.
document.addEventListener("keydown", (e) => {
  const word = document.querySelector(".word");
  if (!word || e.key !== "F4") return;
  window.open(
    "https://www.google.com/search?q=" +
      encodeURIComponent(word.textContent) +
      "&sclient=img&udm=2",
  );
});
