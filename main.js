"use strict";
import Tracer from "./modules/debug.js";
import Writer from "./modules/dialogLib.js";
import Character from "./modules/characSprite.js";
import { portraitSize,moodValues } from  "./modules/characSprite.js";

var mainDbg = new Tracer("main");
mainDbg.unmute();
mainDbg.info("Starting");
mainDbg.info(`Portrait size is ${portraitSize}px`);
mainDbg.info(moodValues.NORMAL);
async function play(writer) {
    await writer.load("./data/dialog_1.json");
    let nextStatus = await writer.playSpeech();
    mainDbg.display(nextStatus, "All script played. Done and change to this new status");
    
}


// Test Dialog Tree
var Achille = new Writer("speechBox", "Achille");
play(Achille);


/// Test Sprite Class
var diverSprite = new Character("character-card", "diver");

diverSprite.mood=moodValues["NORMAL"];
window.setTimeout(function() {
    diverSprite.mood=moodValues["ANGRY"];
    window.setTimeout(function() {
        diverSprite.mood=moodValues["FRIGHTENED"];
        window.setTimeout(function() {
            diverSprite.mood=moodValues["DIZZY"];
        }, 500);
    }, 500);
}, 500);