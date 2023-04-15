"use strict";

const amountOfTiles = 6;
let _currentTile = 0;
let _interval = null;
const _gameID = localStorage.getItem("gameID");
const _username = localStorage.getItem("username");
let _propertyName = null;

function initGame() {
    getCurrentState();
    document.getElementById("leave").addEventListener("click", leaveGame);
    document.getElementById("buy").addEventListener("click", buyProperty);
    document.getElementById("noBuy").addEventListener("click", noBuyProperty);
    document.getElementById("getOut").addEventListener("click", getOutOfJailByFine);
    document.getElementById("stay").addEventListener("click", deleteGetOutOfJailScreen);
    _interval = setInterval(() => getCurrentState(), 1500);
}

function showTiles() {
    const board = document.querySelector(".board");
    board.innerHTML = "";
    let beginTile = _currentTile;
    for (beginTile; beginTile < _currentTile + amountOfTiles; beginTile++) {
        board.insertAdjacentHTML("beforeend", `<div id="${beginTile % 40}" class="tile"><img src="assets/Tiles/${beginTile % 40}.png" alt="tile" class"tileImage"></div>`);
    }
    drawPawn();
    drawOpponentPawn();
}

function drawPawn() {
    const pawn = localStorage.getItem("pawn");
    const tile = document.getElementById(`${_currentTile}`);
    tile.insertAdjacentHTML("afterbegin", `<img src="images/${pawn}.png" alt="pawn" id="pawn" title="You">`);
}

function drawOpponentPawn() {
    fetchFromServer(`/games/${_gameID}`,'GET').then(game => {
        for (let player of game.players) {
            if (player.name !== _username && between(player.currentTile, _currentTile, _currentTile + 6)) {
                const tile = document.getElementById(`${player.currentTile}`);
                tile.insertAdjacentHTML("afterbegin", `<img src="images/pawn.png" alt="opponent" id="${player.name}" class="opponent" title="${player.name}">`);
            }
        }
    });
}

function between(x, min, max) {
    return x >= min && x <= max;
  }

function leaveGame() {
    fetchFromServer(`/games/${_gameID}/players/${_username}/bankruptcy`, "POST").then(() => {
        window.location = "goneBankrupt.html";
    });
}

function getCurrentState() {
    fetchFromServer(`/games/${_gameID}`,'GET').then(game => {
        let player = game.players.filter(player => player.name === _username)[0];
        _currentTile = player.currentTile;
        showTiles();
        showPlayers(game);
        if (game.turns.length > 0) {
            move(game, game.lastTurn, player);
        }
        document.getElementById("roll").innerHTML = game.lastDiceRoll;
        if (game.ended) {
            alert(`Congrats ${game.winner}, you won the game!`);
        }
    });
}

function move(game, lastTurn, player) {
    document.getElementById("jailText").innerHTML = "";
    const move = lastTurn.lastMove;
    if (lastTurn.player === _username) {
        _propertyName = move.tile;
        if (!game.canRoll && move.description === "can buy this property in direct sale") {
            showBuyScreen();
        }
        if(/Community Chest/.test(move.tile)) {
            showCommunityScreen(move);
        }
        if (lastTurn.moves.length > 1 && lastTurn.lastMove.description === "Car has been impounded") {
            goToJail();
        }
        if (player.jailed) {
            document.getElementById("jailText").innerHTML = "<p>You have to go to jail</p>";
            showGetOutOfJailScreen(player);
        }
        if(/Chance/.test(move.tile)) {
            showChanceScreen(move);
        }
    }
}

function goToJail() {
    const text = document.getElementById("jailText");
    text.innerHTML = "";
    text.innerHTML = "<p>You have to go to jail</p>"
    _currentTile = 10;
}

function showBuyScreen() {
    const propertyCard = document.getElementById("propertyCard");
    propertyCard.parentNode.removeChild(propertyCard);
    document.getElementById("buyScreen").style.display = "block";
    document.getElementById("wrapper").insertAdjacentHTML("afterbegin", `<img src="assets/PropertyCards/${_currentTile}.png" alt="propertyCard" id="propertyCard">`);
}

function deleteBuyScreen() {
    document.getElementById("buyScreen").style.display = "none";
}

function buyProperty() {
    fetchFromServer(`/games/${_gameID}/players/${_username}/properties/${_propertyName}`, "POST").then(() => 
    deleteBuyScreen());
}

function noBuyProperty() {
    fetchFromServer(`/games/${_gameID}/players/${_username}/properties/${_propertyName}`, "DELETE").then(() =>
    deleteBuyScreen());
}

function showPlayers(game) {
    const container = document.getElementById("players");
    container.innerHTML = "";
    game.players.forEach(player => {
        container.insertAdjacentHTML("afterbegin", `<div id="${player}" class="playercard">
            <p>${player.name}</p>
            <p>$${player.money}</p>
            <p>You got ${player.getOutOfJailFreeCards} get out of jail cards</p>
        </div>`);
    });
    container.insertAdjacentHTML("afterbegin", `<div id="currentPlayer" class="playercard">
            <p>Current player: ${game.currentPlayer}</p>
        </div>`);
}

function showGetOutOfJailScreen(player) {
   document.getElementById("getOutByCard").remove();
   if (player.getOutOfJailFreeCards > 0) {
    document.getElementById("jailButtons").insertAdjacentHTML("afterbegin", `<button id="getOutByCard">
        Yes I would like to use my get out of jail card</button>`);
        document.getElementById("getOutByCard").addEventListener("click", getOutOfJailByCard);
   }
    document.getElementById("getOutOfJail").style.display = "block";
}

function deleteGetOutOfJailScreen(){
    document.getElementById("getOutOfJail").style.display = "none";
}

function getOutOfJailByCard() {
    fetchFromServer(`/games/${_gameID}/prison/${_username}/free`, "POST").then(() => {
        document.getElementById("jailText").innerHTML = "";
        deleteGetOutOfJailScreen();
    });
}

function getOutOfJailByFine() {
    fetchFromServer(`/games/${_gameID}/prison/${_username}/fine`, "POST").then(() => {
        document.getElementById("jailText").innerHTML = "";
        deleteGetOutOfJailScreen();
    });
}

function showCommunityScreen(move){
    fetchFromServer("/community-chest", "GET").then(cards => {
        const communityCard = document.getElementById("communityCard");
        communityCard.parentNode.removeChild(communityCard);
        document.getElementById("communityScreen").style.display = "block";
        document.getElementById("communityWrapper").insertAdjacentHTML("afterbegin", `<img src="assets/Community/${cards.indexOf(move.description)}.png" alt="communityCard" id="communityCard">`);
        document.getElementById("communityWrapper").addEventListener("click", deleteCommunityScreen);
    });
}

function deleteCommunityScreen(){
    const communityCard = document.getElementById("communityCard");
    communityCard.parentNode.removeChild(communityCard);
    document.getElementById("communityScreen").style.display = "none";
}

function showChanceScreen(move){
    fetchFromServer("/chance", "GET").then(cards => {
        const chanceCard = document.getElementById("chanceCard");
        chanceCard.parentNode.removeChild(chanceCard);
        document.getElementById("chanceScreen").style.display = "block";
        document.getElementById("chanceWrapper").insertAdjacentHTML("afterbegin", `<img src="assets/Community/${cards.indexOf(move.description)}.png" alt="chanceCard" id="chanceCard">`);
        document.getElementById("chanceWrapper").addEventListener("click", deleteChanceScreen);
    });
}

function deleteChanceScreen(){
    const chanceCard = document.getElementById("chanceCard");
    chanceCard.parentNode.removeChild(chanceCard);
    document.getElementById("chanceScreen").style.display = "none";
}
