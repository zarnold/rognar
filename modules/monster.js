/** 
 * @module Monster
 * Class for monsters
*/

"use strict";

import Character from "./characSprite.js";


export default class Monster {
    constructor() {
        this.portrait = {} ;
        this.emotionsScore = {
            "FEAR":0,
            "ANGER":0,
            "DESPAIR":0,
            "SADNESS":0,
            "SHAME":0
        }
    }

    assignPortrait(portraitName) {
        this.portrait = new Character("character-card",portraitName); 
        this.portrait.mood = "ANGRY";
        this.portrait.focus = "right";
        this.portrait.show();
    }


}