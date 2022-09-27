"use strict";
let _interval = null;

function initLoading() {
  _interval = setInterval(() => getCurrentState(), 1500);
}

function getCurrentState() {
  document.querySelector(".players").innerHTML = "";
  const gameID = localStorage.getItem("gameID");
  fetchFromServer(`/games/${gameID}`,'GET').then(game => {
    const container = document.querySelector(".players");
    displayLoaders(game.numberOfPlayers, container);
    let playersJoined = 0;
    game.players.forEach(player => {
      playersJoined++;
      displayPlayers(player, container);
    });
    document.getElementById("counter").innerHTML = `Players ${playersJoined}/${game.numberOfPlayers}`;
    if (playersJoined === game.numberOfPlayers) {
      document.getElementById("waitingText").innerHTML = "All players joined, please proceed to the game"
      document.getElementById("start").disabled = false;
      clearInterval(_interval);
    } else {
      document.getElementById("waitingText").innerHTML = "Waiting for players";
      document.getElementById("start").disabled = true;
    }
  });
}

function displayLoaders(amountOfPlayers, container) {
  for (let i = 0; i < amountOfPlayers; i++) {
    container.insertAdjacentHTML("beforeend", `<div class="playercard">
    <!-- hier toon je de tekst voordat de player joined -->
    <div class="loading-text">
       <p>Player joining...</p>
    </div>
    <!-- Dit zorgt voor de spinner te tonen. -->
    <div class="spinner"></div>
    </div>`);
  }
}

function displayPlayers(player, container) {
  deleteLoading(container);
  container.insertAdjacentHTML("afterbegin", `<div class="playercard">
  <!-- Hier komt de tekst nadat het laden gedaan is. -->
  <div class="loading-text">
     <p>${player.name} has joined</p>
  </div>
  </div>`);
}

function deleteLoading(container) {
    container.removeChild(container.lastChild);
}
