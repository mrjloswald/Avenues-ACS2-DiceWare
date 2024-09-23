let wordList
let words = []
let delimiter = "-"
let mode = "list"
let message = ""
let activeWordIndex = 0
let textColor = {
  default: "black",
  active: "red"
}

const WORD_DEFAULTS = {capitalized: false, upcase: false}
const dieFaces = ['1','2','3','4','5','6']

const keyBindings = {
  all: {
    "l": listMode,
    "w": wordMode,
  },
  list: {
    " ": () => addWord(),
    "DELETE": () => removeWord(),
    "BACKSPACE": () => removeWord(),
  },
  words: {
    "c": () => capitalize(),
    "C": () => capitalize(true),
    'u': () => upcase(),
    'U': () => upcase(true),
    "ArrowUp": () => changeActiveWordIndex(-1),
    "ArrowDown": () => changeActiveWordIndex(1),
    "ArrowLeft": () => moveWordLeft(),
    "ArrowRight": () => moveWordRight()
  }
  
}

function preload() {
  loadStrings("eff_large_wordlist.txt", initializeWordList)
}

function setup() {
  createCanvas(windowWidth-20, windowHeight-20)
  noLoop();
}

function draw() {
  background('white');
  textSize(12)
  fill(textColor.default)
  displayMessage()
  if( mode === "list" ) {
    displayPassphrase()
  }
  if( mode === "words" ) {
    displayWords()
  }
}

function listMode() {
  setMode("list")
}

function wordMode() {
  setMode("words")
  activeWordIndex = 0
}

function changeActiveWordIndex(direction) {
  activeWordIndex += direction
  if( activeWordIndex < 0 ) {
    activeWordIndex = words.length - 1
  } else if( activeWordIndex >= words.length ) {
    activeWordIndex = 0
  }
}

function moveWord(direction) {
  if( words.length > 1 ) {
    indexA = (activeWordIndex + words.length + direction) % words.length
    indexB = activeWordIndex
    temp = words[indexA]
    words[indexA] = words[indexB]
    words[indexB] = temp
    activeWordIndex = (words.length + activeWordIndex + direction) % words.length
  }
}

function moveWordLeft() { moveWord(-1) }
function moveWordRight() { moveWord(1) }

function apply( change, all = false ) {
  if( all ) {
    words.forEach( word => word[change] = !word[change] ) 
  } else {
    if( words[activeWordIndex] ) {
      words[activeWordIndex][change] = !words[activeWordIndex][change]
    }
  }
}

function upcase( all = false ) {
  apply("upcase", all)
}


function capitalize( all = false ) {
  apply("capitalized", all)
  // if( all ) {
  //   words.forEach( word => word.capitalized = !word.capitalized )
  // } else {
  //   if( words[activeWordIndex] ) {
  //     words[activeWordIndex].capitalized = ! words[activeWordIndex].capitalized
  //   }
  // }
}

function displayMessage() {
  textAlign(LEFT,TOP)
  text(message, 10, 10)
}

function displayPassphrase() {
  textAlign(CENTER,CENTER)
  passphrase = words.map( w => getRenderedWord(w) ).join(delimiter)
  text(passphrase, width/2, height/2)
}

function displayWords() {
  displayWordList()
  // displayActiveWordOptions()
}

function displayWordList() {
  for( let i = 0; i < words.length; i++ ) {
    if( i === activeWordIndex ) {
      fill(textColor.active)
    } else {
      fill(textColor.default)
    }
    text(words[i].original, 10, 10 + (i+1)*15)
  }
}

function getRenderedWord(word) {
  console.log( word )
  let w = word.original
  if( word.upcase ) {
    w = w.toUpperCase()
  }
  if( word.capitalized ) {
    w = w.charAt(0).toUpperCase() + w.slice(1)
  }
  return w
}

function setMode(newMode) {
  mode = newMode
}

function addWord() {
  words.push( {original:  getWordForKey( generateKey() ), ...WORD_DEFAULTS } )
}

function keyPressed() {
  message = ""
  modeBindings = {...keyBindings.all, ...keyBindings[mode]}
  const keys = Object.keys(modeBindings)
  if( keys.includes(key) ) {
    modeBindings[key]()
  } else if( keys.includes(keyCode) ) {
    modeBindings[keyCode]()
  } else {
    message = `Key (${key} or ${keyCode}) not recognized`
  }  
  redraw();
}

function generateKey() {
  return `${random(dieFaces)}${random(dieFaces)}${random(dieFaces)}${random(dieFaces)}${random(dieFaces)}`
}

function getWordForKey(key) {
  if( isValidKey(key) ) {
    return wordList[key]
  } else {
    return ""; // should throw exception
  }
}

function isValidKey(key) {
  if( key.length === 5 ) {
    for( const digit of key ) {
      if( !dieFaces.includes(digit) ) return false
    }
    return true
  } else {
    return false
  }
}

function initializeWordList(lines) {
  wordList = new Array(66667)
  loadStringsIntoList(lines)
}

function loadStringsIntoList(lines) {
  for( let line of lines ) {
    let [i, string] = line.split(' ')
    i = parseInt(i)
    wordList[i] = string
  }
}

