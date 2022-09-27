"use strict";
let _token = null;
let _tiles = null;

document.addEventListener('DOMContentLoaded',init);

function init(){
    setToken();
    getTiles();
    game();
}

function getTiles() {
    fetchFromServer("/tiles", "GET").then(tiles => {
        _tiles = tiles;
    });
}

function setToken() {
    _token = JSON.parse(localStorage.getItem("token"));
}

function game() {
    if (document.querySelector("#username") ){
        initIndex();
        initUsername();
    }
    if (document.querySelector("#create")) {
        initCreateGame();
        initDisplayUsername();
    }
    if (document.querySelector("#lobbies")) {
        initDisplayExistingLobbies();
        initJoinGame();
    }
    if (document.querySelector(".pawns")) {
        initChoosePawn();
    }
    if (document.querySelector("#start")) {
        initLoading();
    }
    if (document.querySelector(".sidebar")) {
        initGame();
        initDice();
        initMinimap();
        initSidebar();
    }
    if (document.querySelector("#properties")) {
        initCheckProperties();
        
    }
    if (document.querySelector("#opponentProperties")){
        initOpponentProperties();
    }
}