"use strict";


function initSidebar() {
    document.querySelector("img").addEventListener("click", openNav);
    document.querySelector(".close").addEventListener("click", closeNav);
}

function openNav() {
    document.querySelector(".sidebar").style.width = "14rem";
    document.querySelector("#sidebarIcon").style.marginLeft = "14rem";
  }
  
  function closeNav() {
    document.querySelector(".sidebar").style.width = "0";
    document.querySelector("#sidebarIcon").style.marginLeft= "0";
  }

