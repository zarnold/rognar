/**
 *
 * @module characSprite
 * A Lib for managing Speech
 */

"use strict";
import Tracer from "./debug.js";


// NOTE : this should be in a json configuration file prolly

export const portraitWidth = 335;
export const portraitHeight = 310;

export const moodValues = {
    "NORMAL": 0,
    "SAD": 1,
    "DIZZY": 2,
    "ANGRY": 3
};


export default class Character {

    constructor(targetEl, characClass = "diver") {
        this.dbg = new Tracer("Character");
        this.dbg.unmute();
        this.dbg.info("Loading New Character");
        this.character = characClass;


        let parent = document.getElementById(targetEl);

        if (parent) {
            this.parent = parent;
            this.parent.classList.add("portrait");
            this.parent.style.backgroundPosition = " 0px 0px";
            this.parent.style.width=`${portraitWidth}px`;
            this.parent.style.height=`${portraitHeight}px`;
            this.parent.style.marginLeft="auto";
            this.parent.style.marginRight="0px";
            this.parent.style.backgroundImage = `url("../img/sprites/characters/${characClass}.png")`;
            this.parent.style.transform="scaleX(1)";
        }
        else {
            this.dbg.error("No element exist for sprite placement");
            this.parent = null;
        }

        this.mood = "NORMAL";        
        this.focus="right";
    }

    set mood(newMood) {
        let moodIdx = moodValues[newMood];

        if (!moodIdx) moodIdx=0;
        
        let offset = -1 * portraitWidth * moodIdx;
        this.parent.style.backgroundPosition = `${offset}px 0px`;
    }

    /**
     * this setter put the portrait on right or left
     *
     * @memberof Character
     */
    set focus(side)
    {
        if(side==="left") {
            this.parent.style.transform="scaleX(-1)";
            this.parent.style.marginRight="auto";
            this.parent.style.marginLeft="0px";
        } else {
            this.parent.style.transform="scaleX(1)";
            this.parent.style.marginLeft="auto";
            this.parent.style.marginRight="0px";
        }
    }

    hide() {
        this.parent.style.display="none";
    }

    show() {
        this.parent.style.display="block";        
    }

}
