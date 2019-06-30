/**
 *
 * @module Scenery
 * Manage scene 
 */

"use strict";
import Tracer from "./debug.js";

export default class Scenery {

    constructor(targetEl) {
        const defaultScenery=("./img/backgrounds/default.png");
        this.dbg = new Tracer("Background");
        this.dbg.unmute();
        this.dbg.info("Creating a new background");


        let parent = document.getElementById(targetEl);

        if (parent) {
            this.parent = parent;
            this.parent.classList.add("scenery");
            this.parent.style.backgroundPosition = " 0px 0px";

            this.scene=defaultScenery;            
            this.parent.style.background = `no-repeat url("${defaultScenery}"), black`;
            this.parent.style.backgroundPosition = "center";
            this.parent.style.backgroundSize = "contain";
        }
        else {
            this.dbg.error("No element exist for sprite placement");
            this.parent = null;
        }

    }

    set scene(url) {
        this.dbg.info("Set another background");        
        this.parent.style.background = `no-repeat url("${url}"), black`;
        this.parent.style.backgroundPosition = "center";        
        this.parent.style.backgroundSize = "contain";
    }



}
