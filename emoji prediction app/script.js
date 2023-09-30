const cardsArray = [
    {
        name: 'smile1',
        icon: '<i class="fa-regular fa-face-smile-wink"></i>'
    },
    {
        name: 'gentle laugh',
        icon: '<i class="fa-regular fa-face-smile-beam"></i>'
    },
    {
        name: 'lol',
        icon: '<i class="fa-regular fa-face-grin-squint-tears"></i>'
    },
    {
        name: 'eyes heart',
        icon: '<i class="fa-regular fa-face-grin-hearts"></i>'
    },
    {
        name: 'face laugh',
        icon: '<i class="fa-regular fa-face-laugh-squint"></i>'
    },
    {
        name: 'face grin',
        icon: '<i class="fa-regular fa-face-grin-beam-sweat"></i>'
    },
    {
        name: 'smile1',
        icon: '<i class="fa-regular fa-face-smile-wink"></i>'
    },
    {
        name: 'gentle laugh',
        icon: '<i class="fa-regular fa-face-smile-beam"></i>'
    },
    {
        name: 'lol',
        icon: '<i class="fa-regular fa-face-grin-squint-tears"></i>'
    },
    {
        name: 'eyes heart',
        icon: '<i class="fa-regular fa-face-grin-hearts"></i>'
    },
    {
        name: 'face laugh',
        icon: '<i class="fa-regular fa-face-laugh-squint"></i>'
    },
    {
        name: 'face grin',
        icon: '<i class="fa-regular fa-face-grin-beam-sweat"></i>'
    }
];

let flippedCards = [];
let matchedPairs = 0;
let remainingTime = 60; // 1 minute in seconds
let timerInterval;

shuffleCards();
startTimer();
displayCards();

function shuffleCards() {
    for (let i = cardsArray.length - 1; i >= 0; i--) {
        const randIndex = Math.floor(Math.random() * (i + 1));
        [cardsArray[i], cardsArray[randIndex]] = [cardsArray[randIndex], cardsArray[i]];
    }
}

function displayCards() {
    const gameBoard = document.getElementById('gameBoard');
    cardsArray.forEach((curr, index, arr) => {
        const card = document.createElement('div');
        card.setAttribute('id', index);
        card.classList.add('cardback');
        card.classList.add('active');
        gameBoard.append(card);
        card.addEventListener('click', flipCard);
    });
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    timerElement.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (remainingTime === 0) {
        clearInterval(timerInterval);
        endGame(false); 
    }

    remainingTime--;
}

function flipCard() {
    if (flippedCards.length < 2 && this.classList.contains('active')) {
        let cardId = this.getAttribute('id');
        flippedCards.push(this);
        this.classList.remove('cardback');
        this.innerHTML = cardsArray[cardId].icon;
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    let card1Id = flippedCards[0].getAttribute('id');
    let card2Id = flippedCards[1].getAttribute('id');
    if (cardsArray[card1Id].name === cardsArray[card2Id].name) {
        flippedCards[0].style.border = 'none';
        flippedCards[0].style.backgroundColor = '#FFDAB9';
        flippedCards[0].innerHTML = '';
        flippedCards[0].classList.remove('active');
        flippedCards[1].style.border = 'none';
        flippedCards[1].style.backgroundColor = '#FFDAB9';
        flippedCards[1].innerHTML = '';
        flippedCards[1].classList.remove('active');
        matchedPairs++;
        checkGameOver();
    } else {
        flippedCards[0].innerHTML = '';
        flippedCards[0].classList.add('cardback');
        flippedCards[1].innerHTML = '';
        flippedCards[1].classList.add('cardback');
    }
    flippedCards = [];
}

function checkGameOver() {
    if (matchedPairs === cardsArray.length / 2) {
        while (gameBoard.firstChild) {
            gameBoard.removeChild(gameBoard.firstChild);
        }
        gameBoard.innerHTML = 'You won!';
        gameBoard.classList.remove('game');
        gameBoard.classList.add('won');
        clearInterval(timerInterval);
    }
}
