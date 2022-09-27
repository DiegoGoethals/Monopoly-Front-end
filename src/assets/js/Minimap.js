"use strict";


function initMinimap() {
  document.getElementById("imgClick").addEventListener("click", resize);
}

function resize() {
  const image = document.getElementById("imgClick");
  const tile = document.querySelector(".board");
  if (image.classList.contains("minimap")) {
    image.classList.remove("minimap");
    image.classList.add("minimapenlarge");
    tile.style.display = "none";

  } else {
    image.classList.remove("minimapenlarge");
    image.classList.add("minimap");
    tile.style.display = "flex";
    }
}


