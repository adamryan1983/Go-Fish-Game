"use strict";

//set states for game status
const state = {
    PLAYING: 'playing',
    P1WINS: 'Player 1 Wins!',
    P2WINS: 'Computer Player Winss!',
    DRAW: 'draw',
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
gameStart.addEventListener('click',gameBegin,false);
gameDeal.addEventListener('click',createDeck,false);

// player2[2].addEventListener('click', reveal, false);


///////   Code for Modal Window   ///////
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//get the text from the modal
var textModal = document.getElementById("modal-text");

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// function reveal(player1) {
//     player1[2].className = "computerDeck";
// }

//full deck of cards
var suits = ["♠", "♦", "♣", "♥"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

//gets the deck
function getDeck()
{
	let deck = [];

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

//assigns card to both players
function cardAssign(deck) {
    document.getElementById('player1').innerHTML = 'Player 1 Cards' + '<br>';
    document.getElementById('player2').innerHTML = 'Computer Cards' + '<br>';
    player1 = [];
    player2 = [];

    //player cards
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

//main function for the game
function gameBegin() {
    checkPairs();
    gameStart.disabled = true;
    gameDeal.disabled = true;

    //player with more cards left goes first
    if (player1.length > player2.length || player1.length === player2.length) {
        player = 1;
    }
    else {
        player = 2;
    };

    //loop that continues the game until there is a winner
    while(gameState === state.PLAYING) {
        //maybe use while gamestate = playing?
        pickCard(player);
        break;
    };
    if (gameState === state.P1WINS) {
        textModal.innerHTML = "Player 1 Wins!!";
    }
    else if (gameState === state.P2WINS) {
        textModal.innerHTML = "Player 2 Wins!!";
    } 
    else if(gameState === state.P1WINS) {
        textModal.innerHTML = "TIE GAME!!!";
    }
}

//NA
function deckRemain(deck) {
    let cardDeck = deck;
}

function addListener(event, obj, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(event, fn, false);   // modern browsers
    } else {
        obj.attachEvent("on"+event, fn);          // older versions of IE
    }
}

//function that lets the player choose a card to pair up
function pickCard(player) {
    let turn = player === 1 ? "player1header" : "player2header";
    document.getElementById(turn).innerHTML = "Computer's Turn";
    textModal.innerHTML = "Player " + player + "'s Turn";
    modal.style.display = "block";

    if (player === 1) {
        for (let i = 0; i < player1cards.length; i++) {
            let element = document.getElementById("player1card" + [i]);
            let cardValue = player1cards[i];
            addListener('click', element, function () {
                check(cardValue);
            });
        }
    }

    console.log(player)

    checkWin();
    if (player === 1) {
        player = 2;
    }
    else {
        player = 1;
    }
    console.log(player);
    console.log(gameState);

    return gameState;
}

//determines if the game is finished
function checkWin() {
    console.log("checkWin");
    if (player1.length === 0) {
        console.log("player 1 wins")
        gameState = state.P1WINS;
    }
    else if (player2.length === 0) {
        console.log("player 2 wins")
        gameState = state.P2WINS;
    } 
    else {
        gameState = state.PLAYING;
    }
}

//creates the initial deck
function createDeck() {
    let deck = getDeck(suits,values);
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

//checks for pairs in both hands and removes them when the game starts
function checkPairs() {

    //remove player duplicates from hand  (fix for three of a kind!)
    let pairsPlayer = player1cards.filter((e, i, a) => a.indexOf(e) !== i);
    player1cards = player1cards.filter(item => !pairsPlayer.includes(item));
    player1 = player1.filter( i => !pairsPlayer.includes( i.Value ) );

    //remove computer pairs from hand 
    let pairsComp = player2cards.filter((e, i, a) => a.indexOf(e) !== i);
    player2cards = player2cards.filter(item => !pairsComp.includes(item));
    player2 = player2.filter( i => !pairsComp.includes( i.Value ) );

    document.getElementById('player1').innerHTML = 'Player 1 Cards' + '<br>';
    document.getElementById('player2').innerHTML = 'Computer Cards' + '<br>';
    
    //creates the divs for the remaining cards
    for (let i = 0; i<player1.length; i++) {
        let card = document.createElement("div");
        if (player1[i].Suit == "♠" || player1[i].Suit == "♣") {
            card.className = 'blackCard';
        }
        else {
            card.className = 'redCard';
        }
        card.id = "player1card" + [i]
        let icon = player1[i].Suit;
        // cardback.className = 'computerCards'
        card.innerHTML = player1[i].Value + '<br>' + icon;
        document.getElementById("player1").appendChild(card);
        card.style.animation = "flip 1s 1";
    }
    for (let i = 0; i < player2.length; i++) {
        let cardBack = document.createElement("div");
        let card = document.createElement("div");
        if (player2[i].Suit == "♠" || player2[i].Suit == "♣") {
            card.className = 'blackCard';
        }
        else {
            card.className = 'redCard';
        }
        card.id = "computercard" + [i]
        let icon = player2[i].Suit;
        card.innerHTML = player2[i].Value + '<br>' + icon;
        document.getElementById("player2").appendChild(card);
        cardBack.innerHTML = "Vegas Millionaire Suite";
        cardBack.className = 'computerCards';
        document.getElementById("player2").appendChild(cardBack);
        cardBack.style.animation = "flip 1s 1";
        card.style.animation = "flip 1s 1";
    }
    document.querySelector('.p1score').innerHTML = pairsPlayer.length;
    document.querySelector('.p2score').innerHTML = pairsComp.length;
}
   

function check(cardValue) {
    console.log("reveal both hands for testing")
    console.log(player1cards)
    console.log(player2cards)
    //checks the computer hand for a card to make a pair
    for( let i = 0; i < player2cards.length; i++) {
        if (cardValue === player2cards[i]) {
            alert("we have a match")
            break;
        }
    }
}

window.onload = function() {
    // this.createDeck(deck);
};