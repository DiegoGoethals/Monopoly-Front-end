"use strict";


function initJoinGame() {
    document.querySelector("#join").addEventListener('click', joinGame);
}

function joinGame(e) {
    e.preventDefault();
    const playerName = localStorage.getItem("username");
    const params= {
        "playerName": playerName
    };
    document.querySelectorAll("tr").forEach(row => {
        if (row.classList.contains("selected")) {
            const gameID = row.querySelector("td").innerHTML;
            localStorage.setItem("gameID", gameID);
        }
    });
    const gameID = localStorage.getItem("gameID");
    console.log(gameID);
    fetchFromServer(`/games/${gameID}/players`, 'POST', params).then(gameToken => {
        localStorage.setItem("token", JSON.stringify(gameToken));
        _token = gameToken;
        window.location = "choosePawn.html";
        
    });

   
}
