# ACS.2: Passphrase Generator

## Resources
* The [Original DiceWare Proposal](https://theworld.com/~reinhold/diceware.html)
* A Good Overview on the [Current State of DiceWare](https://diceware.dmuth.org/)
* The Electronc Frontier Foundation's article on their published [Word Lists for DiceWare](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases)
* Wikipedia's entry on [DiceWare](https://en.wikipedia.org/wiki/Diceware)

## Starter Code Overview
The starter code includes EFF's large word list for five die rolls (`eff_large_wordlist.txt`). It should be noted that when I originally included this file, there was an issue with the whitespace between the numbers and the word. The issue seems to be fixed, but be aware that other word lists may create a problem (which shouldn't scare you from using them).

### `script.js`

#### `preload`

`preload` is a function that first in a P5 sketch. `setup` will not run until `preload` is complete, which is why the sketch takes a moment to load. It is common practice to load large files in preload. 

[`loadStrings`](https://p5js.org/reference/#/p5/loadStrings) is a P5 function that takes each line from a text file and loads it into an array; in this case, `strings`.

#### `setup`

A simple call to `createCanvas`, a call to `initializeWordList` (discussed below), and turning off the draw loop. 

#### `draw`

[`join`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) is a JavaScript function called _on_ an array (`dieRolls.join`), converts the items in the arary to strings (using whatever JavaScript thinks is the best way to do such things), and then concatenates those things together using whatever you passed in as a parameter as glue between the items. In this case, a comma followed by a space. Thus `[1,2,3] -> "1, 2, 3"`. The rest of the code is displaying the just generated string and the password string

#### `keyPressed`

[`keyPressed`](https://p5js.org/reference/#/p5/keyPressed) is a P5 function that gets called any time a key is pressed. In the function, you define what you would like to happen on a key press (often, some code to determine _which_ key was pressed and routing to an apporporiate response). In this case, regardless of the key pressed, we [`push`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) a random item from `dieFaces` (this is the "rolling the dice" code) onto the end of `dieRolls`. If `dieRolls` has more than five rolls in it, we remove the first item from the array using [`shift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift). 

Next, we `join` all the items in `dieRolls` to generate a lookup key, get the word represented by the key, and then call the `draw` function using `redraw` (`noLoop` is still in effect, so `draw` just happens once). 

#### `getWordForKey`

A check to see if the key is valid (below), and then a simple array reference. This function returns an empty string if the key is invalid (which is why nothing is dsplayed on the first four key presses).

#### `isValidKey`

A check to make sure the key is the right length followed by a loop over the the characters of the `key` string. Each character (`digit`) is checked for containment in the `dieFaces` array using [`includes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes). 

#### `initializeWordList`

A large aray is created and then we load the strings into it using `loadStringsIntoList`

#### `loadStringsIntoList`

All strings are looped over. This effectively is going through the original file line-by-line. The line is then broken up using the JavaScript function [`split`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) which is called on a string breaking into pieces based on the given parameter. The pieces are returned as an array. On the left side of this statement is some [fancy JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) allowing us to name individual components of the array. Since we _know_ there are only ever going to be two elements, this works out nicely. 

We then need to convert the string `i` into a number. The code here uses [`parseInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt), which is a JavaScript function, but P5 includes a slightly more terse [`int`](https://p5js.org/reference/#/p5/int) function that would do the job as well. It is important to convert the string to an integer because we then use i to access the wordList, assigning the string to the array at that position. 

## Assignment

Using the DiceWare project as a starting point, design a project that allows a user to generate strong passphrases. A minimal implementation of this project would be displaying five randomly generated words using the DiceWare mechanic as per the original proposal. 

### Requirements
* Your program must respond to user input. 
* Your program must allow for the creation of multiple passphrases (hitting the play button again doesn't count).
* The entire passphrase must be displayed on the screen. 
* You must use the DiceWare mechanic in creating your passphrases. 

### _Some_ Ideas for Ways to Expand on This Project. 
* allowing the user to generate however many words the like.
* allowing the user to alter the words by capitalizing the start or all of the word.
* allowing the user to delete words from the passphrase.
* allowing the user to insert characters or numbers (randomly or otherwise) into the passphrase (and to remove them?).
* using a different word list
* allowing the user to copy the generated passphrase from the clipboard or to output the passphrase to file. 

