/**
 *
 * @module dialogLib.js
 * A Lib for managing Dialogs
 */

'use strict';
import Tracer from './debug.js';

export default class Writer {

    constructor(src="./data/default.json") {
       this.dbg = new Tracer("Writer");

       this.dbg.unmute();
       this.dbg.info(`Starting a new Writer ( ${src} ) `)
    };


}
