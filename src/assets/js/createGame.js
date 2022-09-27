"use strict";

function initCreateGame() {
    const $button = document.getElementById("create");
    $button.addEventListener("click", create);
}

function create(e) {
    e.preventDefault();
    const amountOfPlayers = parseInt(document.getElementById("amountOfPlayers").value);
    const bodyParams = {
        "prefix": _config.gamePrefix,
        "numberOfPlayers": amountOfPlayers
    };
    fetchFromServer("/games", "POST", bodyParams).then(game => {
        localStorage.setItem("gameID", game.id);
        joinGame(game.id);
    });
}

function joinGame(id) {
    const playerName = localStorage.getItem("username");
    const params= {
        "playerName": playerName
    };
    fetchFromServer(`/games/${id}/players`, 'POST', params).then(gameToken => {
        _token = gameToken;
        localStorage.setItem("token", JSON.stringify(gameToken));
        window.location ="choosePawn.html";
    });
}
