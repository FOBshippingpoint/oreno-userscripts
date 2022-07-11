// ==UserScript==
// @name            YouTube No Shorts
// @author          FOBshippingpoint
// @namespace       http://www.example.url/to/your-web-site/
// @description     Redirects to the original UI of the YouTube video. (Shorts is bad, you can't even pause the video!)
// @license         MIT
// @version	        0.1
// @icon            https://i.imgur.com/Td5OXvR.png
// @include         https://www.youtube.com/shorts/*
// @include         http://www.youtube.com/shorts/*
// ==/UserScript==

window.location = document.URL.replace("shorts/", "watch?v=");
