"use strict";

let _game = null;
let _upgradeableProperties = [];
let _houseCounts = {
    "PURPLE": 0,
    "LIGHTBLUE": 0,
    "VIOLET": 0,
    "ORANGE": 0,
    "RED": 0,
    "YELLOW": 0,
    "DARKGREEN": 0,
    "DARKBLUE": 0
};
const _gameID = localStorage.getItem("gameID");
const _username = localStorage.getItem("username");

function initCheckProperties() {
    getCurrentState();
    document.getElementById("showMortgaged").addEventListener("click", showMortgagedScreen);
    document.getElementById("closeMortgaged").addEventListener("click", closeMortgaged);
}

function getCurrentState() {
    fetchFromServer(`/games/${_gameID}`, "GET").then(game => {
        _game = game;
        showProperties(game.players);
        showUpgradeable(game.players);
        showMortgaged();
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
                <a class="sell" href="#">Sell</a>
            </div>
        </div>
    </div>`);
}


function showUpgradeable(players) {
    const container = document.getElementById("upgradeableProperties");
    container.innerHTML = "";
    let properties = null;
    for (let player of players) {
        if (player.name === localStorage.getItem("username")) {
            properties = player.properties;
            break;
        }
    }
    let ugradeableIndex = 0;
    for (let property of properties) {
        const color = _tiles[property.position].streetColor;
        let amountOfGroup = 0;
        let highestCount = [];
        let numberInGroup = 0;
        let sameProp = null;
        let canUpgrade = false;
        for (let prop of properties) {
            if (_tiles[prop.position].color === color) {
                amountOfGroup++;
                highestCount.push(prop.houseCount);
                if (property.name === prop.name) {
                    sameProp = numberInGroup;
                }
                numberInGroup++;
            }
            if (amountOfGroup === _tiles[property.position].groupSize) {
                if (Math.max(...highestCount) !== Math.min(...highestCount) && highestCount[sameProp] === Math.min(...highestCount)) {
                    canUpgrade = true;
                }
                if (Math.max(...highestCount) === Math.min(...highestCount)) {
                    canUpgrade = true;
                }
                _houseCounts[color] = Math.min(...highestCount);
            }
            if (canUpgrade) {
                _upgradeableProperties.push(property.name);
                container.insertAdjacentHTML("afterbegin", `<div id="${property.name}" class="flipCard">
                <div class="innerCard">
                   <div class="frontSide">
                      <img src="assets/PropertyCards/${property.position}.png" alt="upgradeable property">
                   </div>
                   <div class="backside">
                      <a id="${ugradeableIndex}" class="upgrade" href="#">Upgrade</a>
                    </div>
                    </div>
                </div>`);
                ugradeableIndex++;
                document.querySelector(".upgrade").addEventListener("click", upgradeProperty);
                break;
            }
        }
    }
}

function upgradeProperty(e) {
    const propertyName = e.target.id;
    fetchFromServer(`/tiles/${propertyName}`, "GET").then(tile => {
        const color = tile.streetColor;
        if (_houseCounts[color] < 4) {
            fetchFromServer(`/games/${_gameID}/players/${_username}/properties/${propertyName}/houses`, "POST").then(() => {
                getCurrentState();
            });
        } else {
            fetchFromServer(`/games/${_gameID}/players/${_username}/properties/${propertyName}/hotel`, "POST");
        }
    });
}

function showMortgaged() {
    const container = document.getElementById("mortgagedProperties");
    container.innerHTML = "";
    const mortgaged = _game.players.filter(player => player.name === _username)[0]
        .properties.filter(property => property.mortgaged);
    for (let i = 0; i < mortgaged.length; i++) {
        container.insertAdjacentHTML("afterbegin", `
        <div class="flipCard">
            <div class="innerCard">
                <div class="frontSide">
                    <img src="assets/PropertyCards/${mortgaged[i].position}.png" alt="Owned property">
                </div>
                <div class="backside"><a class="payMortgage" href="#">Pay off mortgage</a></div>
            </div>
        </div>
    </div>`);
    }
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
