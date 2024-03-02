// ==UserScript==
// @name                  Bookwalker TW Auto Login
// @author                FOBshippingpoint
// @namespace             https://github.com/FOBshippingpoint/oreno-userscripts
// @description           Auto login to your bookwalker account.
// @license               MIT
// @version               1.0
// @icon                  https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/bookwalker-tw-auto-login/icon.svg
// @include               https://github.com
// @updateURL             https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/bookwalker-tw-auto-login/bookwalker_tw_auto_login.user.js
// @supportURL            https://github.com/FOBshippingpoint/oreno-userscripts/issues
// @homepageURL           https://github.com/FOBshippingpoint/oreno-userscripts#readme
// @match                 https://member.bookwalker.com.tw/login
// @match                 https://www.bookwalker.com.tw/*
// @grant                 GM_info
// ==/UserScript==

// very simple jQuery
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

// 👇👇👇 Please fill in your own account infomation.
const ACCOUNT = {
  email: "Not set", // change "Not set" to your email, remember to keep the quotes
  password: "Not set", // change "Not set" to your password, remember to keep the quote
};

// Check if the user really set their own account infomation
if (ACCOUNT.email == "Not set" || ACCOUNT.password == "Not set") {
  alert(
    "Please set your own email and password in `Bookwalker TW Auto Login` userscript",
  );
} else {
  // If the login button is not exist, redirect uesr to the login page
  const loginBtnExist = $(".topLoginStyle") != null;
  if (loginBtnExist) {
    window.location = "https://member.bookwalker.com.tw/login";
  }

  $("#email").value = ACCOUNT.email;
  $("#password").value = ACCOUNT.password;
  $("#login").click();
}
