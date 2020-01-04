/**
 *
 * @module dialogLib.js
 * A Lib for managing Speech
 */


// TODO
// Add a rewind method
// Add a restart method
// Add a history log

"use strict";
import game from "./Game.js";
import Tracer from "./debug.js";

// Code change to make method private but without sharing the scope 
// Use immediately invocated function

let Writer = (function () {

    // Convention is to use a lodash for private method
    // Expect the loading function to be asynchronous     
    const _loadDialogTree = async function (pathToData) {
        try {
            let res = await fetch(pathToData);
            let data = await res.json();
            return data;

        } catch (error) {
            // Whatever the error, return  something null
            return null;
        }
    };



    class Writer {

        constructor(dialogWindowId) {
            let target = document.getElementById(dialogWindowId);

            this.dbg = new Tracer("Writer");
            this.dbg.unmute();
            this.dbg.info("Setting up new Writer");
            
            this.game = {};
            // Properties 

            this.dialogTree = {};
            this.alreadyReadChoices = [];
            this.currentTalk = {};


            if (target) {
                this.target = target;

                this.target.classList.add("ff7");

                //Header with creature speech
                let creatureSpeechContainer = document.createElement("h2");
                creatureSpeechContainer.setAttribute("id", "creature-speech");
                this.target.appendChild(creatureSpeechContainer);

                // The list of choice
                let playerChoiceContainer = document.createElement("ul");
                playerChoiceContainer.setAttribute("id", "player-choice");
                this.target.appendChild(playerChoiceContainer);

            } else {
                this.dbg.error("The dialog Window Id you provided is not available");
            }
        }


        _applyEffectToOpponent() {

            // A very simple  atm
            if(this.game) {
                this.game.opponent.anger+=2;
            }
        }
        
        registerGame() {
            this.game = game.getInstance();
        }
        
        update(dialogue) {

            // FIXME : we use an event system but this could/ should have been a callback

            // If dialog is done, resume
            if (dialogue.hasOwnProperty("outcome")) {
                this.endOfDialogEvent.result = dialogue["outcome"];
                this.target.dispatchEvent(this.endOfDialogEvent);
                return;
            }


            // Get the Creature speech element and the player choice list
            let hdr = this.target.querySelector("#creature-speech");
            let chc = this.target.querySelector("#player-choice");
            let newContent;

            // First empty them
            // faster way seems to clone the node without cloning its children

            let cNode;
            cNode = hdr.cloneNode(false);
            hdr.parentNode.replaceChild(cNode, hdr);
            cNode = chc.cloneNode(false);
            chc.parentNode.replaceChild(cNode, chc);


            // Then add the speech
            // do not forget to get the reference again as it has changed when cloning
            hdr = this.target.querySelector("#creature-speech");
            newContent = document.createTextNode(dialogue.text);
            hdr.appendChild(newContent);

            chc = this.target.querySelector("#player-choice");

            // Add an li for each options
            this.dbg.display(dialogue, "Currently loaded dialogue");

            if (dialogue.answer)
                dialogue.answer.forEach(function (el) {
                    // create as many list item as choice
                    let l = document.createElement('li');
                    l.classList.add("player-choice");
                    // Create a text node with the reply text
                    newContent = document.createTextNode(el.reply);

                    // add a click listener on the answer 
                    // where you bind the target
                    // do not forget to pass the instance

                    l.addEventListener("click", function (target, referenceToElement) {
                        let destination = this.dialogTree["talks"][target];

                        // Apply effect
                        this._applyEffectToOpponent();
                        // Clean your mess
                        // especially the listener cause it can be
                        // perfmonging

                        referenceToElement.parentNode.removeChild(referenceToElement);
                        if (destination) {
                            this.update(destination);
                        } else {
                            console.error("The expected target does not exists");
                        }


                    }.bind(this, el.target, l));

                    // and add it to the list item
                    l.appendChild(newContent);
                    // which is then add to the #player-choice element
                    chc.appendChild(l);
                }.bind(this));

        }


        async runNewDialog(pathToDialogTree) {

            this.dbg.info(`New dialog : ${pathToDialogTree}`)
            // setup a new event for end of this dialogue         
            this.endOfDialogEvent = new CustomEvent("outcome");

            // And then create a local promise that will resolve when event end of dialogue fired
            // Problem with that is that a listener is created each time a new dialog is ran 
            const dialogueIsDone = function () {
                let listeningElement = this.target;

                return new Promise(function (resolve) {
                    listeningElement.addEventListener("outcome", el => resolve(el.result), false);
                });

            }.bind(this);


            // Reset 
            this.alreadyReadChoices = [];

            // Load the dialogue tree
            this.dialogTree = await _loadDialogTree(pathToDialogTree);
            //Set the interface to the first talk

            if (this.dialogTree) {
                let t = this.dialogTree["talks"];

                // Use a start key because
                // you 're never sure of the order of the key
                let firstText;
                if (t.hasOwnProperty("START"))
                    firstText = t["START"];
                else
                    console.error("There is no place for starting this dialogue");

                // Display it
                this.update(firstText);
            };

            // Once done, return with a code or an object
            // This code must indicate the outcome of the dialog

            let res = await dialogueIsDone();

            // clean your mess
            var myNode = document.getElementById("player-choice");
            myNode.innerHTML = "";
            myNode = document.getElementById("creature-speech");
            myNode.innerHTML = "";

            return res;
        }


    }


    return Writer;
})();

export default Writer;