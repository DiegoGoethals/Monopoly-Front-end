"use strict";



function initIndex() {
    document.getElementById("username").addEventListener("input", enable);
    document.getElementById("deleteGames").addEventListener("click", deleteGames);
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

function deleteGames() {
    fetchFromServer("/games", "DELETE").then(games => {
        console.log("Games deleted", games);
    });
}
