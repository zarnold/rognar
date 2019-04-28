# Dialogue System

Dialogue system is heart of the game. 

As specified in the [design of the gam](step-1_design.md), the dialogue engine should provide this features :

- For each step, there are many choice offered
- A choice leads to another steps
- steps affect status of the player
- some choices are offered only if some requirement are met

ok lets code.

## Step 0 : attaching a new dialog to html element

First thing is to design the dialog system from a coding perspective. I choose to use OOP (Oriented Object Programmation) and javascript Class syntax.
Like all my others features, Dialog system is implemented in [its own file](../modules/dialogLib.js)