"use strict";


function initUsername() {
    const $usernameInputField = document.querySelector("#username");
    const $playButton = document.querySelector('#play');
    $playButton.addEventListener("click", saveToLocalStorage);
    $usernameInputField.addEventListener("keypress", saveToLocalStorage);
}

function saveToLocalStorage() {
    const username = document.querySelector("#username").value;
    localStorage.setItem("username", `${username}`);
}
