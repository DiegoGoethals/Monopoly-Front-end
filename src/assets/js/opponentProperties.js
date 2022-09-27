"use strict";
const _gameID = localStorage.getItem("gameID")

function initOpponentProperties() {
    fetchFromServer(`/games/${_gameID}`, "GET").then(game => {
        showProperties(game.players);
    });
}

function showProperties(players) {
    const $container = document.querySelector("#opponentProperties");
    for (let player of players) {
        let username = player.name;
        if (username != localStorage.getItem("username")) {
            $container.insertAdjacentHTML("afterbegin", `
            <div class="playerProperties">
            <h2>${username}</h2>
            </div>`);
            for (let property of player.properties) {
                showProperty($container.querySelector(".playerProperties"), property);
        }
        }
        
    }
}

function showProperty(container, property) {
    container.insertAdjacentHTML("beforeend",
    `<div class="frontSide">
        <img src="assets/PropertyCards/${property.position}.png" alt="Owned property">
    </div>`);
}
