/*  Author: Robert Hermann
    Date: March 7 - 9, 2023
    Purpose: Codecademy Back End Development Path - Challenge Project
    Title: Find My Hat
    Short Description: Build an interactive terminal game in Node.js. The scenario 
    is that the player has lost their hat in a field full of holes, and 
    they must navigate back to it without falling down one of the holes 
    or stepping outside of the field.
*/
//installed npm package prompt-sync - crashes in debug mode :-(
//prompt-sync is a shortcut to using stdin to get user input
const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "\x1b[31;47m*\x1b[39;49m";
let direction = "";

//single class that constructs user defined field. Default location
//for starting game is upper left corner = 0,0.
class Field {
  constructor(field) {
    this.field = field;
    this.vertIndex = 0;
    this.horizIndex = 0;
  }

  //prints the field array as a string. The first join removes commas within
  //each "row" array and the join(\n) inserts line break between each array
  //that represents a row, so string prints each row on a separate line.

  printField() {
    //move cursor to home (0,0) ANSI escape code
    console.log("\x1B[H");

    console.log(
      `Enter direction to move: u = up, d = down, l = left, r = right, q = quit game`
    );
    let output = this.field.map((element) => element.join("")).join("\n");
    console.log(output);
    //moves cursor down 1 line after printing field
    console.log("\x1b[1D");
  }

  /* 
    Print user directions, collect user input for direction to move pathChar.
    Each direction tests if user move is "out of bounds" and prevents that
    move and resets the index variable to stay within length of each array
    row and column. Trying to manage the display of info in the terminal was
    a serious pain in the ass.
  */

  updatePathChar() {
    direction = prompt(`Which direction? `).toLowerCase();

    //only way I could clear the "out of bounds" text - all the
    //ANSI escape codes didn't seem to work the way I needed.
    console.clear();

    //colored the out of bounds msg RED (\x1b[31m)]), have to reset the color at
    //the end of the string otherwise the field, et al turns red.
    switch (direction) {
      case "u":
        this.vertIndex--;
        if (this.vertIndex < 0) {
          console.log(`\x1b[31mThat move is out of bounds. Try again.\x1b[0m]`);
          this.vertIndex = 0;
        }
        break;
      case "d":
        this.vertIndex++;
        if (this.vertIndex >= this.field.length) {
          console.log(`\x1b[31mThat move is out of bounds. Try again.\x1b[0m]`);
          this.vertIndex = this.field.length - 1;
        }
        break;
      case "l":
        this.horizIndex--;
        if (this.horizIndex < 0) {
          console.log(`\x1b[31mThat move is out of bounds. Try again.\x1b[0m]`);
          this.horizIndex = 0;
        }
        break;
      case "r":
        this.horizIndex++;
        if (this.horizIndex >= this.field[this.vertIndex].length) {
          console.log(`\x1b[31mThat move is out of bounds. Try again.\x1b[0m]`);
          this.horizIndex = this.field[this.vertIndex].length - 1;
        }
        break;
      case "q":
        console.log(`Thanks for playing. Good-bye.`);
        break;
      default:
        console.log(`\x1b[31mInvalid entry, try again.\x1b[0m`);
        direction = "";
        break;
    }
  }

  //main logic for playing the game. Uses while loop for interactivity.
  //the expression: this.field[this.vertIndex][this.horizIndex] returns
  //the character to which the user is attempting to move
  play() {
    let playGame = true;
    //clear screen ANSI escape code
    console.log("\x1B[2J");

    while (playGame) {
      if (direction == "q") {
        break;
      }
      //print the field on which game is played
      this.printField();

      //gets user input and validates move as valid
      this.updatePathChar();

      //tests if block to move to is a valid field, a hole,
      //or the hat
      switch (this.field[this.vertIndex][this.horizIndex]) {
        case fieldCharacter:
          this.field[this.vertIndex][this.horizIndex] = pathCharacter;
          break;
        case hole:
          console.log("Sorry, you fell down a hole. Game over!");
          playGame = false;
          break;
        case hat:
          console.log("WooHoo! You found the hat and win the game!!");
          playGame = false;
          break;
      }
    }
  }

  /*
    This method takes 3 arguments, height, width of the field and 
    the percentage # of holes, and it returns a randomized two-dimensional
    array representing the field with a hat and one or more holes.
    */
  static generateField(height, width, percentHoles) {
    let fieldArray = [];
    let numHoles = Math.ceil(height * width * (percentHoles / 100));
    let randomRow = 0;
    let randomCol = 0;

    //create the playing field with all field characters
    for (let j = 0; j < height; j++) {
      fieldArray[j] = [];
      for (let i = 0; i < width; i++) {
        fieldArray[j][i] = fieldCharacter;
      }
    }

    //place the number of holes based on user supplied
    //percentage, overwriting a field character to keep
    //the playing field the user designated size
    for (let i = 0; i <= numHoles; i++) {
      randomRow = Math.floor(Math.random() * height);
      randomCol = Math.floor(Math.random() * width);
      fieldArray[randomRow][randomCol] = hole;
    }

    //play starts in upper left corner
    fieldArray[0][0] = pathCharacter;

    //assign a random location on the board for the hat.
    //make sure hat is not in row 0 or 1 and col 0 or 1.
    do {
      randomRow = Math.floor(Math.random() * height);
      randomCol = Math.floor(Math.random() * width);
    } while (randomRow < 2 && randomCol < 2);
    fieldArray[randomRow][randomCol] = hat;

    //returns final array with field characters, one hat,
    //and a specified number of holes
    return fieldArray;
  }
}

let boardArray = Field.generateField(15, 30, 25);
let playingField = new Field(boardArray);

playingField.play();
