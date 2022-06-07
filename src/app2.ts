import { Quote } from './DisplayingQuotes.js'

const lettersWrapper = document.querySelector('.board__letters') as HTMLDivElement
const categoryWrapper = document.querySelector('.board__category') as HTMLDivElement
const wordWrapper = document.querySelector('.board__word') as HTMLDivElement
const outputWrapper = document.querySelector('.board__hangman') as HTMLDivElement
const hangmanElements = document.getElementsByClassName('board__hangman-elements')

class Game {
	currentStep = 0
	lastStep = 8

	quotes = [
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
	]

    lettersWrapper: HTMLDivElement
	categoryWrapper: HTMLDivElement
	wordWrapper: HTMLDivElement
	outputWrapper: HTMLDivElement
	quote: Quote

	constructor( lettersWrapper: HTMLDivElement, categoryWrapper: HTMLDivElement, wordWrapper: HTMLDivElement, outputWrapper: HTMLDivElement ) {
			this.lettersWrapper = lettersWrapper;
			this.categoryWrapper = categoryWrapper;
			this.wordWrapper = wordWrapper;
			this.outputWrapper = outputWrapper;

		const { text, category } = this.quotes[Math.floor(Math.random() * this.quotes.length)]
		this.categoryWrapper.innerHTML = category
		this.quote = new Quote(text)
	}

	guess(letter: string, event: MouseEvent) {
		(event.target as HTMLButtonElement).disabled = true 
		if (this.quote.guess(letter)) {
			this.drawQuote()
		} else {
			this.currentStep++
			(hangmanElements[this.currentStep] as HTMLDivElement).style.opacity = '1' 
			if (this.currentStep == this.lastStep) {
				this.loosing()
			}
		}
	}

	drawLetters() {
		for (let i = 0; i < 26; i++) {
			const label = (i + 10).toString(36) 
			const button = document.createElement('button') 
			button.innerHTML = label 
			this.lettersWrapper.appendChild(button) 
			button.addEventListener('click', event => this.guess(label, event)) 
		}
	}

	drawQuote() {
		const content = this.quote.getContent()
		this.wordWrapper.innerHTML = content
		if (!content.includes('_')) {
			this.winning()
		}
	}

	start() {
        // const hangmanElements = document.getElementsByClassName('board__hangman-elements')[this.currentStep] as HTMLDivElement
		(hangmanElements[this.currentStep] as HTMLDivElement).style.opacity = '1'
		this.drawLetters()
		this.drawQuote()
	}

	winning() {
		this.wordWrapper.innerHTML = 'GRATULACJE! Wygrałeś'
		this.lettersWrapper.innerHTML = ''
	}

	loosing() {
		this.wordWrapper.innerHTML = 'Przegrałeś! Koniec gry!'
		this.lettersWrapper.innerHTML = ''
	}
}

const game = new Game(lettersWrapper, categoryWrapper, wordWrapper, outputWrapper)

game.start()