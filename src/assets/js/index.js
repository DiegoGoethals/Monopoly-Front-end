"use strict";



function initIndex() {
    document.getElementById("username").addEventListener("input", enable);
}

function enable() {
    const input = document.getElementById("username");
    if (input.value !== "") {
        const $button = document.getElementById("play");
        $button.disabled = false;
    } else {
        const $button = document.getElementById("play");
        $button.disabled = true;
    }
}
