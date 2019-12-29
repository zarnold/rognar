"use strict";

import Writer from "./modules/dialogLib.js";
import Scenery from "./modules/Scenery.js";
import Monster from "./modules/Monster.js";


let Homer = new Writer("dialog-window");
let level_1 = new Scenery("scene");

level_1.scene = "./img/backgrounds/room/lba-room.jpg";



document.onkeypress = function (e) {
    e = e || window.event;
   
    if (e.key==="q") level_1.nigthScope();
    if (e.key==="s") level_1.hallucination();
    if (e.key==="d") level_1.removeEffect();

};

async function play() {
    let dialogueResult = await Homer.runNewDialog("../data/story_1.json");

    if(dialogueResult == "GAGNE") {

        level_1.nigthScope();
        Homer.update({"text":"Bravo ! Vous vous êtes fait un nouvel ami"});
    }

    if(dialogueResult == "PERDU") {

        level_1.hallucination();
        Homer.update({"text":"Oh non ! Vous vous êtes fait un ennemi."});
    }

    if(dialogueResult == "NEUTRE") {

        level_1.hallucination();
        Homer.update({"text":"Vous ne le reverrez sans doute plus jamais."});
    }
    // Load another dialog
/*
    level_1.removeEffect();
    console.log("New dialog");
    dialogueResult = await Homer.runNewDialog("../data/dialog_2.json");

    if(dialogueResult == "VICTORY") {

        level_1.nigthScope();
        Homer.update({"text":"Bravo ! Vous vous êtes fait un nouvel ami"});
    }

    if(dialogueResult == "DEATH") {

        level_1.hallucination();
        Homer.update({"text":"Oh non ! Vous vous êtes fait un ennemi."});
    }
    */

}

let opponent = new Monster(); 
opponent.assignPortrait("child_1");


document.onkeypress = function (e) {
    e = e || window.event;
   
    if (e.key==="a") opponent.portrait.mood = "NORMAL";
    if (e.key==="z") opponent.portrait.mood = "SAD";
    if (e.key==="e") opponent.portrait.mood = "DIZZY";
    if (e.key==="r") opponent.portrait.mood = "ANGRY";


};


play();qQ