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
let resultsContainer = document.getElementById('results');
let cardsRemaining = document.getElementById('cardsRemaining');
let player1cards, player2cards, pairsPlayer, pairsComp, player, cardToMatchValue;
let statusBlock = document.querySelector('.statusBlock')

//array Variables
let cardsArray = [];
let shuffledArray = [];
let player1 = [];
let player2 = [];

//Game Buttons
    //assigns variables to the game buttons
const gameStart = document.querySelector('.btn-start');
const gameDeal = document.querySelector('.btn-deal');
    //event listeners for the buttons

gameDeal.addEventListener('click',createDeck,false);

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
let deck = [];
let suits = ["♠", "♦", "♣", "♥"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

//gets the deck
function getDeck()
{
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
    gameStart.addEventListener('click',gameBegin,false);
    document.getElementById('player1').innerHTML = 'Player 1 Cards' + '<br>';
    document.getElementById('player2').innerHTML = 'Computer Cards' + '<br>';

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
    document.getElementById("remaining-deck").innerHTML = "Remaining Deck:" + deck.length;
}

//main function for the game
function gameBegin() {
    gameStart.disabled = true;
    gameDeal.disabled = true;

    //removes initial pairs at the start
    checkPairs();

    //player with more cards left goes first
    if (player1.length > player2.length || player1.length === player2.length) {
        player = 1;
    }
    else {
        player = 2;
        
    };
    switch (player) {
        case 1:
            textModal.innerHTML = "Player " + player + "'s Turn";
            modal.style.display = "block";
            console.log("player 1 go!");
            pickCard(player);
            break;
        case 2:
            textModal.innerHTML = "Player " + player + "'s Turn";
            modal.style.display = "block";
            console.log("player 2 go!");
            setTimeout(function(){ pickCard(player) }, 2000);
            break;
        default:
            console.log("something went wrong");
            break;
      }

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

//generic event listener that is used to capture card clicks
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
    document.getElementById(turn).innerHTML = "Go!";

    if (player === 1) {
        for (let i = 0; i < player1cards.length; i++) {
            let element = document.getElementById("player1card" + [i]);
            let cardValue = player1cards[i];
            addListener('click', element, function () {
                playerCheckCard(cardValue);
            })
        }
    }
    else if(player === 2) {
        setTimeout(computerAI,4000);
    }
    document.getElementById(turn).innerHTML = "Player " + player;
}

//Player function that checks to see if the selected card (cardValue) is a match
function playerCheckCard(cardValue) {
    let cardIndex;
    let match = false;

    //checks the computer hand for a card to make a pair
    for( let i = 0; i < player2cards.length; i++) {
        if (cardValue === player2cards[i]) {
            match = true;
            cardIndex = player1cards.indexOf(cardValue)
            console.log("index is # " + cardIndex)
            player1cards.splice( cardIndex, 1 );
            player2cards.splice( i, 1 );
            player1.splice( cardIndex, 1 );
            player2.splice( i, 1 );
            console.log("Pair made!")
            break;
        }
        else {
            match = false;
        }
    }
    if (!match) {
        console.log("no match for player choice")
        let newCard = deck.pop();
        console.log("new card added is " + newCard.Value)
        player1cards.push(newCard.Value);
        player1.push(newCard);
        document.getElementById("remaining-deck").innerHTML = "Remaining Deck:" + deck.length;
    }
    //redraw card hands
    checkPairs();
    console.log(player1cards);
    console.log(player2cards);
    console.log(deck.length)
    if (player === 1) {
        player = 2;
        textModal.innerHTML = "Player " + player + "'s Turn";
        modal.style.display = "block";
        setTimeout(checkWin,1000);
        setTimeout(function(){ pickCard( player) }, 3000);
    }
    else {
        player = 1;
        textModal.innerHTML = "Player " + player + "'s Turn";
        modal.style.display = "block";
        setTimeout(checkWin,1000);
        pickCard(player);
    }
}

//Computer AI for selecting a random card to pair
function computerAI() {
    let randomSelection = player2cards[Math.floor(Math.random()*player2cards.length)];
    let match = false;
    let cardIndex;
    for( let i = 0; i < player1cards.length; i++) {
        if (randomSelection === player1cards[i]) {
            cardIndex = player2cards.indexOf(randomSelection)
            match = true;
            player2cards.splice( cardIndex, 0 );
            player1cards.splice( i, 0 );
            player2.splice( cardIndex, 0 );
            player1.splice( i, 0 );
            console.log("Pair made!")
            break;
        }
        else {
            match = false;
        }
    }
    if (!match) {
        // alert("no match on that selection");
        let newCard = deck.pop();
        player2cards.push(newCard.Value)
        player2.push(newCard)
        document.getElementById("remaining-deck").innerHTML = "Remaining Deck:" + deck.length;
        console.log("no match on that selection for computer");
    }
    checkPairs();
    checkWin();
    if (player === 2) {
        player = 1;
        textModal.innerHTML = "Player " + player + "'s Turn";
        modal.style.display = "block";
        pickCard(player);
    }
    else {
        player = 2;
        textModal.innerHTML = "Player " + player + "'s Turn";
        modal.style.display = "block";
        setTimeout(function(){ pickCard( player) }, 3000);
    }
}

//determines if the game is finished
function checkWin() {
    console.log("checking Win");
    if (player1.length === 0) {
        console.log("player 1 wins")
        gameState = state.P1WINS;
        alert("Congrats, you won!")
        gameDeal.disabled = false;
    }
    else if (player2.length === 0) {
        console.log("player 2 wins")
        gameState = state.P2WINS;
        alert("Game over, Computer wins")
        gameDeal.disabled = false;
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

//checks for pairs in both hands and removes them
function checkPairs() {
    console.log("checking for pairs")
    //remove player duplicates from hand  (fix for three of a kind!)
    pairsPlayer = player1cards.filter((e, i, a) => a.indexOf(e) !== i);
    player1cards = player1cards.filter(item => !pairsPlayer.includes(item));
    player1 = player1.filter( i => !pairsPlayer.includes( i.Value ) );

    //remove computer pairs from hand 
    pairsComp = player2cards.filter((e, i, a) => a.indexOf(e) !== i);
    player2cards = player2cards.filter(item => !pairsComp.includes(item));
    player2 = player2.filter( i => !pairsComp.includes( i.Value ) );

    document.getElementById('player1').innerHTML = 'Player 1 Cards' + '<br>';
    document.getElementById('player2').innerHTML = 'Computer Cards' + '<br>';

    document.querySelector('.p1score').innerHTML = pairsPlayer.length;
    document.querySelector('.p2score').innerHTML = pairsComp.length;

    if (pairsPlayer > 0 || pairsComp > 0) {
        console.log("pairs were removed")
    }
    console.log(player1)
    console.log(player1cards)
    createDivCards(player1,player2);

}

function createDivCards(player1,player2) {
    console.log("Computer Hand: " + player2cards)
    //reset player hands on screen
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
}