"use strict";

import Writer from "./modules/dialogLib.js";
import Scenery from "./modules/Scenery.js";


let Homer = new Writer("dialog-window");
let level_1 = new Scenery("scene");

level_1.scene = "./img/backgrounds/room/lba-room.jpg";

let tree = [
    {
        speech : "Show me your favorite stance", 
        choices : ["Use di dance", "rub a dub", "Give him the tempo"]
    },
    {
        speech : "I'm on the rock", 
        choices : ["I check a stock", "I'm on the run"]
    },
    {
        speech : "When she walks", 
        choices : ["She's like a samba", "she swings so cool", "She sways so gentle","Each one she passes goes Ha","She looks straight ahead"]
    },
    {
        speech : "Se você disser que eu desafino", 
        choices : ["Saiba que isso em mim provoca imensa dor", "Se você insisted em classificar"]
    }
]

var i = 0;

function newText() {
    Homer.update(tree[i]["speech"], tree[i]["choices"]);

    if( i < tree.length) {
        i++;
        setTimeout(newText, 2000);
    }
}

newText();



