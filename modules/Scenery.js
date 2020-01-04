/**
 *
 * @module Scenery
 * Manage scene 
 */

"use strict";
import Tracer from "./debug.js";
import game from "./Game.js";

export default class Scenery {

    constructor(targetEl) {
        const defaultScenery=("./img/backgrounds/default.png");
         
        this.dbg = new Tracer("Background");
        this.dbg.unmute();
        this.dbg.info("Creating a new background");
            
        this.game = {};

        let parent = document.getElementById(targetEl);

        if (parent) {
            this.parent = parent;
            this.parent.classList.add("scenery");
            this.parent.style.backgroundPosition = " 0px 0px";


            this.parent.style.background = `no-repeat url("${defaultScenery}"), black`;
            this.parent.style.backgroundPosition = "center";
            this.parent.style.backgroundSize = "contain";

            this._scene=defaultScenery;   
        }
        else {
            this.dbg.error("No element exist for sprite placement");
            this.parent = null;

            this._scene="";   
        }

    }

    set scene(url) {
        this.dbg.info("Set another background");        
        this.parent.style.background = `no-repeat url("${url}"), black`;
        this.parent.style.backgroundPosition = "center";        
        this.parent.style.backgroundSize = "contain";
        this._scene = url;
        
    }

    get scene() {
        return this._scene;
    }


    registerGame() {
        this.game = game.getInstance();
    }
        

    removeEffect() {
        this.dbg.info("remove all effects");        
        this.parent.style.background = `no-repeat url("${this.scene}"), black`;
        this.parent.style.backgroundPosition = "center";        
        this.parent.style.backgroundSize = "contain";        
        this.parent.style.backgroundBlendMode = "normal";
    }

    nigthScope() {

        this.dbg.info("maek background Dizzy");        
        this.parent.style.background = `no-repeat url("${this.scene}"),   
        radial-gradient(
            rgba(0,255,0,.8),
            black
        ),
        repeating-linear-gradient(
            transparent 0,
            rgba(0,0,0,.2) 3px,
            transparent 6px
        )`;
        this.parent.style.backgroundPosition = "center";        
        this.parent.style.backgroundSize = "contain";        
        this.parent.style.backgroundBlendMode = "overlay";
    }

    hallucination() {
        this.parent.style.background=`no-repeat url("${this.scene}"),no-repeat url("${this.scene}"),no-repeat url("${this.scene}"),no-repeat url("${this.scene}"),no-repeat url("${this.scene}"),no-repeat url("${this.scene}")`;
        this.parent.style.backgroundSize = "200%, 80%, 60%, 50%, 40%, 100%";
        this.parent.style.backgroundPosition = "50%, 80%, 30%, 0";
        this.parent.style.backgroundBlendMode= "overlay";
        this.parent.style.backgroundRepeat = "no-repeat";
    }

}
