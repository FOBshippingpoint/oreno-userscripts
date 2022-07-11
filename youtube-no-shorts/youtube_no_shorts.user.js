// ==UserScript==
// @name            YouTube No Shorts
// @author          FOBshippingpoint
// @namespace       https://github.com/FOBshippingpoint/oreno-userscripts
// @description     Redirects to the original UI of the YouTube video. (Shorts is bad, you can't even pause the video!)
// @license         MIT
// @version	        0.1
// @icon            https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/youtube-no-shorts/icon.png
// @include         https://www.youtube.com/shorts/*
// @include         http://www.youtube.com/shorts/*
// ==/UserScript==

window.location = document.URL.replace("shorts/", "watch?v=");
