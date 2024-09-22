let strings;
let wordList;
let dieRolls = [];
let passphrase = "";
const dieFaces = ['1','2','3','4','5','6'];

function preload() {
  strings = loadStrings("eff_large_wordlist.txt");
}

function setup() {
  createCanvas(windowWidth-20, windowHeight-20);
  initializeWordList();
  textSize(36)
  textAlign(CENTER,CENTER)
  noLoop();
}

function draw() {
  background('white');
  const rollsString = dieRolls.join(', ');
  text(rollsString, width/2, 0.33*height);
  text(passphrase, width/2, 0.67*height)
}

function keyPressed() {
  dieRolls.push(random(dieFaces));
  while( dieRolls.length > 5 ) dieRolls.shift()
  passphrase = getWordForKey( dieRolls.join('') );
  redraw();
}

function getWordForKey(key) {
  if( isValidKey(key) ) {
    return wordList[key];
  } else {
    return "";
  }
}

function isValidKey(key) {
  if( key.length === 5 ) {
    for( const digit of key ) {
      if( !dieFaces.includes(digit) ) return false;
    }
    return true;
  } else {
    return false;
  }
}

function initializeWordList() {
  wordList = new Array(66667);
  loadStringsIntoList();
  strings = null;
}

function loadStringsIntoList() {
  for( let line of strings ) {
    let [i, string] = line.split(' ');
    i = parseInt(i);
    wordList[i] = string;
  }
  // console.log( wordList )
}

