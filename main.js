'use strict';
import Tracer from './modules/debug.js';
import Writer from './modules/dialogLib.js';


var mainDbg = new Tracer('main');
mainDbg.unmute();
mainDbg.info("Starting");

var Achille = new Writer('Achille');