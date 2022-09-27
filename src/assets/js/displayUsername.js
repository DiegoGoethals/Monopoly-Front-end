"use strict";


function initDisplayUsername() {
    showUsernameForCreateGame();
}

function showUsernameForCreateGame() {
    const username = localStorage.getItem("username");
    document.querySelector("h2").insertAdjacentHTML("beforeend", `${username}'s room`);
}
