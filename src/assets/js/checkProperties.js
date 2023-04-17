"use strict";

const _gameID = localStorage.getItem("gameID");
const _username = localStorage.getItem("username");

function initCheckProperties() {
    getCurrentState();
    document.getElementById("showMortgaged").addEventListener("click", showMortgagedScreen);
    document.getElementById("closeMortgaged").addEventListener("click", closeMortgaged);
    document.getElementById("showUpgradeable").addEventListener("click", showUpgradeableScreen);
    document.getElementById("closeUpgradeable").addEventListener("click", closeUpgradeable);
    document.getElementById("showUpgraded").addEventListener("click", showUpgradedScreen);
    document.getElementById("closeUpgraded").addEventListener("click", closeUpgraded);
}

function getCurrentState() {
    fetchFromServer(`/games/${_gameID}`, "GET").then(game => {
        showProperties(game.players);
        showUpgradeable(game.players);
        showMortgaged(game.players);
        showUpgraded(game.players);
    });
}

function showProperties(players) {
    const $container = document.querySelector("#properties");
    $container.innerHTML = "";
    const player = players.filter(player => player.name === _username)[0];
    if (_username === player.name) {
        for (let property of player.properties) {
            showProperty($container, property);
        }
    }
    document.querySelectorAll(".mortgage").forEach(button => {
        button.addEventListener("click", takeMortgage);
    });
}

function showProperty(container, property) {
    container.insertAdjacentHTML("beforeend", `
    <div class="flipCard">
        <div class="innerCard">
            <div class="frontSide">
                <img src="assets/PropertyCards/${property.position}.png" alt="Owned property">
            </div>
            <div class="backside">
                <a class="mortgage" id="${property.position}" href="#">Take mortgage</a>
            </div>
        </div>
    </div>`);
}


function showUpgradeable(players) {
    const container = document.getElementById("upgradeableProperties");
    container.innerHTML = "";
    const upgradeable = players.filter(player => player.name === _username)[0]
        .properties.filter(property => property.upgradeable);
    for (let property of upgradeable) {
        container.insertAdjacentHTML("beforeend", `
            <div class="flipCard">
                <div class="innerCard">
                    <div class="frontSide">
                        <img src="assets/PropertyCards/${property.position}.png" alt="upgradeable property">
                    </div>
                    <div class="backside">
                        <a id="${property.name}" data-houseCount="${property.houseCount}" class="upgrade" href="#">Upgrade</a>
                    </div>
                </div>
            </div>`);
    }
    document.querySelectorAll(".upgrade").forEach(button => {
        button.addEventListener("click", upgradeProperty);
    });
}

function upgradeProperty(e) {
    const propertyName = e.target.id;
    fetchFromServer(`/tiles/${propertyName}`, "GET").then(() => {
        if (e.target.dataset.housecount < 4) {
            fetchFromServer(`/games/${_gameID}/players/${_username}/properties/${propertyName}/houses`, "POST").then(() => {
                getCurrentState();
            });
        } else {
            fetchFromServer(`/games/${_gameID}/players/${_username}/properties/${propertyName}/hotel`, "POST").then(() => {
                getCurrentState();
            });
        }
    });
}

function showUpgraded(players) {
    const container = document.getElementById("upgradedProperties");
    container.innerHTML = "";
    const upgraded = players.filter(player => player.name === _username)[0]
        .properties.filter(property => property.houseCount > 0 || property.hotel);
    for (let property of upgraded) {
        container.insertAdjacentHTML("beforeend", `
            <div class="flipCard">
                <div class="innerCard">
                    <div class="frontSide">
                        <img src="assets/PropertyCards/${property.position}.png" alt="Upgraded property">
                    </div>
                    <div class="backside">
                        <a class="sell" id="${property.name}" href="#">Sell an upgrade</a>
                    </div>
                </div>
            </div>`);
    }
    document.querySelectorAll(".sell").forEach(button => {
        button.addEventListener("click", sellHouse);
    });
}

function sellHouse(e) {
    const propertyName = e.target.id;
    fetchFromServer(`/games/${_gameID}/players/${_username}/properties/${propertyName}/houses`, "DELETE").then(() => {
        getCurrentState();
    });
}

function showUpgradedScreen() {
    document.getElementById("upgraded").style.display = "block";
}

function closeUpgraded() {
    document.getElementById("upgraded").style.display = "none";
}

function showMortgaged(players) {
    const container = document.getElementById("mortgagedProperties");
    container.innerHTML = "";
    const mortgaged = players.filter(player => player.name === _username)[0]
        .properties.filter(property => property.mortgaged);
    for (let property of mortgaged) {
        container.insertAdjacentHTML("beforeend", `
        <div class="flipCard">
            <div class="innerCard">
                <div class="frontSide">
                    <img src="assets/PropertyCards/${property.position}.png" alt="Owned property">
                </div>
                <div class="backside"><a class="payMortgage" href="#" id="${property.position}">Pay off mortgage</a></div>
            </div>
        </div>
    </div>`);
    }
    document.querySelectorAll(".payMortgage").forEach(button => {
        button.addEventListener("click", settleMortgage);
    });
}

function showMortgagedScreen() {
    document.getElementById("mortgaged").style.display = "block";
}

function closeMortgaged() {
    document.getElementById("mortgaged").style.display = "none";
}

function takeMortgage(e) {
    const propertyName = _tiles[e.target.id].name;
    fetchFromServer(`/games/${_gameID}/players/${_username}/properties/${propertyName}/mortgage`, "POST").then(() => {
        getCurrentState();
    });
}

function settleMortgage(e) {
    const propertyName = _tiles[e.target.id].name;
    fetchFromServer(`/games/${_gameID}/players/${_username}/properties/${propertyName}/mortgage`, "DELETE").then(() => {
        getCurrentState();
    });
}

function showUpgradeableScreen() {
    document.getElementById("upgradeable").style.display = "block";
}

function closeUpgradeable() {
    document.getElementById("upgradeable").style.display = "none";
}
