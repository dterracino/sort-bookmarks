import con from "./con.js";
import * as util from "./util.js";

const submitButtons = document.querySelectorAll("button");

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();

    const data = new FormData(e.target);
    const conf = {};
    for (const [key, value] of data.entries()) conf[key] = value;

    for (const b of submitButtons) b.disabled = true;
    util.sendMessage("sort", conf);
});

util.handleMessages({
    sortInProgress(value) {
        for (const b of submitButtons) b.disabled = value;
    },
});

(async () => {
    const conf = await util.sendMessage("popupOpened");
    con.log("Loading conf: %o", conf);

    for (const [key, value] of Object.entries(conf)) {
        const elems = document.querySelectorAll(`[name="${key}"]`);
        if (elems.length === 0) {
            con.warn("No elements for %o", key);
            continue;
        }

        for (const elem of elems) {
            if ("checked" in elem) {
                elem.checked = elem.value === value;
            } else {
                elem.value = value;
            }
        }
    }
})();
