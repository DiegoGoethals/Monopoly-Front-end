"use strict";


function initDisplayExistingLobbies() {
    fetchFromServer(`/games?prefix=${_config.gamePrefix}&started=false`,'GET').then(games => {
            display(games);
        });
        document.getElementById("amountOfPlayers").addEventListener('change', filterByPlayerAmount);
        document.querySelector("table").addEventListener("click", selectGame);
        document.getElementById("searchID").addEventListener("click", filterById);
}

function emptyTable() {
    document.querySelectorAll(".nonHeader").forEach(row => {
        row.remove();
    });
}

function noGames() {
    document.querySelector("table").insertAdjacentHTML("beforeend", `<tr class="nonHeader">
                                                                        <td colspan="2">No games available</td>
                                                                        </tr>`);
}


function display(games) {
    emptyTable();
    if (games.length === 0) {
        noGames();
    }
    else {
        games.forEach(game => {
            document.querySelector("tr").insertAdjacentHTML("afterend", `<tr class="nonHeader">
                                                                            <td>${game.id}</td>
                                                                            <td>${game.numberOfPlayers}</td>
                                                                        </tr>`);
        });
    }
}

function filterById() {
    emptyTable();
    const gameId = document.getElementById("code").value;
    fetchFromServer(`/games?prefix=${_config.gamePrefix}`,'GET').then(games => {
        games.forEach(game => {
            if (game.id === gameId) {
                document.querySelector("table").insertAdjacentHTML('beforeend', ` <tr class="nonHeader">
                                                                                        <td>${game.id}</td>
                                                                                        <td>${game.numberOfPlayers}</td>
                                                                                    </tr>`);
            } 
        });
        if (document.querySelector("table").rows.length === 1) {
            noGames();
        }
        if (gameId === "") {
            display(games);
        }
    });
}


function filterByPlayerAmount() {
    const amountOfPlayers = document.getElementById("amountOfPlayers").value;
    fetchFromServer(`/games?prefix=${_config.gamePrefix}&numberOfPlayers=${amountOfPlayers}`,'GET').then(games => {
        display(games);
    });
}


function selectGame(e) {
    document.querySelectorAll("tr").forEach(row => {
        if (row.classList.contains("selected")) {
            row.classList.remove("selected");
        } 
    });
    e.target.closest("tr").classList.add("selected");
    const button = document.getElementById("join");
    button.disabled = false;
}