import { set_animation, reset_pos } from "./script2.js";

const returnpos_icon = document.getElementById("optsbar-returnpos");
const animate_icon = document.getElementById("optsbar-animate");
const pause_icon = document.getElementById("optsbar-pause");

returnpos_icon.addEventListener("click", () => {
    reset_pos();
});

animate_icon.addEventListener("click", () => {
    set_animation(true);
});

pause_icon.addEventListener("click", () => {
    set_animation(false);
});











const selectionlist_btn = document.querySelector(".selectionlist-btn");
const gobackbar_btn = document.querySelector(".gobackbar-btn");
const selection = document.querySelector(".selection");
const selectionlist = document.querySelector(".selectionlist");

selectionlist_btn.addEventListener("click", () => {
   
    selection.classList.add("selection-viewlist");
    selectionlist.classList.add("selectionlist-active");
    
    setTimeout(() => {
        gobackbar_btn.classList.add("gobackbar-btn-active");
        gobackbar_btn.classList.remove("goback-transdel-active");
    }, 750);
});

gobackbar_btn.addEventListener("click", () => {
    gobackbar_btn.classList.remove("gobackbar-btn-active");
    selection.classList.remove("selection-viewlist");
    selectionlist.classList.remove("selectionlist-active");
   
    setTimeout(() => {
        gobackbar_btn.classList.add("goback-transdel-active");
    }, 750);
    
});