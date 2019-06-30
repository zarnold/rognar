"use strict";

import Writer from "./modules/dialogLib.js";
import Scenery from "./modules/Scenery.js";


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

function newText() {
    Homer.update(tree[i]["speech"], tree[i]["choices"]);

    if( i < tree.length) {
        i++;
        setTimeout(newText, 2000);

        if(i==1) level_1.nigthScope();
        if(i==2) level_1.hallucination();
        if(i==3) level_1.removeEffect();
    }
}

newText();



