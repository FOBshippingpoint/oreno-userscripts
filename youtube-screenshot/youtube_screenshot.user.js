// ==UserScript==
// @name                  YouTube Screenshot
// @author                FOBshippingpoint
// @namespace             https://github.com/FOBshippingpoint/oreno-userscripts
// @description           Take a screenshot of YouTube video.
// @description:zh-TW     YouTube影片畫面截圖。
// @license               MIT
// @version               1.0.1
// @icon                  https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/youtube-screenshot/icon.png
// @include               https://www.youtube.com/watch*
// @include               http://www.youtube.com/watch*
// @updateURL             https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/youtube-screenshot/youtube_screenshot.user.js
// @supportURL            https://github.com/FOBshippingpoint/oreno-userscripts/issues
// @homepageURL           https://github.com/FOBshippingpoint/oreno-userscripts#readme
// @grant                 GM.registerMenuCommand
// @grant                 GM.notification
// ==/UserScript==

/**
 * A number, or a string containing a number.
 * @typedef {('png'|'jpeg'|'gif')} FileType - MIME image file types.
 */

const isClipboardAvailable = window.hasOwnProperty('ClipboardItem');

/**
 * GM.notification wrapper.
 * @param {(Object|string)} options - Notification text or GM_notification options
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
 * @param {FileType} [fileType='jpeg']
 * @param {('copy'|'download')} [action='copy'] - How to save screenshot.
 */
function screenshot(fileType = 'jpeg', action = 'copy') {
  const vid = document.querySelector('.video-stream');
  const canvas = document.createElement('canvas');

  canvas.width = vid.videoWidth;
  canvas.height = vid.videoHeight;
  canvas.getContext('2d').drawImage(vid, 0, 0);

  if (action === 'copy') {
    if (isClipboardAvailable) {
      canvas.toBlob(writeClipImg, fileType);
    } else {
      openImgInNewTab(canvas, fileType);
    }
  } else if (action === 'download') {
    downloadImg(canvas, fileType);
  }
}

/**
 * Create filename from image size.
 * @param {number} width - Image width.
 * @param {number} height - Image height.
 * @param {FileType} fileType
 * @return {string} The image filename.
 */
function createFilename(width, height, fileType) {
  const videoTitle = document.title.replace(' - YouTube', '');
  let filename = width + 'x' + height + '_';
  filename += videoTitle.replace(/[\\\/:"*?<>|]+/g, '_') + '.' + fileType;
  return filename;
}

/**
 * Open image in new tab.
 * @param {HTMLCanvasElement} canvas
 * @param {FileType} fileType
 */
function openImgInNewTab(canvas, fileType) {
  const w = window.open('', '_blank');
  const dataURL = canvas.toDataURL('image/' + fileType);
  const title = createFilename(canvas.width, canvas.height, fileType);
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
 * Download image.
 * @param {HTMLCanvasElement} canvas
 * @param {FileType} fileType
 */
function downloadImg(canvas, fileType) {
  filename = createFilename(canvas.width, canvas.height, fileType);
  const anchor = document.createElement('a');
  anchor.href = canvas.toDataURL('image/' + fileType);
  anchor.download = filename;
  anchor.click();
  notification('File "' + filename + '" saved.');
}

/**
 * Check if the user is focusing on input-like elements.
 * @return {boolean} Is the user about to type
 */
function isAboutToType() {
  // #contenteditable-root is comment input, input.ytd-searchbox is the search bar on the top of the page.
  const inputEls = ['#contenteditable-root', 'input.ytd-searchbox'].reduce(
    (prev, queryString) => [...prev, ...document.querySelectorAll(queryString)],
    []
  );
  const isActive = (el) => el === document.activeElement;
  return inputEls.some(isActive);
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
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (isAboutToType()) return;
    switch (e.key) {
      case 's':
        screenshot('jpeg', 'copy');
        break;
      case 'd':
        screenshot('jpeg', 'download');
        break;
    }
  });
}

/**
 * Capitalize a word.
 * @param {string} text
 * @return {string} A capitalized string.
 */
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const fileTypes = ['png', 'jpeg', 'gif'];
const actions = ['copy', 'download'];
actions.forEach((actions) => {
  fileTypes.forEach((fileType) => {
    GM.registerMenuCommand(
      capitalize(actions) + ' screenshot/' + fileType,
      () => screenshot(fileType, actions)
    );
  });
});

addScreenshotBtn();
