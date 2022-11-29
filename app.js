class Game {
    constructor(guessTextElement, messageTextElement) {
        this.guessTextElement = guessTextElement
        this.messageTextElement = messageTextElement
        this.clear()
    }

    clear() {
        this.guess = ''
    }

    delete() {
        this.guess = this.guess.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.guess.includes('.')) return
        this.guess = this.guess.toString() + number.toString()
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.guessTextElement.innerText = this.getDisplayNumber(this.guess)
    }

    registeringGuess() {
        if (guessCount += 1) {
            this.guessTextElement.innerText = '';
            this.messageTextElement.innerText += ` ${this.guess}`;
        }
    }

    guessComparaison() {
        const currentGuess = Number(this.guess);
        if (currentGuess == randomNumber) {
            this.guessTextElement.innerText = 'Congratulations! You got it right!';
            this.messageTextElement.innerText = '';
        } else if(currentGuess < randomNumber) {
            this.guessTextElement.innerText = 'Last guess was too low!';
        } else if (currentGuess > randomNumber) {
            this.guessTextElement.innerText = 'Last guess was too high!';
        } else {
            return
        }
    }
}

const inputData = document.querySelector('.input_data')
const numberButtons = document.querySelectorAll('[data-number]')
const deleteButton = document.querySelector('[data-delete]')
const submitButton = document.querySelector('[data-submit]')
const guessTextElement = document.querySelector('[data-guess]')
const messageTextElement = document.querySelector('[data-message]')
const guessCountTextElement = document.querySelector('[data-guessCount]')
const levelCountTextElement = document.querySelector('[data-level]')
const scoreCountTextElement = document.querySelector('[data-score]')
const clueCountTextElement = document.querySelector('[data-clue]')

let guessCount = 0
let scoreCount = 0
let levelCount = 1
let bornInf = 0
let bornSup = 100
let randomNumber = Math.floor(Math.random() *(bornSup - bornInf + 1) + bornInf) ;

submitButton.disabled = true;
const game = new Game(guessTextElement, messageTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        game.appendNumber(button.innerText)
        game.updateDisplay()
        submitButton.disabled = false;
    })
})

deleteButton.addEventListener('click', () => {
    game.delete()
    game.updateDisplay()
})

submitButton.addEventListener('click', () => {
    game.registeringGuess();
    game.guessComparaison();
    dataCounting();
    game.clear();
})

function dataCounting() {
    if (guessTextElement.innerText == 'Congratulations! You got it right!') {
        guessCount = 0;
        scoreCount += 10;
        levelCount ++;
        bornInf += 100;
        bornSup += 100;
        randomNumber = Math.floor(Math.random() *(bornSup - bornInf + 1) + bornInf);
        submitButton.disabled = true;
    }
    if (guessCount == 8) {
        messageTextElement.innerText = '😭 Game Over!!';
        gameOver()
    }
    if (guessTextElement.innerText == 'Last guess was too low!' || guessTextElement.innerText == 'Last guess was too high!') {
        submitButton.disabled = true;
    }
    levelCountTextElement.innerText = `Level:${levelCount}`
    scoreCountTextElement.innerText = `Score:${scoreCount}`
    guessCountTextElement.innerText = `Guesses:${guessCount}/8`
    clueCountTextElement.innerText = `Interval:[${bornInf}, ${bornSup}]`  
}

function gameOver() {
    for (const numberButton of numberButtons) {
        numberButton.disabled = true;
    }
    deleteButton.disabled = true;
    submitButton.disabled = true;
    guessTextElement.innerText = `Your Score is ${scoreCount}`
    guessTextElement.style.fontFamily = 'cursive';
    messageTextElement.style.color = 'red';
    messageTextElement.style.fontSize = '3.1rem';
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    resetButton.setAttribute("id", "span-3")
    inputData.append(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    for (const numberButton of numberButtons) {
        numberButton.disabled = false;
    }
    deleteButton.disabled = false;
    submitButton.disabled = true;
    guessTextElement.style.fontFamily = 'Nunito'
    guessTextElement.innerText = '';
    messageTextElement.innerText = '';
    messageTextElement.style.color = 'black';
    messageTextElement.style.fontSize = '2.5rem';
    messageTextElement.style.fontWeight = '500'
    guessCount = 0
    scoreCount = 0
    levelCount = 1
    bornInf = 0
    bornSup = 100
    resetButton.parentNode.removeChild(resetButton);
    randomNumber = Math.floor(Math.random() *(bornSup - bornInf + 1) + bornInf) ;
    levelCountTextElement.innerText = `Level:${levelCount}`
    scoreCountTextElement.innerText = `Score:${scoreCount}`
    guessCountTextElement.innerText = `Guesses:${guessCount}/8`
    clueCountTextElement.innerText = `Interval:[${bornInf}, ${bornSup}]`
}

levelCountTextElement.innerText = `Level:${levelCount}`
scoreCountTextElement.innerText = `Score:${scoreCount}`
guessCountTextElement.innerText = `Guesses:${guessCount}/8`
clueCountTextElement.innerText = `Interval:[${bornInf}, ${bornSup}]`