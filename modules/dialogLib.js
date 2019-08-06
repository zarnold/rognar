/**
 *
 * @module dialogLib.js
 * A Lib for managing Speech
 */

"use strict";

// Code change to make method private but without sharing the scope 
// Use immediately invocated function

let Writer = (function () {

    // Convention is to use a lodash for private method
    // Expect the loading function to be asynchronous     
    const _loadDialogTree = async function (pathToData) {
        try {
            let res = await fetch(pathToData);
            let data =await  res.json();
            return data;

        } catch (error) {
            // Whatever the error, return  something null
            return null;
        }
    };



    class Writer {

        constructor(dialogWindowId) {
            let target = document.getElementById(dialogWindowId);

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
                console.error("The dialog Window Id you provided is not available");
            }
        }


        update(speech, choices) {


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
            newContent = document.createTextNode(speech);
            hdr.appendChild(newContent);

            chc = this.target.querySelector("#player-choice");

            // Add an li for each options
            choices.forEach(function (el) {
                let l = document.createElement('li');
                newContent = document.createTextNode(el);
                l.appendChild(newContent);
                chc.appendChild(l);
            });

        }

        async runNewDialog(pathToDialogTree) {

            // Reset 
            this.alreadyReadChoices = [];

            // Load the dialogue tree
            this.dialogTree = await _loadDialogTree(pathToDialogTree);
            //Set the interface to the first talk

            if (this.dialogTree) {
                let t = this.dialogTree["talks"];

                // Get the first one
                let firstText = t[Object.keys(t)[0]];
                // Display it
                this.update(firstText.text, firstText.answer.map( el=>el.reply ));
            };

            // Once done, return with a code 
            // This code must indicate the issue of the dialog
            return 0;
        }


    }


    return Writer;
})();

export default Writer;