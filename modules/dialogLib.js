/**
 *
 * @module dialogLib.js
 * A Lib for managing Speech
 */

'use strict';
import Tracer from './debug.js';

export default class Writer {

    // Must use static
    static react() {
        this.next();
    }


    constructor(speechBoxId = "speechBox", name = "Anonymous") {
        this.dbg = new Tracer("Writer");
        this.dbg.unmute();
        this.dbg.info(`Starting a new Writer into ${speechBoxId} `);


        this.HTMLElement = document.querySelector(`#${speechBoxId} > a`);
        this.dbg.display(this.HTMLElement, "Inspecting speech box element");

        this.dialogTree = {
            cursor: 0,
            texts: {}
        };
        this.name = name;
    };



    load(src = "./data/default.json") {

        return new Promise(function(resolve, reject) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', src, true); // Replace 'my_data' with the path to your file
            xobj.onreadystatechange = function() {

                if (xobj.readyState == 4 && xobj.status == "200") {
                    this.dialogTree['texts'] = JSON.parse(xobj.responseText);
                    this.dialogTree.cursor = 0;
                    this.dbg.info("Got my dialog");
                    resolve(xobj.responseText);
                }

                if (xobj.readyState == 4 && xobj.status != "200") {
                    this.dbg.error("Cannot load dialog tree");
                    reject("Error Loading dialog");
                }
            }.bind(this);

            xobj.send(null);

        }.bind(this))
    }


    next() {
        this.dialogTree.cursor += 1;
        if (this.dialogTree['texts'].length >= this.dialogTree.cursor + 1) {
            this.HTMLElement.textContent = this.dialogTree['texts'][this.dialogTree.cursor]['text'];

            //=================================================================
            // tmp. Code a true sprite module
            let diverSprite = document.getElementById('diver-card');
            if (this.dialogTree.cursor == 0)
                diverSprite.style.backgroundPosition = " 0px 0px";
            if (this.dialogTree.cursor == 1)
                diverSprite.style.backgroundPosition = " -240px 0px";
            if (this.dialogTree.cursor == 2)
                diverSprite.style.backgroundPosition = " -504px 8px";
            if (this.dialogTree.cursor == 3)
                diverSprite.style.backgroundPosition = " -766px 8px";
            //=================================================================

            return (this.dialogTree.cursor)
        } else {
            return -1
        }
    }

    explain() {
        this.dbg.info(`I AM ${this.name}`);
    }

    playSpeech() {
        return new Promise(function(resolve, reject) {
            this.dbg.display(this.dialogTree, "Inspecting Dialog Tree");

            if (this.dialogTree.hasOwnProperty('texts'))
                this.HTMLElement.textContent = this.dialogTree['texts'][this.dialogTree.cursor]['text'];

            /**
             *  From now, we're listening on each click
             *  on the speech box. If we got an end
             *  code, then we resolve the speech.
             */
            this.HTMLElement.addEventListener('click', function() {
                let a = this.next();
                if (a == -1) resolve({
                    "newStatus": "blessed"
                })
            }.bind(this));

        }.bind(this));

    }


}
