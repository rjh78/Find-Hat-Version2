# Title: Find-Hat-Version2
## Description: 
Node.js project for Codecademy Back End Development Path
## Project Goals: 
In this project, you’ll be building an interactive terminal game. The scenario is that the player has lost their hat in a field full of holes, and they must navigate back to it without falling down one of the holes or stepping outside of the field.
## Features:
Very basic terminal game. If user attempts to move off the board an error msg is displayed and user is prompted to move again. Game ends if user moves over a "hole" or when the user captures the "hat".
## How to Use:
In main.js, edit line 183: "let boardArray = Field.generateField(15, 30, 25);" to indicate the number of rows, columns, and percentage of holes in the field. Here is the definition: Field.generateField(rows, columns, percentage of holes). 

The percentage of holes should be a whole integer as it will be converted to a decimal in the code. For example, 25% of the field should be holes is indicated by entering "25" as the third argument.

Save the file and in a terminal type: "node main.js" to run the game.
## Dependencies:
One dependency is the prompt-sync package. This is used to get user input in the game.
## Collaborators:
none.
## License:
No license needed. Just a terminal game as an educational assignment.
