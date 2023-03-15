// ==UserScript==
// @name        EDM Master
// @namespace   Violentmonkey Scripts
// @match       https://*.edu.tw/*
// @include     https://linker.tw/y_ba/*
// @exclude     https://lib.ncu.edu.tw/*
// @exclude     https://ncueeclass.ncu.edu.tw/*
// @exclude     https://portal.ncu.edu.tw/*
// @grant       none
// @version     1.0
// @author      -
// @description 2023/3/13 上午9:54:32
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @run-at      document-idle
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle(`
@keyframes cycle {
  0% { background-color: red; }
  25% { background-color: green; }
  50% { background-color: blue; }
  75% { background-color: yellow; }
  100% { background-color: red; }
}

.my-highlightedd {
  animation-name: cycle !important;
  animation-duration: 4s !important;
  animation-iteration-count: infinite !important;
  color: #000 !important;
  text-shadow: 1px 1px 2px #fff !important;
}

.my-highlighted {
  position: relative !important; /* Make the target element a positioning context */
  display: inline-block !important; /* Ensure the target element is only as wide as its content */
  z-index: 999 !important;
}

.my-highlighted::before {
  content: "" !important; /* Add empty content to the pseudo-element */
  z-index: 9999 !important;
  display: block !important; /* Make the pseudo-element a block-level element */
  position: absolute !important; /* Position the pseudo-element relative to the target element */
  top: 50% !important; /* Vertically center the pseudo-element */
  left: -60px !important; /* Position the pseudo-element 20 pixels to the left of the target element */
  width: 64px !important; /* Set the width of the pseudo-element */
  height: 24px !important; /* Set the height of the pseudo-element */
  background-image: url("https://web.archive.org/web/20090829140816if_/http://geocities.com/chrisc512/files/point_right.gif") !important; /* Set the GIF as the background of the pseudo-element */
  background-size: cover !important; /* Ensure the GIF fills the entire pseudo-element */
  transform: translateY(-50%) !important; /* Vertically center the pseudo-element */
}

.teacher-search {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 9999; /* ensure search container appears in front of other elements */
  display: flex;
  flex-direction: column;
  width: 600px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  padding: 10px;
  max-height: 500px;
}

.teacher-search input[type="text"] {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
}

.teacher-search .my-table-container {
  overflow: scroll;
  height: auto;
  min-height: 150px;
  position: relative;
}

.my-table-container table {
  position: relative;
}

.my-table-container th {
  background-color: white;
  border-bottom: 2px solid black;
  position: sticky;
  top: 0;
}

.my-teacher {
  background-color: #FFFF00;
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
}
.now-focus:after {
  content: '';
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-1 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(100% + var(--borderWidth) * 2);
  background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
  border-radius: calc(2 * var(--borderWidth));
  z-index: -1;
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
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
`);

const surnames = [
  "樊",
  "薛",
  "刁",
  "丁",
  "上官",
  "公羊",
  "公冶",
  "公孫",
  "山",
  "弓",
  "于",
  "太叔",
  "令狐",
  "司空",
  "司徒",
  "勾",
  "元",
  "公",
  "仇",
  "井",
  "方",
  "水",
  "尤",
  "尹",
  "卞",
  "毋",
  "文",
  "孔",
  "毛",
  "王",
  "牛",
  "巴",
  "戈",
  "司馬",
  "申屠",
  "仲孫",
  "宇文",
  "包",
  "左",
  "弘",
  "平",
  "石",
  "白",
  "甘",
  "申",
  "皮",
  "田",
  "司",
  "史",
  "充",
  "古",
  "宗政",
  "東方",
  "長孫",
  "夏侯",
  "仲",
  "全",
  "任",
  "危",
  "印",
  "向",
  "匡",
  "安",
  "成",
  "朱",
  "米",
  "艾",
  "羊",
  "江",
  "池",
  "曲",
  "仰",
  "伍",
  "伊",
  "伏",
  "徐離",
  "軒轅",
  "單於",
  "萬俟",
  "冷",
  "何",
  "李",
  "杜",
  "沈",
  "汲",
  "沃",
  "束",
  "沙",
  "步",
  "汪",
  "辛",
  "阮",
  "車",
  "邢",
  "貝",
  "利",
  "別",
  "吳",
  "呂",
  "岑",
  "宋",
  "扶",
  "那",
  "聞人",
  "慕容",
  "歐陽",
  "諸葛",
  "居",
  "尚",
  "宗",
  "於",
  "房",
  "松",
  "林",
  "明",
  "易",
  "杭",
  "東",
  "昌",
  "武",
  "牧",
  "空",
  "花",
  "芮",
  "邱",
  "金",
  "邴",
  "邰",
  "邵",
  "卓",
  "和",
  "周",
  "孟",
  "幸",
  "季",
  "屈",
  "竺",
  "皇甫",
  "尉遲",
  "淳于",
  "施",
  "查",
  "柯",
  "柏",
  "柳",
  "洪",
  "段",
  "相",
  "秋",
  "胡",
  "紀",
  "紅",
  "苗",
  "茅",
  "郎",
  "後",
  "封",
  "宣",
  "侯",
  "卻",
  "姚",
  "計",
  "姬",
  "唐",
  "倪",
  "夏",
  "奚",
  "師",
  "宰",
  "庫",
  "席",
  "家",
  "容",
  "孫",
  "徐",
  "時",
  "晏",
  "桑",
  "桂",
  "柴",
  "烏",
  "珠",
  "班",
  "益",
  "祖",
  "祝",
  "秦",
  "翁",
  "耿",
  "能",
  "荊",
  "茹",
  "荀",
  "袁",
  "貢",
  "馬",
  "高",
  "郗",
  "浦",
  "郝",
  "國",
  "堵",
  "宿",
  "屠",
  "巢",
  "常",
  "康",
  "張",
  "強",
  "從",
  "戚",
  "曹",
  "梁",
  "梅",
  "畢",
  "盛",
  "符",
  "終",
  "習",
  "莘",
  "莫",
  "莊",
  "許",
  "通",
  "連",
  "郭",
  "都",
  "陳",
  "陸",
  "陶",
  "章",
  "魚",
  "麻",
  "崔",
  "庾",
  "淩",
  "勞",
  "單",
  "富",
  "惠",
  "景",
  "曾",
  "湯",
  "焦",
  "程",
  "童",
  "舒",
  "華",
  "費",
  "賀",
  "越",
  "鈕",
  "閔",
  "陽",
  "隆",
  "雲",
  "項",
  "須",
  "馮",
  "黃",
  "傅",
  "喬",
  "彭",
  "幹",
  "廉",
  "慎",
  "楊",
  "溫",
  "滑",
  "萬",
  "葉",
  "葛",
  "董",
  "解",
  "詹",
  "路",
  "農",
  "遊",
  "雷",
  "鄔",
  "隗",
  "溥",
  "裘",
  "壽",
  "廖",
  "榮",
  "滿",
  "熊",
  "管",
  "聞",
  "蒙",
  "蒲",
  "蒼",
  "裴",
  "褚",
  "趙",
  "鳳",
  "齊",
  "劉",
  "廣",
  "慕",
  "暴",
  "樂",
  "歐",
  "滕",
  "穀",
  "範",
  "蔚",
  "蔣",
  "蔡",
  "蔔",
  "蓬",
  "衛",
  "談",
  "諸",
  "鄭",
  "養",
  "餘",
  "魯",
  "潘",
  "黎",
  "曆",
  "燕",
  "盧",
  "蕭",
  "融",
  "衡",
  "賴",
  "錢",
  "駱",
  "龍",
  "霍",
  "鮑",
  "儲",
  "應",
  "戴",
  "薑",
  "薊",
  "謝",
  "鍾",
  "韓",
  "簡",
  "聶",
  "藍",
  "豐",
  "雙",
  "顏",
  "魏",
  "懷",
  "羅",
  "邊",
  "關",
  "瞿",
  "龐",
  "嚴",
  "蘇",
  "饒",
  "鹹",
  "黨",
  "顧",
  "酆",
  "權",
  "酈",
  "龔",
];

class ResultTable {
  constructor() {
    this.result = "";
  }

  addTeacher(teacher) {
    const t = teacher;
    // Email	備註(查無資料:X；新增:V)	備註
    // mail   X, V(新)                  找不到mail, 升等
    const mail = t.mail ?? "";
    const check = t.isNew ? "V" : t.isFound ? "" : "X";
    let remark = "";
    if (t.isFound) {
      remark += t.mail ? "" : "找不到email";
    } else {
      remark = "";
    }

    const row = [mail, check, remark].join("\t");
    if (this.result !== "") {
      this.result += "\n";
    }
    this.result += row;
  }

  addNewTeacher(teacher) {
    const t = teacher;

    // 職稱	    教師姓名     專長領域	  系所網址  Email	    備註(查無資料:X；新增:V)	備註
    // title    name                              mail      V(新)
    const title = t.title ?? "";
    const name = t.name ?? "";
    const mail = t.mail ?? "";
    const check = "V";
    const remark = "";

    const row = [title, name, "", "", mail, check, remark].join("\t");
    if (this.result !== "") {
      this.result += "\n";
    }
    this.result += row;
  }

  clear() {
    this.result = "";
  }

  copy() {
    copyStringToClipboard(this.result);
  }
}

// teacher
// create the search input and results list
var searchInput = $("<input>", {
  type: "text",
  placeholder: "搜尋老師（空格分隔）",
  onfocus: "this.select()",
});

// create the search container element and append the input and results list
const teacherTable = new ResultTable();
const newTeacherTable = new ResultTable();
var searchContainer = $("<div>", { class: "teacher-search" });
var copyTableButton = $("<button/>", {
  text: "複製已有教師",
  click: function () {
    teacherTable.copy();
  },
});
var copyNewTableButton = $("<button/>", {
  text: "複製新進教師",
  click: function () {
    newTeacherTable.copy();
  },
});
searchContainer.append(searchInput);
searchContainer.append(copyTableButton);
searchContainer.append(
  "<div class='my-table-container'><table><tbody id='search-results'></tbody></table></div>",
);
searchContainer.append(copyNewTableButton);
searchContainer.append(
  "<div class='my-table-container'><table><tbody id='search-results-new'></tbody></table></div>",
);

// append the search container to the body
$("body").append(searchContainer);

// listen for the input event on the search input
searchInput.on("input", function () {
  $("#search-results").empty();
  $("#search-results-new").empty();
  teacherTable.clear();
  newTeacherTable.clear();

  // get the search query and split it by whitespace
  const query = $(this).val();

  let teachers = [];
  let teacherContainer;
  if (query === "") {
    $(".my-teacher").removeClass("my-teacher");
    return;
  } else if (query.match(/\t/)) {
    // find teacher container automatically
    teachers = parseTitleAndNameToArray(query);
    teacherContainer = findTeacherContainer(teachers);
  } else {
    console.log("queryselector")
    console.log(query)
    // query selector mode

    // remove the !
    const cssSelector = query;
    teacherContainer = $(cssSelector);
  }

  findAllTeachersInEl(teachers, teacherContainer);

  const newTeachers = [];
  $("[data-name]").each(function () {
    const nameEl = $(this);
    const mailEl = nameEl.parents().has("[data-mail]").first().find(
      "[data-mail]",
    )
      .first();
    const titleEl = nameEl.parents().has("[data-title]").first().find(
      "[data-title]",
    )
      .first();

    const name = $(nameEl).data("name");
    $(nameEl).addClass(`my-classified ${name}-teacher`);
    $(mailEl).addClass(`my-classified ${name}-teacher`);
    $(titleEl).addClass(`my-classified ${name}-teacher`);

    const t = teachers.find((t) => t.name === name);
    if (t) {
      // found teacher
      t.mail = $(mailEl).data("mail");
      const oldTitle = t.title;
      const newTitle = $(titleEl).data("title");
      if (oldTitle !== newTitle) {
        t.newTitle = newTitle;
      }
    } else {
      // new teacher
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
  // $(teacherContainer)
  //   .children()
  //   .each(function () {
  //     const nameEl = $(this).find("[data-name]").first();
  //     const mailEl = $(this).find("[data-mail]").first();
  //     const titleEl = $(this).find("[data-title]").first();
  //     if (nameEl.length !== 1) {
  //       return;
  //     }
  //     const name = $(nameEl).data("name");
  //     console.log(name);
  //     const t = teachers.find((t) => t.name === name);
  //     console.log(t);
  //     if (t) {
  //       // found teacher
  //       t.mail = $(mailEl).data("mail");
  //       const oldTitle = t.title;
  //       const newTitle = $(titleEl).data("title");
  //       if (oldTitle !== newTitle) {
  //         t.newTitle = newTitle;
  //       }
  //     } else {
  //       // new teacher
  //       const newT = {
  //         name: $(nameEl).data("name"),
  //         title: $(titleEl).data("title"),
  //         mail: $(mailEl).data("mail"),
  //         isFound: false,
  //         newTitle: false,
  //         isNew: true,
  //       };
  //       newTeachers.push(newT);
  //     }
  //   });

  $("#search-results").append(
    "<tr><th>已確認</th><th>職等</th><th>新職等</th><th>姓名</th><th>信箱</th></tr>",
  );
  $("#search-results-new").append(
    "<tr><th>已確認</th><th>職等</th><th>姓名</th><th>信箱</th></tr>",
  );

  teachers.forEach((t) => {
    teacherTable.addTeacher(t);

    let newRow;
    // 職等(#t-name-title)       新職等(#t-name-title) 姓名(#t-name-name)       信箱(#t-name-mail)
    newRow = $("<tr>").append(
      $("<td>").append("<input type='checkbox'></input>"),
      $("<td>").attr("href", `#_${t.name}`).append(
        $("<a>").text(t.title),
      ),
      $("<td>").attr("href", `#_${t.name}`).append(
        $("<a>").text(t.newTitle ? t.newTitle : ""),
      ),
      $("<td>").append(
        $("<a>").attr("href", `#_${t.name}`).text(t.name),
      ),
      $("<td>").append(
        $("<a>").attr("href", `#_${t.name}`).text(t.mail),
      ),
    );
    if (!t.isFound) {
      newRow.addClass("not-found");
    }
    $("#search-results").append(newRow);
  });

  newTeachers.forEach((t) => {
    newTeacherTable.addNewTeacher(t);

    let newRow;
    // 職等(#t-name-title)       新職等(#t-name-title) 姓名(#t-name-name)       信箱(#t-name-mail)
    newRow = $("<tr>").append(
      $("<td>").append("<input type='checkbox'></input>"),
      $("<td>").append(
        $("<a>").attr("href", `#_${t.name}`).text(t.title),
      ),
      $("<td>").append(
        $("<a>").attr("href", `#_${t.name}`).text(t.name),
      ),
      $("<td>").append(
        $("<a>").attr("href", `#_${t.name}`).text(t.mail),
      ),
    );
    $("#search-results-new").append(newRow);
  });

  $(".my-table-container a").click(function () {
    $(".my-teacher").removeClass("now-focus");
    const targetTeacherFakeId = $(this).attr("href");
    const targetTName = targetTeacherFakeId.replace("#_", "");
    $("html,body").animate({
      scrollTop: $("#" + targetTName + "-teacher").offset().top -
        $(window).height() / 2,
    }, 100);
    $("." + targetTName + "-teacher").addClass("now-focus");
  });
});

function getText(el) {
  // const element = $(el).get(0);
  // let text = "";
  // if (!element) {
  //   return "";
  // }
  //
  // for (var i = 0; i < element.childNodes.length; ++i) {
  //   if (element.childNodes[i].nodeType === Node.TEXT_NODE) {
  //     text += element.childNodes[i].textContent;
  //   }
  // }
  // return text;

  // slower, but more accurate
  return $(el)
    .clone()
    .children()
    .remove()
    .end()
    .text()
    .trim()
    .replace(/(\r\n|\n|\r)/gm, "");
}

function markTeacherName(keyword, matches) {
  if (keyword === "") {
    return;
  }
  const regex = new RegExp(keyword);
  const teacherElements = $("*").filter(function () {
    const text = getText(this);
    const isMatch = regex.test(text);
    if (isMatch) {
      matches.push(keyword);
      $(this).attr("id", keyword);
    }
    return isMatch;
  });
  teacherElements.addClass("my-teacher");
}

function findClosestElMatchingRegex(regex, targetId) {
  const targetEl = $("#" + targetId);
  if (targetEl.length === 0) {
    return null;
  }

  const matchingEls = $(
    "*:not(html, body, meta, title, style, head, link)",
  ).filter(function () {
    const text = getText(this);
    return regex.test(text);
  });

  if (matchingEls.length === 0) {
    return null;
  }

  let minCommonParentsDepth = 0;
  let closestEl;
  matchingEls.each(function () {
    const depth = $("#" + targetId)
      .parents()
      .has(this)
      .first()
      .parents().length;
    if (depth > minCommonParentsDepth) {
      minCommonParentsDepth = depth;
      closestEl = $(this);
    }
  });

  return closestEl;
}

function copyStringToClipboard(str) {
  navigator.clipboard.writeText(str).then(
    function () {},
    function (err) {
      console.log(err);
    },
  );
}

function parseTitleAndNameToArray(str) {
  // tab is 教授 <-> 姓名
  // space is 換行

  // cannot use /\s/, idk why
  const rows = str.split(" ");
  const results = [];
  rows.forEach((r) => {
    const [title, name] = r.split(/\t/);
    results.push({
      title,
      name,
      isFound: false,
      newTitle: false,
      isNew: false,
    });
  });
  return results;
}

function findTeacherContainer(teachers) {
  const nameEls = [];
  for (t of teachers) {
    const regex = new RegExp("^" + t.name);
    const nameEl = findOneElByRegex(regex);
    if (nameEl) {
      nameEls.push(nameEl);
    }
  }
  if (nameEls.length > 1) {
    const container = $(nameEls[0])
      .parents()
      .has(nameEls[1])
      .has(nameEls[nameEls.length - 1])
      .first();
    return container;
  } else if (nameEls.length === 1) {
    return nameEl[0];
  }
}

function findOneElByRegex(regex) {
  const elements = $(
    "*:not(html, body, meta, title, style, script, link, head)",
  ).toArray();
  for (el of elements) {
    const text = getText(el);
    const isMatch = regex.test(text);
    if (isMatch) {
      return el;
    }
  }
}

function testElIsMatchRegex(el, regex) {
  const text = getText(el);
  const isMatch = regex.test(text);
  if (isMatch) {
    return el;
  }
}

function findAllTeachersInEl(teachers, el) {
  const newTeachers = [];
  $(el)
    .children()
    .find("*")
    .each(function () {
      let isNewTeacher = true;
      let newT;

      let regex;
      let nameEl;
      let name = "";
      for (let i = 0; i < surnames.length; i++) {
        const s = surnames[i];

        regex = new RegExp(`^${s}`);
        nameEl = testElIsMatchRegex(this, regex);

        // 避免"金融管理學院"被誤判成姓金的人
        const excludeList = ["應用", "管理", "金融", "農企", "連絡", "國立", "國家", "公司"];
        name = getText(nameEl);
        const isValidName = excludeList.every((s) => {
          return !name.includes(s);
        });
        if (nameEl && isValidName) {
          break;
        }
      }
      if (nameEl) {
        name = getText(nameEl);
        name = name.replace(/（.*）/, "");
        $(nameEl)
          .attr("data-name", name)
          .attr("id", `${name}-teacher`)
          .addClass("my-teacher my-name");
        // check if is old teacher
        for (const t of teachers) {
          const isMatch = t.name === name;
          if (isMatch) {
            t.isFound = true;
            isNewTeacher = false;
            break;
          }
        }
        if (isNewTeacher) {
          $(nameEl).addClass("my-new-teacher");
        }
      }

      // mail
      regex = new RegExp(
        "^.*([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*.[a-z]{2,})",
        "i",
      );
      regex = new RegExp(
        "^.*([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*.[a-z]{2,}).*$",
        "i",
      );
      const mailEl = testElIsMatchRegex(this, regex);
      let mail = getText(mailEl);
      if (mail) {
        regex = new RegExp(
          "([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*.[a-z]{2,})",
          "i",
        );
        mail = mail.match(regex)[0];
      }
      $(mailEl)
        .attr("data-mail", mail)
        .addClass("my-teacher my-mail")
        .after(
          $("<button>複製信箱</button>").click(function () {
            copyStringToClipboard(mail);
          }),
        );

      // title
      regex = new RegExp("教授|副教授|講師|助理教授|系主任|校長|院長");
      const titleEl = testElIsMatchRegex(this, regex);
      const title = getText(titleEl);
      $(titleEl)
        .attr("data-title", title)
        .addClass("my-teacher my-title")
        .after(
          $("<button>複製職等</button>").click(function () {
            copyStringToClipboard(mail);
          }),
        );

      if (name !== "" && isNewTeacher) {
        newT = {
          name,
          mail: "",
          title: "",
          isFound: false,
          newTitle: false,
          isNew: true,
        };
        newTeachers.push(newT);
      }
    });

  return newTeachers;
}

function addCopyBtn() {
  // add copy button to 專長-liked elements
  $("div, span, p, h2, h3, h4, h5, h6").filter(function () {
    // 至少兩個頓號
    const text = getText(this);
    return /.*、(.*、)+.*/.test(text);
  }).after(function () {
    const text = getText(this);
    const btn = $("<button>複製專長</button>").click(function () {
      copyStringToClipboard(text);
    });
    return btn;
  });
}

function highlightTeacherLink() {
  $("a, button").filter(function () {
    const text = getText(this);
    return /.*(師資|系所成員|人員).*/.test(text);
  }).addClass("my-highlighted");
}

addCopyBtn();
highlightTeacherLink();

//
// 講師 助理教授 副教授 教授 主任 院長 校長
