if (confirm("Do you want to create a new userscript?")) {
  const name = prompt("name:", "My new userscript");
  const author = prompt("author:", "FOBshippingpoint");
  const description = prompt("description:", "A fresh userscript");

  const dirName = name.toLowerCase().replaceAll(" ", "-");
  const scriptName = name.toLowerCase().replaceAll(" ", "_") + ".user.js";

  const content = `// ==UserScript==
// @name                  ${name}
// @author                ${author}
// @namespace             https://github.com/FOBshippingpoint/oreno-userscripts
// @description           ${description}
// @license               MIT
// @version               1.0
// @icon                  https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/${dirName}/icon.png
// @include               https://github.com
// @updateURL             https://raw.githubusercontent.com/FOBshippingpoint/oreno-userscripts/main/${dirName}/${scriptName}
// @supportURL            https://github.com/FOBshippingpoint/oreno-userscripts/issues
// @homepageURL           https://github.com/FOBshippingpoint/oreno-userscripts#readme
// ==/UserScript==
`;

  try {
    await Deno.mkdir(dirName);
    await Deno.writeTextFile(dirName + "/" + scriptName, content);
    console.log(
      "Successfully create new userscript in directory `" + dirName + "`",
    );
  } catch (err) {
    console.log("\nAn error occurred while generating new userscript :(");
    console.error(err);
  }
}
