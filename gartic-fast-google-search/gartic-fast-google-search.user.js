// ==UserScript==
// @name                  Gartic.io Press F4 Search in Google Image & F7 to Screenshot
// @author                FOBshippingpoint
// @match                 https://gartic.io/*
// @namespace             https://github.com/FOBshippingpoint/oreno-userscripts
// @grant                 GM_addStyle
// @license               MIT
// @version               2.0
// @icon                  https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/gartic-fast-google-search/icon.png
// @updateURL             https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/gartic-fast-google-search/gartic-fast-google-search.user.js
// @supportURL            https://github.com/FOBshippingpoint/oreno-userscripts/issues
// @homepageURL           https://github.com/FOBshippingpoint/oreno-userscripts#readme
// ==/UserScript==

// Create notification container
const notification = document.createElement("div");
notification.className = "copy-notification";
notification.innerHTML = `
    <img class="copy-preview" alt="Copied frame">
    <p class="copy-notification-text">已複製</p>
`;
document.body.appendChild(notification);

function showNotification(imageDataUrl) {
  const preview = notification.querySelector(".copy-preview");
  preview.src = imageDataUrl;
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

GM_addStyle(`

.copy-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    transform: translateY(150%);
    transition: transform 0.1s ease-out;
    z-index: 1000;
}

.copy-notification.show {
    transform: translateY(0);
}

.copy-notification-text {
    color: white;
    font-size: 14px;
    margin: 0;
}

.copy-preview {
    width: 100px;
    height: 56.25px; /* 16:9 aspect ratio */
    object-fit: cover;
    border-radius: 4px;
}

`);

// Press F4 to open keyword in google image search.
document.addEventListener("keydown", (e) => {
  const word = document.querySelector(".word");
  if (word && e.key === "F4") {
    window.open(
      "https://www.google.com/search?q=" +
        encodeURIComponent(word.textContent) +
        "&sclient=img&udm=2",
    );
  } else if (e.key === "F7") {
    copyCanvasToClipboard(document.querySelector("canvas"));
  }
});

async function copyCanvasToClipboard(canvas, backgroundColor = "white") {
  try {
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
    const ctx = offscreenCanvas.getContext("2d");

    // Fill background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
    ctx.drawImage(canvas, 0, 0);
    const blob = await new Promise((resolve) =>
      offscreenCanvas.toBlob(resolve),
    );
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
    showNotification(offscreenCanvas.toDataURL("image/png"));
  } catch (err) {
    console.error("Failed to copy canvas image:", err);
  }
}

function observe(node, callback, options) {
	const observer = new MutationObserver((mutations, ob) => {
		const result = callback(mutations, ob);
		if (result) disconnect();
	});
	observer.observe(node, {
		childList: true,
		subtree: true,
		...options,
	});
	const disconnect = () => observer.disconnect();
	return disconnect;
};

// Keep active so gartic won't kick you out
observe(document, () => document.querySelector(".ic-yes")?.click());
