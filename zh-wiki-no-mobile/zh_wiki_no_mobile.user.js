// ==UserScript==
// @name                  zh Wiki No Mobile View
// @author                FOBshippingpoint
// @namespace             https://github.com/FOBshippingpoint/oreno-userscripts
// @description           Solve the recent problem that the Chinese Wikipedia page is displayed as mobile version.
// @description:zh-TW     解決維基百科最近中文網頁顯示為手機版的問題。
// @license               MIT
// @version               1.0
// @icon                  https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/zh-wiki-no-mobile/icon.png
// @include               https://zh.m.wikipedia.org/*
// @include               http://zh.m.wikipedia.org/*
// @updateURL             https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/zh-wiki-no-mobile/zh_wiki_no_mobile.user.js
// @supportURL            https://github.com/FOBshippingpoint/oreno-userscripts/issues
// @homepageURL           https://github.com/FOBshippingpoint/oreno-userscripts#readme
// @run-at                document-start
// ==/UserScript==

window.location = document.URL.replace('.m', '');
