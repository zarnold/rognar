/** 
 * @module Game
 * A prodvider
 * of game instance to each
 * object
*/

"use strict";

var currentGame;

class Game {
    constructor (params) {
        const {dialog, scenery, opponent} = params;
        this.dialog = dialog;
        this.scenery = scenery;
        this.opponent =opponent;

        this.varTest = 3;
    }
}
 
function createInstance(params) {
    if (!currentGame) {
        currentGame = new Game(params);
    }
    
    return currentGame;
}

function getInstance() {
    return currentGame;
}


export default {
    createInstance:  createInstance,
    getInstance: getInstance
};