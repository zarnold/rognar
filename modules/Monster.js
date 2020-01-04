/** 
 * @module Monster
 * Class for monsters
*/

"use strict";

import Character from "./characSprite.js";
import game from "./Game.js";
// You should pass an element to the monster so it can
// display its attributes

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
                value: 0,
            },
            "WEARINESS": {
                displayText: "Weariness",
                value: 0,
            },
        };

        const target = document.getElementById(targetEl);

        if (target) {
            this.displayItem = target;
            this.displayItem.setAttribute("id", "creature-skills");
            //Use the semantic Description List tag
            let skillList = document.createElement("ul");
            skillList.classList.add("skill-list");

            for (const [key, emotion] of Object.entries(this._emotionsScore)) {

                if (!Object.is(emotion.displayText, undefined)) {
                    let skill = document.createElement("li");

                    let skillName = document.createElement("label");
                    skillName.setAttribute("for", `${emotion.displayText}-meter`);
                    skillName.appendChild(document.createTextNode(emotion.displayText));

                    let skillValue = document.createElement("span");
                    skillValue.innerHTML = emotion.value;


                    let skillMeter = document.createElement("meter");
                    skillMeter.value = emotion.value;
                    skillMeter.min = -10;
                    skillMeter.max = 10;
                    skillMeter.low = -8;
                    skillMeter.high = 8;
                    skillMeter.optimum = 0;


                    skillName.classList.add("skill-name");
                    skillMeter.classList.add("skill-meter");

                    skill.appendChild(skillName);
                    skill.appendChild(skillValue);
                    skill.appendChild(skillMeter);

                    skillList.appendChild(skill);

                    // lonk the html element to set it later
                    emotion["meter"] = skillMeter;
                    emotion["displayValue"] = skillValue;
                }
            }

            this.displayItem.appendChild(skillList);

        }
        else {
            this.displayItem = null;
        }
    }

    registerGame() {
        this.game = game.getInstance();
    }
    
    assignPortrait(portraitName) {
        this.portrait = new Character("character-card", portraitName);
        this.portrait.mood = "NORMAL";
        this.portrait.focus = "right";
        this.portrait.show();
    }

    _setEmotion(emotion, value) {
        // TODO :alert if an emotion reach its threshold
        const newValue = value < -10 ? -10 :
                         value > 10 ? 10 :
                         value;

        this._emotionsScore[emotion].value = newValue;
        this._emotionsScore[emotion].meter.value = newValue;
        this._emotionsScore[emotion].displayValue.innerHTML = newValue;


    }
    // A wrapper from setter to emotion name
    set fear(newValue) {
        this._setEmotion("FEAR",newValue)
    }
    get fear() {
        return this._emotionsScore["FEAR"].value;
    }
    set anger(newValue) {
        this._setEmotion("ANGER",newValue)
        if ( this._emotionsScore["ANGER"].value > 2 ) {
            this.game.scenery.nigthScope();
        }
    }
    get anger() {
        return this._emotionsScore["ANGER"].value;
    }
    set despair(newValue) {
        this._setEmotion("DESPAIR",newValue)
    }
    get despair() {
        return this._emotionsScore["DESPAIR"].value;
    }
    set sadness(newValue) {
        this._setEmotion("SADNESS",newValue)
    }
    get sadness() {
        return this._emotionsScore["SADNESS"].value;
    }
    set shame(newValue) {
        this._setEmotion("SHAME",newValue)
    }
    get shame() {
        return this._emotionsScore["SHAME"].value;
    }
    set weariness(newValue) {
        this._setEmotion("WEARINESS",newValue)
    }
    get weariness() {
        return this._emotionsScore["WEARINESS"].value;
    }




}