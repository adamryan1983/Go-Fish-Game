# Go Fish Game

![Screenshot](/images/gofishscreenshot.png)

 Card game of Go Fish built using Javascript, CSS, and HTML.

 This game is being built/maintained as part of a college programming course.

 Currently, this is just a 1 player game:
 * Player vs computer

 The game board is designed using basic css and html, the rest is done using Javascript.

 The game board is loaded at the start. The player then presses 'New Game', and this triggers a
 function that will shuffle the cards and deal **7** cards per player.

 ## Tips and Tricks used
 The computer is dealt 7 cards, and the javascript creates divs for the cards
 and assigns classes/ids to them. The computer hand actually has 14 divs:
 * One is face down, one is face up. The face up side is hidden until a pair is made.

 * When the game is started, pairs are taken out of both hands and the score is incremented for both teams.

## Languages used:
* Javascript (trying to use most up to date synatx)
* HTML5
* CSS

 ### Tutorials used:
[Enums](https://www.sohamkamani.com/blog/2017/08/21/enums-in-javascript/)

[Coding a card deck in Javascript](https://www.thatsoftwaredude.com/content/6196/coding-a-card-deck-in-javascript)

[Intro to CSS 3D Transforms](https://3dtransforms.desandro.com/card-flip)