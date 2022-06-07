import { Quote } from './DisplayingQuotes.js';
const lettersWrapper = document.querySelector('.board__letters');
const categoryWrapper = document.querySelector('.board__category');
const wordWrapper = document.querySelector('.board__word');
const outputWrapper = document.querySelector('.board__hangman');
const hangmanElements = document.getElementsByClassName('board__hangman-elements');
class Game {
    constructor(lettersWrapper, categoryWrapper, wordWrapper, outputWrapper) {
        this.currentStep = 0;
        this.lastStep = 8;
        this.quotes = [
            {
                text: 'pan tadeusz',
                category: 'Utwór literacki',
            },
            {
                text: 'janko muzykant',
                category: 'Utwór literacki',
            },
            {
                text: 'mechaniczna pomarancza',
                category: 'Film',
            },
            {
                text: 'rok 1984',
                category: 'Utwór literacki',
            },
            {
                text: 'mistrz i malgorzata',
                category: 'Utwór literacki',
            },
            {
                text: 'proces',
                category: 'Utwór literacki',
            },
            {
                text: 'lot nad kukulczym gniazem',
                category: 'Film',
            },
            {
                text: 'wichrowe wzgorza',
                category: 'Utwór literacki',
            },
            {
                text: 'ojciec chrzestny',
                category: 'Film',
            },
            {
                text: 'pulp fiction',
                category: 'Film',
            },
            {
                text: 'akademia pana kleksa',
                category: 'Film',
            },
            {
                text: 'ogniem i mieczem',
                category: 'Film',
            },
        ];
        this.lettersWrapper = lettersWrapper;
        this.categoryWrapper = categoryWrapper;
        this.wordWrapper = wordWrapper;
        this.outputWrapper = outputWrapper;
        const { text, category } = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        this.categoryWrapper.innerHTML = category;
        this.quote = new Quote(text);
    }
    guess(letter, event) {
        event.target.disabled = true;
        if (this.quote.guess(letter)) {
            this.drawQuote();
        }
        else {
            this.currentStep++;
            hangmanElements[this.currentStep].style.opacity = '1';
            if (this.currentStep == this.lastStep) {
                this.loosing();
            }
        }
    }
    drawLetters() {
        for (let i = 0; i < 26; i++) {
            const label = (i + 10).toString(36);
            const button = document.createElement('button');
            button.innerHTML = label;
            this.lettersWrapper.appendChild(button);
            button.addEventListener('click', event => this.guess(label, event));
        }
    }
    drawQuote() {
        const content = this.quote.getContent();
        this.wordWrapper.innerHTML = content;
        if (!content.includes('_')) {
            this.winning();
        }
    }
    start() {
        // const hangmanElements = document.getElementsByClassName('board__hangman-elements')[this.currentStep] as HTMLDivElement
        hangmanElements[this.currentStep].style.opacity = '1';
        this.drawLetters();
        this.drawQuote();
    }
    winning() {
        this.wordWrapper.innerHTML = 'GRATULACJE! Wygrałeś';
        this.lettersWrapper.innerHTML = '';
    }
    loosing() {
        this.wordWrapper.innerHTML = 'Przegrałeś! Koniec gry!';
        this.lettersWrapper.innerHTML = '';
    }
}
const game = new Game(lettersWrapper, categoryWrapper, wordWrapper, outputWrapper);
game.start();
