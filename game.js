"use strict";

//set states for game status
const state = {
    PLAYING: 'playing',
    P1WINS: 'Player 1 Wins!',
    P2WINS: 'Computer Player Winss!',
    // DRAW: 'draw',
  }
let gameState = state.PLAYING;

let cardToMatchInput = document.getElementById('cardToMatchInput');
let cardToMatchValue;
let resultsContainer = document.getElementById('results');
let cardsRemaining = document.getElementById('cardsRemaining');
let player = 1;
let player1cards, player2cards;

//array Variables
let cardsArray = [];
let shuffledArray = [];
let player1 = [];
let player2 = [];

const gameStart = document.querySelector('.btn-start');
const gameDeal = document.querySelector('.btn-deal');

//event listeners
gameStart.addEventListener('click',checkPairs,false);
gameDeal.addEventListener('click',createDeck,false);
// player2[2].addEventListener('click', reveal, false);

// function reveal(player1) {
//     player1[2].className = "computerDeck";
// }

//full deck of cards
var suits = ["♠", "♦", "♣", "♥"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

//gets the deck
function getDeck()
{
	let deck = new Array;

	for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < values.length; x++)
		{
			let card = {Value: values[x], Suit: suits[i]};
			deck.push(card);
		}
	}
	return deck;
}

//shuffle the deck to randomize the deck array
function shuffle(deck)
{
	// for 1000 turns
	// switch the values of two random cards
	for (let i = 0; i < 1000; i++)
	{
		const location1 = Math.floor((Math.random() * deck.length));
		const location2 = Math.floor((Math.random() * deck.length));
		const tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
    }
}


function cardAssign(deck) {
    document.getElementById('player1').innerHTML = 'Player 1 Cards' + '<br>';
    document.getElementById('player2').innerHTML = 'Computer Cards' + '<br>';
    player1 = [];
    player2 = [];

    for (let i = 0; i < 7; i++) {
        let card = document.createElement("div");
        player1.push(deck[i]);
        if (deck[i].Suit == "♠" || deck[i].Suit == "♣") {
            card.className = 'blackCard';
        }
        else {
            card.className = 'redCard';
        }
        card.id = "player1card" + [i]
        let icon = deck[i].Suit;
        // cardback.className = 'computerCards'
        card.innerHTML = deck[i].Value + '<br>' + icon;
        document.getElementById("player1").appendChild(card);
        deck.shift();
        // card.style.animation = "flip 1s 1";
        // with(card.style) {
        //     // zIndex = "1000";
        //     // top = "100px";
        //     // left = "-140px";
        //     // transform = "rotate(0deg)";
        //     // zIndex = "30";
        //     animation-name = 'flip';
        //     animation-duration: 1s;
        //     animation-delay =  '.6s';
        //     left = '90%';
        //     top = '0';
        //   }
    }
    //computer cards  (player 2 is computer)
    for (let i = 0; i < 7; i++) {
        let cardBack = document.createElement("div");
        let card = document.createElement("div");
        player2.push(deck[i]);
        if (deck[i].Suit == "♠" || deck[i].Suit == "♣") {
            card.className = 'blackCard';
        }
        else {
            card.className = 'redCard';
        }
        card.id = "computercard" + [i]
        let icon = deck[i].Suit;
        card.innerHTML = deck[i].Value + '<br>' + icon;
        document.getElementById("player2").appendChild(card);
        cardBack.innerHTML = "Vegas Millionaire Suite";
        cardBack.className = 'computerCards';
        document.getElementById("player2").appendChild(cardBack);
        deck.shift();
    }
}

function deckRemain(deck) {
    let cardDeck = deck;
}

//function that lets the player choose a card to pair up
function pickCard() {
    console.log("pickCard");
    let longer = 0;
    if (player1.length > player2.length) {
        longer = player1.length;
    }
    else {
        longer = player2.length;
    }
    for (let i = 0; i < longer; i++) {
        console.log(player1[i]);
    }
    checkWin();
    player = 2;
}
function checkWin() {
    console.log("checkWin");
    if (player1.length == 0) {
        console.log("player 1 wins")
        gameState = state.P1WINS;
    }
    else {
        pickCard();
    }
}

function createDeck() {
    deck = getDeck(suits,values);
    shuffle(deck);
    cardAssign(deck);
    gameState = state.PLAYING;
    document.querySelector('.p1score').innerHTML = "0";
    document.querySelector('.p2score').innerHTML = "0";

    //creates arrays for both hands with just card value
    const cardValPlayer = player1.map(function (item) {
        return item.Value;
    });
    const cardValComputer = player2.map(function (item) {
        return item.Value;
    });
    player1cards = cardValPlayer;
    player2cards = cardValComputer;


}

//just a test function right now
function check() {
    var message;
    var a = document.getElementById("player1card0");
    var b = document.getElementById("player1card1");
    var c = document.getElementById("player1card2");
    
    a.onclick = function() {
        console.log(player1[0].Value);
        for (let i = 0; i <7; i++) {
            console.log(player2[i].Value)
            if (player1[0].Value === player2[i].Value) {
                message = "yes"
                break;
            }
            else {
                message = "no";
            }

        }
        alert(message)
    }
    b.onclick = function() {
        for (let i = 0; i <7; i++) {
            if (player1[1].Value === player2[i].Value) {
                message = "yes"
                break;
            }
            else {
                message = "no";
            }

        }
        alert(message)
    }
    c.onclick = function() {
        for (let i = 0; i <7; i++) {
            if (player1[2].Value === player2[i].Value) {
                message = "yes"
                break;
            }
            else {
                message = "no";
            }

        }
        alert(message)
    }
}

//checks for pairs in both hands and removes them when the game starts
function checkPairs() {
    console.log(player1cards)
    // for (let i = 0; i < 7;i++) {
        
    // }
}

window.onload = function() {
    // this.createDeck(deck);
};