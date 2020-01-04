"use strict";

import Writer from "./modules/Writer.js";
import Scenery from "./modules/Scenery.js";
import Monster from "./modules/Monster.js";
import game from "./modules/Game.js";
import Tracer from "./modules/debug.js";



let logger = new Tracer("main");


// Kinda mediator pattern 
// where currentGame serve as a common shared State
// it works but it forces developper to register his/her game
// and it creates a strong coupling because each modules
// Must implement a registerGame method

const currentGame = game.createInstance({
    dialog: new Writer("dialog-window"),
    scenery: new Scenery("scene"),
    opponent: new Monster("monster-1"),
});

currentGame.dialog.registerGame();
currentGame.scenery.registerGame();
currentGame.opponent.registerGame();
currentGame.scenery.scene = "./img/backgrounds/room/lba-room.jpg";
currentGame.opponent.assignPortrait("child_1");

// And now launch a daialog that resolve  the promise
// Could have been an await too
currentGame.dialog
    .runNewDialog("../data/story_1.json")
    .then(function (dialogResult) {
        // Do something with your dialog result
        if(dialogResult == "VICTORY") {
            currentGame.dialog.update({text:"You won"}); 
        } else {
            currentGame.dialog.update({text:"Game done"}); 
        }
    })
    .catch(function (error) {
        currentGame.dialog.update({text:"Some error happened while running this dialog tree"});
        logger.display(error);
    });
