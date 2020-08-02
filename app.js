const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const userMinInput = document.querySelector('#guessMinField');
const userMaxInput = document.querySelector('#guessMaxField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const startOver = document.querySelector('.resultParas');
const lowOrHi = document.querySelector('.lowOrHi');
const p = document.createElement('p');
let previousGuesses = [];
let numGuesses = 1;
let randomNumber;
let playGame = true;
let guessMin;
let guessMax;


//checking credentials

//random numbers function
function getRndInteger(min, max)
{
    return Math.floor(Math.random() * (max - min) ) + min;
}

//generating random numbers
if (playGame){
    subMinMax.addEventListener('click', function(e)
    {
        e.preventDefault();
        //Grab guess from user
        guessMin= parseInt(userMinInput.value);
        guessMax = parseInt(userMaxInput.value);
        // if(guessMin===NaN || guessMax===NaN)
        // {
        //     userInput.value = '';
        //     //Disable user input button
        //     userInput.setAttribute('disabled', '');
        // }
        if(guessMax<guessMin)
        {
            alert('Maximum Number should be greater than the minimum entered');
        }
        else
        {
        randomNumber = parseInt(getRndInteger(guessMin,guessMax));
        // if (randomNumber===NaN)
        // {
        //     userInput.setAttribute('disabled', '');
        // }
        }
    });
}

//taking guess from user
if (playGame){
    subt.addEventListener('click', function(e){
        e.preventDefault();
        //Grab guess from user
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

//validating the entered number against max min Range
function validateGuess(guess){
    if (isNaN(guess)){
        alert('Please enter a valid number');
    } else if (guess < guessMin) {
        alert('Please enter a number greater than lowest number set');
    } else if (guess > guessMax){
        alert('Please enter a number less than Maximum set')
    } else {
        //Keep record of number of attempted guesses
        previousGuesses.push(guess);
        //Check to see if game is over
        if (numGuesses === 6){
            displayGuesses(guess);
            displayMessage(`Game Over! Number was ${randomNumber}`);
            endGame();
        } else {
        //Display previous guessed numbers
        displayGuesses(guess);
        //Check guess and display if wrong
        checkGuess(guess);
        }
    }
}

//checking the guesss
function checkGuess(guess){
    //Display clue if guess is too high or too low
    if (guess === randomNumber){
        displayMessage(`You guessed correctly!`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`Too low! Try again!`);
    } else if (guess > randomNumber) {
        displayMessage(`Too High! Try again!`);
    }
}

//displaying guesses
function displayGuesses(guess){
    userInput.value = '';
    guessSlot.innerHTML += `${guess}  `;
    numGuesses++;
    remaining.innerHTML = `${6 - numGuesses}  `;
}

function displayMessage(message){
        lowOrHi.innerHTML = `<h1>${message}</h1>`
}

//to end the game 
function endGame(){
    //Clear user input
    userInput.value = '';
    //Disable user input button
    userInput.setAttribute('disabled', '');
    //Display Start new Game Button
          p.classList.add('button');
          p.innerHTML = `<h1 id="newGame">Start New Game</h1>`
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

//restart a new game
function newGame(){
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function(){
        //Pick a new random number
        randomNumber = parseInt(getRndInteger(guessMin,guessMax));
        previousGuesses = [];
        numGuesses = 1;
        guessSlot.innerHTML = '';
        lowOrHi.innerHTML = '';
        remaining.innerHTML = `${6 - numGuesses}  `;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    })
}