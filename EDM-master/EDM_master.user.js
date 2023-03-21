// ==UserScript==
// @name        EDM Master
// @namespace   Violentmonkey Scripts
// @match       *://*.edu.tw/*
// @include     https://linker.tw/y_ba/*
// @exclude     https://lib.ncu.edu.tw/*
// @exclude     https://ncueeclass.ncu.edu.tw/*
// @exclude     https://portal.ncu.edu.tw/*
// @exclude     https://ba.yuntech.edu.tw/*
// @grant       none
// @version     3.0
// @author      -
// @description 2023/3/13 上午9:54:32
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @run-at      document-idle
// @grant       GM_addStyle
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_setClipboard
// @updateURL   https://github.com/FOBshippingpoint/oreno-userscripts/raw/main/EDM-master/EDM_master.user.js
// ==/UserScript==

GM_addStyle(`
@keyframes cycle {
  0% { background-color: red; }
  25% { background-color: green; }
  50% { background-color: blue; }
  75% { background-color: yellow; }
  100% { background-color: red; }
}

.teacher-link-pointerd {
  animation-name: cycle !important;
  animation-duration: 4s !important;
  animation-iteration-count: infinite !important;
  color: #000 !important;
  text-shadow: 1px 1px 2px #fff !important;
}

.teacher-link-pointer {
  position: relative !important; /* Make the target element a positioning context */
  display: inline-block !important; /* Ensure the target element is only as wide as its content */
  z-index: 999 !important;
}

.teacher-link-pointer::before {
  content: "" !important; /* Add empty content to the pseudo-element */
  z-index: 9999 !important;
  display: block !important; /* Make the pseudo-element a block-level element */
  position: absolute !important; /* Position the pseudo-element relative to the target element */
  top: 50% !important; /* Vertically center the pseudo-element */
  left: -30px !important; /* Position the pseudo-element 20 pixels to the left of the target element */
  width: 32px !important; /* Set the width of the pseudo-element */
  height: 12px !important; /* Set the height of the pseudo-element */
  background-image: url("https://web.archive.org/web/20090829140816if_/http://geocities.com/chrisc512/files/point_right.gif") !important; /* Set the GIF as the background of the pseudo-element */
  background-size: cover !important; /* Ensure the GIF fills the entire pseudo-element */
  transform: translateY(-50%) !important; /* Vertically center the pseudo-element */
}

.my-copy-btn {
  all: revert !important;
}

.teacher-search {
  position: fixed;
  bottom: 0px;
  right: 5px;
  z-index: 999999; /* ensure search container appears in front of other elements */
  display: flex;
  flex-direction: column;
  width: 600px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  padding: 10px;
  gap: 10px;
}

.teacher-search .my-hidable {
  max-height: 300px;
  overflow: scroll;
}

.teacher-search input[type="text"] {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  width: unset;
}

.teacher-search button {
  width: 100% !important;
  all: revert !important;
}


.teacher-search .my-table-container {
  all: revert;
  overflow: scroll;
  height: auto;
  min-height: 150px;
  position: relative;
}

.my-table-container table {
  width: 100%;
  border-spacing: 5px;
  position: relative;
}

.my-table-container th {
  background-color: white;
  border-bottom: 2px solid black;
  position: sticky;
  top: 0;
}

.my-table-container input {
  width: 100%;
}

.my-teacher {
  color: black !important;
  background-color: #FFFF00 !important;
  font-weight: bold;
}

.my-new-teacher {
  position: relative; /* Make the target element a positioning context */
  display: inline-block; /* Ensure the target element is only as wide as its content */
}

.my-new-teacher::before {
  content: ""; /* Add empty content to the pseudo-element */
  z-index: 9999;
  display: block; /* Make the pseudo-element a block-level element */
  position: absolute; /* Position the pseudo-element relative to the target element */
  top: 50%; /* Vertically center the pseudo-element */
  left: -37px; /* Position the pseudo-element 20 pixels to the left of the target element */
  width: 32px; /* Set the width of the pseudo-element */
  height: 21px; /* Set the height of the pseudo-element */
  background-image: url("https://web.archive.org/web/20091027065255im_/http://hk.geocities.com/man_minghk/image/new.gif"); /* Set the GIF as the background of the pseudo-element */
  background-size: cover; /* Ensure the GIF fills the entire pseudo-element */
  transform: translateY(-50%); /* Vertically center the pseudo-element */
}

@keyframes dash {
    to {
        background-position: 100% 0%, 0% 100%, 0% 0%, 100% 100%;
    }
}

.not-found {
  text-decoration: line-through;
}

.now-focus {
  --borderWidth: 3px;
  position: relative;
  border-radius: var(--borderWidth);
  justify-content: center;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1;
}
.now-focus::after {
  content: "";
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-1 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(100% + var(--borderWidth) * 2);
  background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
  border-radius: calc(2 * var(--borderWidth));
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
  z-index: -1;
}

@keyframes animatedgradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

.my-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 9999999;
  min-width: 400px;
}

.my-dialog label {
  display: block;
  margin-bottom: 5px;
}

.my-dialog input {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 15px;
}

.my-dialog button {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.my-dialog button:hover {
  background-color: #3e8e41;
}

.my-dialog button.cancel {
  background-color: #f44336;
}

.my-dialog button.cancel:hover {
  background-color: #da190b;
}
`);

let surnames = [];
let excludedSurnames = [];
let namePrefix = "";
let nameLen = 0;
let titleSliceLen = 0;
let delayLoadSec = 0;

// create the search input and results list
const searchInput = $("<input>", {
  type: "text",
  placeholder: "搜尋老師（空格分隔）",
  onfocus: "this.select()",
});

// create the search container element and append the input and results list
const searchContainer = $("<div>", { class: "teacher-search" });
const hideSearchBtn = $("<button>", {
  text: "顯示/隱藏表格",
  click: function () {
    $(".my-hidable").toggle("fast");
  },
});
const openSettingsBtn = $("<button>", {
  text: "開啟設定對話框",
  click: async function () {
    const alreadyOpened = $(".my-dialog").length !== 0;
    if (alreadyOpened) {
      return;
    }

    const surnamesVal = surnames.join(",");
    const excludedSurnamesVal = excludedSurnames.join(",");

    const content = $('<label name="surnames">姓氏列表</label>')
      .append(
        `<input id="surnames" value="${surnamesVal}" type="text" >`,
      )
      .append('<label name="excludedSurnames">姓氏排除列表</label>')
      .append(
        `<input id="excludedSurnames" value="${excludedSurnamesVal}" type="text" >`,
      )
      .append('<label name="namePrefix">教授姓名前綴（例如："姓名："）</label>')
      .append(`<input id="namePrefix" value="${namePrefix}" type="text" >`)
      .append('<label name="nameLen">姓名長度</label>')
      .append(
        `<input id="nameLen" value="${nameLen}" type="number" min="0" >`,
      )
      .append('<label name="titleSliceLen">職等起始位置</label>')
      .append(
        `<input id="titleSliceLen" value="${titleSliceLen}" type="number" min="0" >`,
      )
      .append('<label name="delayLoadSec">延遲標記秒數</label>')
      .append(
        `<input id="delayLoadSec" value="${delayLoadSec}" type="number" min="0" >`,
      )
      .append($("<button>", {
        id: "my-save-btn",
        text: "儲存",
        click: async function () {
          $("#my-save-btn").text("...");
          surnames = $("#surnames").val().split(",");
          excludedSurnames = $("#excludedSurnames").val().split(",");
          namePrefix = $("#namePrefix").val();
          nameLen = parseInt($("#nameLen").val());
          titleSliceLen = parseInt($("#titleSliceLen").val());
          delayLoadSec = parseInt($("#delayLoadSec").val());

          try {
            await GM_setValue("surnames", surnames);
            await GM_setValue("excludedSurnames", excludedSurnames);
            await GM_setValue("namePrefix", namePrefix);
            await GM_setValue("nameLen", nameLen);
            await GM_setValue("titleSliceLen", titleSliceLen);
            await GM_setValue("delayLoadSec", delayLoadSec);
          } catch (err) {
            console.error(err);
          }

          $(".my-dialog").remove();

          clearAllMark();
          // remark all info because settings changed
          setTimeout(() => {
            markAllInfo();
            const query = $(searchInput).val();
            if (query.length !== 0) {
              search(query);
            }
          }, delayLoadSec * 1000);
        },
      }))
      .append($("<button>", {
        class: "cancel",
        text: "取消",
        click: function () {
          $(".my-dialog").remove();
        },
      }));

    $("body").append(
      $("<div class='my-dialog'>").append(content),
    );
  },
}).prop("disabled", true);

const copyTableButton = $("<button>", {
  text: "複製已有教師",
  click: function () {
    let text = "";
    $("#search-results tr").each(function () {
      const isHeader = $(this).find("th").length !== 0;
      if (isHeader) return;

      const title = $(this).children().eq(1).find("input").val();
      const name = $(this).children().eq(2).text();
      const mail = $(this).children().eq(3).find("input").val();
      text += [title, name, mail].join("\t");
      text += "\n";
    });
    text = text.slice(0, text.length - 1);
    GM_setClipboard(text);
  },
});
const copyNewTableButton = $("<button>", {
  text: "複製新進教師",
  click: function () {
    let text = "";
    $("#search-results-new tr").each(function () {
      const isHeader = $(this).find("th").length !== 0;
      if (isHeader) return;

      const title = $(this).children().eq(1).find("input").val();
      const name = $(this).children().eq(2).text();
      const mail = $(this).children().eq(3).find("input").val();
      text += [title, name, mail].join("\t");
      text += "\n";
    });
    text = text.slice(0, text.length - 1);
    GM_setClipboard(text);
  },
});
searchContainer.append(searchInput, openSettingsBtn, hideSearchBtn).append(
  $("<div class='my-hidable'>")
    .append(copyTableButton)
    .append(
      "<div class='my-table-container'><table><tbody id='search-results'></tbody></table></div>",
    )
    .append(copyNewTableButton)
    .append(
      "<div class='my-table-container'><table><tbody id='search-results-new'></tbody></table></div>",
    ).hide(),
);

// listen for the input event on the search input
searchInput.on("input", function () {
  const query = $(this).val();
  search(query);
});

function search(query) {
  $("#search-results").empty();
  $("#search-results-new").empty();

  let teachers = parseTeachers(query);
  let newTeachers = [];
  $(".my-hidable").toggle(true);

  $(".my-name").each(function () {
    const nameEl = $(this);
    const mailEl = nameEl.parents().has(".my-mail").first().find(
      ".my-mail",
    )
      .first();
    const titleEl = nameEl.parents().has(".my-title").first().find(
      ".my-title",
    )
      .first();

    const name = $(nameEl).data("name");
    $(nameEl).addClass(`my-classified ${name}-teacher`);
    $(mailEl).addClass(`my-classified ${name}-teacher`);
    $(titleEl).addClass(`my-classified ${name}-teacher`);

    const t = teachers.find((t) => t.name === name);
    if (t) {
      // found teacher
      t.isFound = true;
      t.mail = $(mailEl).data("mail");
      t.title = $(titleEl).data("title");
    } else {
      // new teacher
      $(nameEl).addClass("my-new-teacher");
      const newT = {
        name: $(nameEl).data("name"),
        title: $(titleEl).data("title"),
        mail: $(mailEl).data("mail"),
        isFound: false,
        newTitle: false,
        isNew: true,
      };
      newTeachers.push(newT);
    }
  });

  $("#search-results").append(
    "<tr><th>已確認</th><th>職等</th><th>姓名</th><th>信箱</th></tr>",
  );
  $("#search-results-new").append(
    "<tr><th>已確認</th><th>職等</th><th>姓名</th><th>信箱</th></tr>",
  );

  teachers.forEach((t) => {
    let newRow;
    // 職等(#t-name-title)       新職等(#t-name-title) 姓名(#t-name-name)       信箱(#t-name-mail)
    newRow = $("<tr>").append(
      $("<td>").append("<input type='checkbox'>"),
      $("<td>").append(`<input type='text' value=${t.title}>`),
      $("<td>").append($("<a>").attr("href", `#_${t.name}`).text(t.name)),
      $("<td>").append(`<input type='text' value=${t.mail ?? ""}>`),
    );
    if (!t.isFound) {
      newRow.addClass("not-found");
    }
    $("#search-results").append(newRow);
  });

  newTeachers.forEach((t) => {
    let newRow;
    // 職等(#t-name-title)       新職等(#t-name-title) 姓名(#t-name-name)       信箱(#t-name-mail)
    newRow = $("<tr>").append(
      $("<td>").append("<input type='checkbox'>"),
      $("<td>").append(`<input type='text' value=${t.title ? t.title : ""}>`),
      $("<td>").append(
        $("<a>").attr("href", `#_${t.name}`).text(t.name),
      ),
      $("<td>").append(`<input type='text' value=${t.mail ?? ""}>`),
    );
    $("#search-results-new").append(newRow);
  });

  $(".my-table-container a").click(function () {
    $(".my-teacher").removeClass("now-focus");
    const targetTeacherFakeId = $(this).attr("href");
    const targetTName = targetTeacherFakeId.replace("#_", "");
    $("html,body").animate({
      scrollTop: $("#" + targetTName + "-teacher").offset().top -
        $(window).height() / 5,
    }, 100);
    $("." + targetTName + "-teacher").addClass("now-focus");
  });
}

function getText(el) {
  return $(el)
    .clone()
    .children()
    .remove()
    .end()
    .text()
    .trim()
    .replace(/(\r\n|\n|\r)/gm, "");
}

function parseTeachers(str) {
  const teachers = [];
  const names = str.split(/\s/);
  names.forEach((name) => {
    const teacher = {
      title: "",
      name,
      newTitle: false,
      isFound: false,
      isNew: false,
    };
    teachers.push(teacher);
  });

  return teachers;
}

function getFirstMatchFromRegex(text, regex) {
  const matches = text.match(regex);
  if (matches === null) {
    return "";
  } else {
    return matches[0];
  }
}

function clearAllMark() {
  $(".my-teacher, .my-mail, .my-name, .my-title, .now-focus, .my-new-teacher")
    .removeClass("my-teacher my-mail my-name my-title now-focus my-new-teacher")
    .removeData("name title mail"); // remove jquery cache
  $(".my-copy-btn").remove();
}

function markAllInfo() {
  $("div, a, span, p, td, li, h2, h3, h4, h5, h6").find(":not(.footer *)").find(
    ":not(footer *)",
  ).each(
    function () {
      const text = getText(this);
      // expertise
      // 專長，至少兩個頓號或逗號或冒號 whatever
      const expertise = getFirstMatchFromRegex(text, /.*[、,，](?:.*[、,，])+.*/);
      if (expertise) {
        const expertiseEl = this;
        $(expertiseEl).after(createCopyBtn("專長", expertise));
      }

      // mail
      const mail = getFirstMatchFromRegex(
        text,
        /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/i,
      );
      if (mail) {
        const mailEl = this;
        $(mailEl)
          .data("mail", mail)
          .addClass("my-teacher my-mail")
          .after(createCopyBtn("信箱", mail));
      }

      // title
      let title = getFirstMatchFromRegex(
        text,
        /^.*(?:(?<!指導)教授|副教授|講師|助理教授|系主任|校長|院長).*$/,
      );
      if (title) {
        title = title.slice(titleSliceLen);

        const titleEl = this;
        $(titleEl)
          .data("title", title)
          .addClass("my-teacher my-title")
          .after(createCopyBtn("職等", title));
      }

      // name
      for (let i = 0; i < surnames.length; i++) {
        const surname = surnames[i];

        const regex = new RegExp(`^${namePrefix}${surname}\\S+`);
        let name = getFirstMatchFromRegex(text, regex);
        name = name.trim();
        name = name.slice(namePrefix.length, nameLen);
        name = name.trim();

        const isValidName = name !== "" && excludedSurnames.every((s) => {
          return !name.includes(s);
        });
        if (!isValidName) {
          continue;
        }

        const nameEl = this;
        $(nameEl)
          .data("name", name)
          .addClass("my-teacher my-name")
          .attr("id", `${name}-teacher`)
          .after(createCopyBtn("姓名", name));
      }
    },
  );
}

function createCopyBtn(description, textToCopy) {
  const btn = $("<button class='my-copy-btn'>複製" + description + "</button>")
    .data("copy", textToCopy)
    .click(function (event) {
      const text = $(this).data("copy");
      GM_setClipboard(text);
      event.stopPropagation();
    });
  return btn;
}

function highlightTeacherLink() {
  $("a, button, span, li, div").each(function () {
    const text = getText(this);
    const link = getFirstMatchFromRegex(
      text,
      /.*(師資|系所成員|(?<!技術)人員|(?<!(複製已有|複製新進|授課))教師(?!網頁|教學|研究)|兼任教師).*/,
    );
    if (link !== "") {
      const linkEl = this;
      $(linkEl).addClass("teacher-link-pointer");
    }
  });
}

(async () => {
  // append the search container to the body
  $("body").append(searchContainer);

  surnames = await GM_getValue("surnames", null);
  excludedSurnames = await GM_getValue("excludedSurnames", null);
  namePrefix = await GM_getValue("namePrefix", "");
  nameLen = await GM_getValue("nameLen", 3);
  titleSliceLen = await GM_getValue("titleSliceLen", 0);
  delayLoadSec = await GM_getValue("delayLoadSec", 0);

  // get default list from github
  if (surnames === null) {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/EDM-master/surnames.txt",
      );
      const text = await res.text();
      surnames = text.split(",");
      GM_setValue("surnames", surnames);
    } catch (err) {
      console.error(err);
    }
  }

  // get default list from github
  if (excludedSurnames === null) {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/EDM-master/excludedSurnames.txt",
      );
      const text = await res.text();
      excludedSurnames = text.split(",");
      GM_setValue("excludedSurnames", excludedSurnames);
    } catch (err) {
      console.error(err);
    }
  }

  $(openSettingsBtn).prop("disabled", false);

  setTimeout(async () => {
    markAllInfo();
    highlightTeacherLink();
  }, delayLoadSec * 1000);
})();
