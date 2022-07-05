const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const palyAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const startGame = document.getElementById('start');

// const words = ['application', 'programming', 'interface', 'wizard']; //add fetch to the json word file
//let selectedWord = words[Math.floor(Math.random() * words.length)];
let word = getWord();

// get word from json file
function getWord() {
    fetch('words.json')
    .then((res) => res.json())
    .then((data) => {
        const word = data[Math.floor(Math.random() * data.length)];
        // console.log(word);
        displayWord(word);
    });
  }

const correctLetters = [];
const wrongLetters = [];

// function selectedWord(word) {
//     displayWord(word);
//     // console.log(word);
// }  

// show the hidden word
// to turn a string into an array use split() to split by letter map() through the array and add an element
// <span class="letter"</span>
// is the current letter we are looping through in the correct letters ? represents if it is letter : (else is colon) empty string ' '
function displayWord(word) {
    // console.log(word);
    wordEl.innerHTML = `
    ${word.split('').map(letter => `<span class="letter">
    ${correctLetters.includes(letter) ? letter : ''}
    </span>
    `).join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, ''); // removes the new line character so each letter is on one line \n removes the new line character g is global '' is an empty string

    // if the innerWord is === (equal to) the selectedWord then the user has won
    if(innerWord === word) {
        finalMessage.innerText = 'Congratulation! You Won!';
        popup.style.display = 'flex';

    }
}

// update the worng letter
    function updateWrongLettersEl(){
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Used Letters</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span`)}
    `;

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost';
        popup.style.display = 'flex';
    }

}



// show notification will add the show class to the notification HTML element
// setTimeout will remove teh show class from the HTML element after 2000 miliseconds (2secs)
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}


// keydown letter press function e = event paramater. keydown will register each key(letter) keycode.
// a - z is between  65 and 90 so we right an if statement
window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <=90) {
        const letter = e.key;
        
        // if selected letter is in the selectedWord then push the letter to correctLetters
        if(word.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

// event listeners

startGame.addEventListener('click', getWord);

// Restrat game and play again
palyAgainBtn.addEventListener('click', () => {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    // selectedWord = word[Math.floor(Math.random() * words.length)];
    
    //displayWord();

    getWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
})

// getWord();