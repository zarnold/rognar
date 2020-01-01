"use strict";

import Writer from "./modules/Writer.js";
import Scenery from "./modules/Scenery.js";
import Monster from "./modules/Monster.js";
import Tracer from "./modules/debug.js";



let logger = new Tracer("main");

// Set up a new party : example
// TODO : load this from a config file
// Assign a writer for the game
let Homer = new Writer("dialog-window");

// Assign a scenery and set it up
let level_1 = new Scenery("scene");
level_1.scene = "./img/backgrounds/room/lba-room.jpg";

// Put the opponent
let opponent = new Monster();
opponent.assignPortrait("child_1");


// And now launch a daialog that resolve  the promise
// Could have been an await too
Homer
    .runNewDialog("../data/story_1.json")
    .then(function (dialogResult) {
        // Do something with your dialog result
        if(dialogResult == "VICTORY") {
            Homer.update({text:"You won"}); 
        } else {
            Homer.update({text:"Game done"}); 
        }
    })
    .catch(function (error) {
        Homer.update({text:"Some error happened while running this dialog tree"});
        logger.display(error);
    })
