"use strict";

let numberOfCards = 52;
let numberOfPlayers = 2;
let cardsPerPlayer = 7;
let cardToMatchInput = document.getElementById('cardToMatchInput');
let cardToMatchValue;
let resultsContainer = document.getElementById('results');
let cardsRemaining = document.getElementById('cardsRemaining');
// let deck = getDeck();

//array Variables
let cardsArray = [];
let shuffledArray = [];
let player1 = [];
let player2 = [];

//test
const gameStart = document.querySelector('.btn-new');
const gameDeal = document.querySelector(".btn-deal");

//event listeners
gameStart.addEventListener('click',createDeck);
gameDeal.addEventListener('click', shuffle);

//full deck of cards
var suits = ["♠", "♦", "♣", "♥"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

//gets the deck
function getDeck()
{
	let deck = new Array();

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
    document.getElementById('player2').innerHTML = 'Player 2 Cards' + '<br>';

    for (let i = 0; i < 7; i++) {
        let card = document.createElement("div");
        player1.push(deck.shift());
        // document.createElement("div")
        if (deck[i].Suit == "♠" || deck[i].Suit == "♣") {
            card.className = 'blackCard';
        }
        else {
            card.className = 'redCard';
        }
        let icon = deck[i].Suit;
        card.innerHTML = deck[i].Value + '<br>' + icon;
	    document.getElementById("player1").appendChild(card);
    }

    for (let i = 0; i < 7; i++) {
        let card = document.createElement("div");
        player2.push(deck.shift());
        if (deck[i].Suit == "♠" || deck[i].Suit == "♣") {
            card.className = 'blackCard';
        }
        else {
            card.className = 'redCard';
        }
        // let icon = deck[i].Suit;
        // card.innerHTML = deck[i].Value + '<br>' + icon;
        card.innerHTML = "Vegas Millionaire Suite";
        card.className = 'computerCards'
	    document.getElementById("player2").appendChild(card);
    }
    deckRemain(deck);
}

function deckRemain(deck) {
    let cardDeck = deck;
}

function createDeck(deck) {
    deck = getDeck(suits,values);
    shuffle(deck);
    this.cardAssign(deck);
    this.deckRemain(deck);
}

function printWord() {
    console.log("hi");
}

window.onload = function() {
    // this.createDeck(deck);
};