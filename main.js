'use strict';
import Tracer from './modules/debug.js';
import Writer from './modules/dialogLib.js';


var mainDbg = new Tracer('main');
mainDbg.unmute();
mainDbg.info("Starting");

async function play(writer) {
    await writer.load("./data/dialog_1.json");
    let nextStatus = await writer.playSpeech();
    mainDbg.display(nextStatus, "All script played. Done and change to this new status")
    
};

var Achille = new Writer("speechBox", "Achille");
play(Achille);
