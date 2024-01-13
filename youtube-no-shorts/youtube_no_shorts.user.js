// ==UserScript==
// @name                  YouTube No Shorts
// @name:zh-TW            我不要YouTube Shorts
// @author                FOBshippingpoint
// @namespace             https://github.com/FOBshippingpoint/oreno-userscripts
// @description           Redirects to the original UI of the YouTube video. (Shorts is bad, you can't even change progress!)
// @description:zh-TW     重新導向至YouTube經典影片播放界面（而不是連調整進度都做不到的Shorts界面）
// @license               MIT
// @version               0.1.1
// @icon                  https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/youtube-no-shorts/icon.png
// @include               https://www.youtube.com/shorts/*
// @include               http://www.youtube.com/shorts/*
// @updateURL             https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/youtube-no-shorts/youtube_no_shorts.user.js
// @supportURL            https://github.com/FOBshippingpoint/oreno-userscripts/issues
// @homepageURL           https://github.com/FOBshippingpoint/oreno-userscripts#readme
// ==/UserScript==

window.location = document.URL.replace("shorts/", "watch?v=");
