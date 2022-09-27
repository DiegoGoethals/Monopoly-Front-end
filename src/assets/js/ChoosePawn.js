"use strict";


function initChoosePawn() {
    document.querySelectorAll(".pawnClick").forEach(pawn => pawn.addEventListener("click", selectPawn));
    const $joinButton = document.querySelector('input[value="Join"]');
    $joinButton.addEventListener('click', saveToLocalStorage);
}

function selectPawn(e){
    e.preventDefault();
    const image = document.querySelectorAll(".pawnClick");
    image.forEach(function (a)
    {
        if (a.classList.contains("selected")) {
            a.classList.remove("selected");
        }
    });
    e.target.closest("a").classList.add("selected");
    const button = document.getElementById("join");
    button.disabled = false;
}

function saveToLocalStorage(){
    const pawn = document.querySelector(".selected").id;
    localStorage.setItem("pawn", `${pawn}`);
}

