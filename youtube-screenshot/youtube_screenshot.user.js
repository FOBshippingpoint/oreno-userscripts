// ==UserScript==
// @name            YouTube Screenshot
// @author          FOBshippingpoint
// @namespace       https://github.com/FOBshippingpoint/oreno-userscripts
// @description     Take a screenshot of YouTube video.
// @license         MIT
// @version	        0.1
// @icon            https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/youtube-screenshot/icon.png
// @include         https://www.youtube.com/watch*
// @include         http://www.youtube.com/watch*
// @updateURL       https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/youtube-screenshot/youtube_screenshot.user.js
// @grant           GM.registerMenuCommand
// @grant           GM.notification
// ==/UserScript==

const isClipboardAvailable = window.hasOwnProperty('ClipboardItem');

/**
 * GM.notification wrapper.
 * @param {(object|string)} options
 */
function notification(options) {
  if (typeof options === 'string') {
    options = {
      text: options,
    };
  }
  GM.notification({
    image:
      'https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/youtube-screenshot/icon.png',
    title: 'YouTube Screenshot',
    ...options,
  });
}

/**
 * Take a screenshot of current video frame.
 * @param {('png'|'jpeg'|'gif')} fileType
 */
function screenshot(fileType = 'png') {
  const vid = document.querySelector('.video-stream');
  const canvas = document.createElement('canvas');
  document.querySelector('head').append(canvas);

  canvas.width = vid.videoWidth;
  canvas.height = vid.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(vid, 0, 0);

  if (isClipboardAvailable) {
    canvas.toBlob(writeClipImg, fileType);
  } else {
    openImgInNewTab(canvas, fileType);
  }
}

/**
 * Open image in new tab.
 * @param {HTMLCanvasElement} canvas
 * @param {('png'|'jpeg'|'gif')} fileType
 */
function openImgInNewTab(canvas, fileType) {
  const w = window.open('', '_blank');
  const dataURL = canvas.toDataURL('image/' + fileType);
  const title =
    canvas.width +
    'x' +
    canvas.height +
    '_' +
    document.title.replace(' - YouTube', '');
  w.document.write(
    '<html><head><title>' +
      title +
      '</title></head><body style="margin: 0;"><img src=' +
      dataURL +
      ' /></body></html>'
  );
  notification('Right click to save the screenshot.');
}

/**
 * Copy image blob to clipboard.
 * @param {Blob} blob
 */
async function writeClipImg(blob) {
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
    notification('The screenshot has been saved to the clipboard.');
  } catch (err) {
    notification(err.name + ': ' + err.message);
  }
}

/**
 * Add screenshot button to youtube player button list.
 */
function addScreenshotBtn() {
  /**
   * Create element from html string.
   * @param {string} htmlString
   * @return {Node}
   */
  function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }
  const screenshotBtn = createElementFromHTML(
    '<button class="ytp-screenshot-button ytp-button" id="ytp-screenshot-button" aria-label="Screenshot" title="Screenshot"><svg height="100%" version="1.1" viewBox="-3 -3 54 54" width="100%"><path id="path2" style="fill:#fff;fill-opacity:1;stroke-width:.696384" d="m 19.821699,11.465096 -2.542072,3.028997 H 12.16148 c -0.557106,0 -1.044304,0.215263 -1.462133,0.644699 -0.41783,0.429436 -0.627018,0.910558 -0.627018,1.444451 v 17.86251 c 0,0.557106 0.209188,1.044304 0.627018,1.462133 0.417829,0.41783 0.905027,0.627018 1.462133,0.627018 h 23.67704 c 0.533894,0 1.015016,-0.209188 1.444452,-0.627018 0.429436,-0.417829 0.644699,-0.905027 0.644699,-1.462133 v -17.86251 c 0,-0.533893 -0.215263,-1.015015 -0.644699,-1.444451 -0.429436,-0.429436 -0.910558,-0.644699 -1.444452,-0.644699 H 30.720373 L 28.178301,11.465096 Z M 24,19.61224 c 1.671319,0 3.076239,0.563455 4.213664,1.689274 1.137426,1.125819 1.705596,2.535454 1.705596,4.229986 0,1.671318 -0.56817,3.076239 -1.705596,4.213664 C 27.076239,30.88259 25.671319,31.45076 24,31.45076 c -1.694532,0 -3.104167,-0.56817 -4.229986,-1.705596 -1.125819,-1.137425 -1.689274,-2.542346 -1.689274,-4.213664 0,-1.694532 0.563455,-3.104167 1.689274,-4.229986 C 20.895833,20.175695 22.305468,19.61224 24,19.61224 Z"/></svg></button>'
  );
  document
    .querySelector('.ytp-subtitles-button.ytp-button')
    .before(screenshotBtn);
  screenshotBtn.addEventListener('click', screenshot);
  document.addEventListener('keyup', (e) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.key === 's') {
      screenshot();
    }
  });
}

GM.registerMenuCommand('Screenshot/png', () => screenshot('png'));
GM.registerMenuCommand('Screenshot/jpeg', () => screenshot('jpeg'));
GM.registerMenuCommand('Screenshot/gif', () => screenshot('gif'));
addScreenshotBtn();
