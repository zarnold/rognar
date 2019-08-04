"use strict";

import Writer from "./modules/dialogLib.js";
import Scenery from "./modules/Scenery.js";
import Character from "./modules/characSprite.js";

let Homer = new Writer("dialog-window");
let level_1 = new Scenery("scene");

level_1.scene = "./img/backgrounds/room/lba-room.jpg";

let tree = [
    {
        speech : "The background with night effects", 
        choices : ["Tell something", "tell another thing", "dont tell anything"]
    },
    {
        speech : "Hallucination ensue !", 
        choices : ["Oh my g**", "I'm on the run"]
    },
    {
        speech : "Ouf evrything is back to normal", 
        choices : ["Make a prayer", "scream", "Ask for help","Roll  over the Floor and laugh","Leave"]
    },
    {
        speech : "Last choice", 
        choices : ["dont do anything", "do anything"]
    }
]

var i = 0;


let Lba = new Character("character-card","lba"); 


function newText() {
    Homer.update(tree[i]["speech"], tree[i]["choices"]);

    if( i < tree.length) {
        i++;
        setTimeout(newText, 2000);
    }
}

newText();

document.onkeypress = function (e) {
    e = e || window.event;
   
    if (e.key==="a") Lba.mood="NORMAL";
    if (e.key==="z") Lba.mood="SAD";
    if (e.key==="e") Lba.mood="ANGRY";
    if (e.key==="r") Lba.mood="DIZZY";

    if (e.key==="q") level_1.nigthScope();
    if (e.key==="s") level_1.hallucination();
    if (e.key==="d") level_1.removeEffect();

    if (e.key==="w") Lba.focus="left";
    if (e.key==="x") Lba.focus="right";


    if (e.key==="b") Lba.hide();
    if (e.key==="n") Lba.show();
};

