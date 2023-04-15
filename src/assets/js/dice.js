"use strict";


function initDice() {
    const dice = document.querySelector("#diceIcon"); 
    dice.addEventListener("click", getResult);

}



function throwDices(rollDice1, rollDice2) {
    const angleArray = [[35,357,319],[209,360,136],[114,335,86],[306,24,93],[306,30,359],[306,210,178]];
    const angleArray2 = [[235,207,142],[229,21,137],[142,159,73],[3,91,32],[288,102,23],[154,257,18]];
    animation("#dice", angleArray, rollDice1);
    animation("#dice2", angleArray2, rollDice2);
    
}


function animation(die, cor, roll) {
    const dice = document.querySelector(die);
    dice.style.animation = "animate 1s linear";
    dice.style.transform = rotate(roll, cor);
    dice.style.transition = "1s linear";
    
}


function rotate(dice, cor) {
    const randomFace = dice;
    return "rotateX("+cor[randomFace - 1][0]+"deg) rotateY("+cor[randomFace - 1][1]+"deg) rotateZ("+cor[randomFace - 1][2]+"deg)";
}



function disableClick() {
    document.querySelector("#diceIcon").disabled = true;
}

function getResult() {
    const gameID = localStorage.getItem("gameID");
    const username = localStorage.getItem("username");
    fetchFromServer(`/games/${gameID}/players/${username}/dice`, "POST").then(game => {
        if(game.currentPlayer === username) {
            throwDices(game.lastDiceRoll[0], game.lastDiceRoll[1]);
            seeDice();
            hideDiceAfterRoll();
        }
        if(game.currentPlayer !== username){
            disableClick();
        }
    });
}

function seeDice () {
    const dice = document.querySelector("#container")
    dice.style.overflowX = "visible";
}

function hideDiceAfterRoll () {
   setTimeout(timeout, 2250);
}

function timeout() {
    const dice = document.querySelector("#container")
    dice.style.overflowX = "hidden";
}