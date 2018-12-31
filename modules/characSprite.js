/**
 *
 * @module characSprite
 * A Lib for managing Speech
 */

'use strict';
import Tracer from './debug.js';

export const portraitSize = 250;

export const moodValues = {
    "NORMAL": 0,
    "ANGRY": 1,
    "FRIGHTENED": 2,
    "DIZZY": 3
}


export default class Character {

    constructor(targetEl, characClass = 'diver') {
        this.dbg = new Tracer("Character");
        this.dbg.unmute();
        this.dbg.info(`Loading New Character`);
        this.character = characClass;



        let parent = document.getElementById(targetEl);

        if (parent) {
            this.parent = parent;
            this.parent.classList.add('portrait');
            this.parent.style.backgroundPosition = " 0px 0px";
            this.parent.style.backgroundImage = `url("../img/sprites/characters/${characClass}.png")`;
        }
        else {
            this.dbg.error("No element exist for sprite placement");
            this.parent = null;
        }

        this.mood=moodValues["NORMAL"];
    }

    set mood(newMood) {
        let offset = -1 * portraitSize * newMood;
        this.parent.style.backgroundPosition = `${offset}px 0px`;
    }
    

}
