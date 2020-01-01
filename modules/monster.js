/** 
 * @module Monster
 * Class for monsters
*/

"use strict";

import Character from "./characSprite.js";

// You should pass an element to the monster so it can
// displauy it charac
export default class Monster {
    constructor(targetEl) {
        this.portrait = {};

        // TODO add i18n
        // TODO : let custom the emotions/ skills
        this._emotionsScore = {
            "FEAR": {
                displayText: "Fear",
                value: 0,
            },
            "ANGER": {
                displayText: "Anger",
                value: 0,
            },
            "DESPAIR": {
                displayText: "Despair",
                value: 0,
            },
            "SADNESS": {
                displayText: "Sadness",
                value: 0,
            },
            "SHAME": {
                displayText: "Shame",
                value: 7,
            },
            "WEARINESS": {
                displayText: "Weariness",
                value: 0,
            },
        };


        const target = document.getElementById(targetEl);

        if (target) {
            this.displayItem = target;

            //Use the semantic Description List tag
            let skillList = document.createElement("dl");
            skillList.setAttribute("id", "creature-speech");

            for (const [key, emotion] of Object.entries(this._emotionsScore)) {

                if (!Object.is(emotion.displayText, undefined)) {
                    let term = document.createElement("dt");
                    let termName = document.createTextNode(emotion.displayText);
                    term.appendChild(termName);


                    let termDefinition = document.createElement("dd");
                    let termDefinitionValue = document.createTextNode(Object.is(emotion.value, undefined) ? 0 : emotion.value);
                    termDefinition.appendChild(termDefinitionValue);

                    skillList.appendChild(term);
                    skillList.appendChild(termDefinition);
                }
            }

            this.displayItem.appendChild(skillList);

        }
        else {
            this.displayItem = null;
        }
    }

    assignPortrait(portraitName) {
        this.portrait = new Character("character-card", portraitName);
        this.portrait.mood = "NORMAL";
        this.portrait.focus = "right";
        this.portrait.show();
    }


}