"use strict";

import Writer from "./modules/dialogLib.js";
import Scenery from "./modules/Scenery.js";
import Character from "./modules/characSprite.js";

let Homer = new Writer("dialog-window");
let level_1 = new Scenery("scene");

level_1.scene = "./img/backgrounds/room/lba-room.jpg";

let Lba = new Character("character-card","lba"); 


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

async function play() {
    await Homer.runNewDialog("../data/dialog_1.json");
    console.log("Homer dialog tree is");
    console.dir(Homer.dialogTree);

}

play();
