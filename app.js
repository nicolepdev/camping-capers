// DOM Element Variables

const button = document.querySelector('.btn__reset');
const qwerty = document.getElementById('qwerty');
const letters = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
const titleClass = document.querySelector('.title');
const directions = document.querySelector('.directions');
const lives = document.querySelectorAll('.tries img');
const phraseUl = document.querySelector('#phrase ul');

// Game Variables

let phrase = document.getElementById('phrase');
let missed = 0;
let gameOver = 5;
let currentPhrase = '';

// Hide start screen overlay

button.onclick = function() {
  overlay.style.display = 'none';
};

// Phrases

const phrases = [
  'black tank water',
  'toasted marshmallows',
  'comfy hammock',
  'boondocking',
  'fancy fifth wheel',
  'run your generator',
  'full hookups',
  'snowbirds',
  'foamy grey water',
  'motorhome',
  'pull through site',
  'propane',
  'rv park',
  'rest area',
  'slide out',
  'yeti cooler',
  'freestanding tent',
  'bug spray',
  'nature',
  'sunglasses',
  'fun in the pool',
  'weekend'
];

// Get a random phrase and return as new array

function getRandomPhraseAsArray(array) {
  let getRandomPhrase = array[Math.floor(Math.random() * array.length)];
  let newPhraseArray = [];
  currentPhrase = getRandomPhrase;

  for (let i = 0; i < getRandomPhrase.length; i++) {
    newPhraseArray.push(getRandomPhrase.charAt(i));
  }
  return newPhraseArray;
}

// Add phrase to display

function addPhraseToDisplay(array) {
  // loop through array of characters

  for (let i = 0; i < array.length; i++) {
    // create list items

    const characters = array[i];
    const displayList = document.createElement('li');
    displayList.textContent = characters;
    phraseUl.appendChild(displayList);

    // add appropriate classes

    if (displayList.textContent !== ' ') {
      displayList.classList.add('letter');
    } else {
      displayList.classList.add('space');
    }
  }
}
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// Check letters

function checkLetter(key) {
  // get elements with class of "letter" and loop over letters to check if they match the key the user has pushed

  let guessed = null;
  for (let i = 0; i < letters.length; i++) {
    if (key.target.textContent === letters[i].textContent) {
      guessed = true;
      letters[i].classList.add('show');
    }
  }
  return guessed;
}

// Check wins

function checkWin() {
  if (show.length === letters.length) {
    overlay.style.display = 'flex';
    overlay.classList.add('win');
    titleClass.innerHTML = `You guessed the phrase!`;
    directions.innerHTML = `"${currentPhrase}"`;
    button.textContent = 'GUESS AGAIN';
  } else if (missed === 5) {
    overlay.style.display = 'flex';
    overlay.classList.add('lose');
    titleClass.innerHTML = `Sorry, your fire burned out. The phrase was:`;
    directions.innerHTML = `"${currentPhrase}"`;
    button.textContent = 'TRY AGAIN';
  }
}

// Keyboard event listener

window.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    const chosen = event.target;
    chosen.classList.add('chosen');
    chosen.disabled = 'true';
    const letterFound = checkLetter(event);
    if (letterFound === null) {
      let currentMissed = missed;
      lives[currentMissed].setAttribute('src', 'images/fire-out.png');
      missed++;
    }
  }
  checkWin();
});

// Reset game

window.addEventListener('click', event => {
  if (event.target.innerHTML === 'TRY AGAIN') {
    reset();
  } else if (event.target.innerHTML === 'GUESS AGAIN') {
    reset();
  }
});

function reset() {
  window.location.reload(true);
}
