import { Quote } from './Quote.js'

// Nazwy klas zawsze z dużej litery
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

	constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
			this.lettersWrapper = lettersWrapper;
			this.categoryWrapper = categoryWrapper;
			this.wordWrapper = wordWrapper;
			this.outputWrapper = outputWrapper;

		// Math.floor(Math.random() * this.quotes.length) - czyli: Math.random() losowo generuje wartość pomiędzy 0 a 1, dlatego mnożymy to razy ilość elementów w naszej tablicy i następnie poprzez "Math.floor()" zaokrąglamy do dołu i taka pozycja zostaje wybrana z naszej tablicy.
		const { text, category } = this.quotes[Math.floor(Math.random() * this.quotes.length)]
		this.categoryWrapper.innerHTML = category
		this.quote = new Quote(text)
	}

	guess(letter, event) {
		event.target.disabled = true // po nasłuchiwaniu na clicka na buttona w funkcji przekazujemy event który wskazuje obkiek (w tym przypadku button) który został kliknięty następnie go wyłączamy poprzez przypisanie mu "disabled = true"
		if (this.quote.guess(letter)) {
			this.drawQuote()
		} else {
			this.currentStep++
			document.getElementsByClassName('board__hangman-elements')[this.currentStep].style.opacity = 1
			if (this.currentStep == this.lastStep) {
				this.loosing()
			}
		}
	}

	drawLetters() {
		for (let i = 0; i < 26; i++) {
			const label = (i + 10).toString(36).toUpperCase() // 36 w metodzie toString oznacza, że funkcja zwróci liczbę sformatowaną w systemie o podstawie 36 i zmienioną na tym String. W systemie 36 liczby oparte są na znakach 0-9 a następnie A-Z. Czyli 0 = 0, 1 = 1... 9 = 9 i dopiero wtedy 10 = A, 11 = B... . A, że chcemy by uwzględniało tylko litery to zaczynamy od 10 (i+10). Jeśli wywołamy to w konsoli, to zwróci nam litery od "a" do "z"
			const button = document.createElement('button') // Tworzymy button dla każdej litery
			button.innerHTML = label // Do button'ów przypisujemy litery
			this.lettersWrapper.appendChild(button) // dodajemy buttony na stronę
			button.addEventListener('click', event => this.guess(label, event)) // Nasłuchujemy na "clicka" która litera została naciśnięta
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
		document.getElementsByClassName('board__hangman-elements')[this.currentStep].style.opacity = 1
		//Musi być "this", inaczej nie zadziała, ponieważ TO Z TEGO KONKRETNEGO obiektu chcemy wywołać metodę "drawLetters"
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

const game = new Game({
	lettersWrapper: document.querySelector('.board__letters'),
	categoryWrapper: document.querySelector('.board__category'),
	wordWrapper: document.querySelector('.board__word'),
	outputWrapper: document.querySelector('.board__hangman'),
})

game.start()
