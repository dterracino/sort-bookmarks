"use strict";

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  browser.runtime.sendMessage({"type": "sortRoot"});
});

console.log("Loaded sort-panel.js");
