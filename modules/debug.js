/**
 *
 * @module debug.js
 * A Class for logging and debugging
 */
const DEBUG_MODE = true;

export default class Tracer {

    constructor(name = "anonymous") {
        this.name = name;
        this.active=false;
    }


    mute() {
        this.active = false;
    }

    unmute() {
        this.active = true;
    }

    info(msg) {
        if (!DEBUG_MODE) return;
        if(!this.active) return;
        console.log(`${this.name} : ${msg}`

        );
    }

    error(msg) {
        if (!DEBUG_MODE) return;
        if(!this.active) return;
        console.error(`${this.name} : ${msg}`

        );
    }

    display(obj,msg="") {
        if (!DEBUG_MODE) return;
        if(!this.active) return;
        console.log(`*******************************   ${this.name}`);
        console.log(`** ${msg}`);
        console.dir(obj);
    }
}
