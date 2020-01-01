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
let opponent = new Monster("status-list");
opponent.assignPortrait("child_1");

// Test, set some attributes
opponent.fear =1;
opponent.anger = 2;
opponent.despair=3;
opponent.sadness=3;
// Note that it works this <ay too thx to getter / setter
opponent.shame +=2;

// And now launch a daialog that resolve  the promise
// Could have been an await too
Homer
    .runNewDialog("../data/story_1.json")
    .then(function (dialogResult) {
        // Do something with your dialog result
        if(dialogResult == "VICTORY") {
            Homer.update({text:"You won"}); 
            opponent.despair=-9;
            opponent.sadness=-9;
        } else {
            Homer.update({text:"Game done"}); 
            opponent.despair=-9;
        }
    })
    .catch(function (error) {
        Homer.update({text:"Some error happened while running this dialog tree"});
        logger.display(error);
    });
