//changes: added getCurrentTime() getCurrentTreasure ()
let btnNumofPlayers = document.querySelector('#setNumofPlayers');
let btnNumofCards = document.querySelector('#setNumofCards');
let messageToNumOfCards = document.querySelector('#messageToNumOfCards');
let textNumOfCards = document.querySelector('#textNumOfCards');

const numOfPlayers = document.getElementById('numOfPlayers');
const numOfCards = document.querySelector('#numOfCards');
class Player {
    constructor(name, i, j) {
        this.name = name;
        this.treasures = [];
        this.i = i;
        this.j = j;
        this.icon = `<img src="${name}.png" width="50%" height="50%" class="player">`;

    }
    getCurrentTreasure (){
        if (this.treasures !== []){
            return this.treasures[this.treasures.length - 1];
        }
        return '';
    }
    setTreasure(cards) {
        this.treasures = cards;
    }
    moveRight() {
        if(this.j+1 <= 6 && table[this.i][this.j].hasRight && table[this.i][this.j+1].hasLeft ) {
            table[this.i][this.j].removePlayer(this);
            table[this.i][this.j+1].addPlayer (this);
            this.j = this.j+1;
        }
    }
    moveLeft() {
        if(this.j-1 >= 0 && table[this.i][this.j].hasLeft && table[this.i][this.j-1].hasRight) {
            table[this.i][this.j].removePlayer(this);
            table[this.i][this.j-1].addPlayer (this);
            this.j = this.j-1;
        }
    }
    moveDown() {
        if(this.i+1 <= 6 && table[this.i][this.j].hasBottom && table[this.i+1][this.j].hasTop) {
            table[this.i][this.j].removePlayer(this);
            table[this.i+1][this.j].addPlayer (this);
            this.i = this.i+1;
        }
    }
    moveUp() {
        if(this.i-1 >= 0 && table[this.i][this.j].hasTop && table[this.i-1][this.j].hasBottom) {
            table[this.i][this.j].removePlayer(this);
            table[this.i-1][this.j].addPlayer (this);
            this.i = this.i-1;
        }
    }
}

const cards = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", 
               "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X"];

const playerCat = new Player("cat", 0, 0);
const playerPuppy = new Player("puppy", 0, 6);
const playerSnail = new Player("snail", 6, 0);
const playerTurtle = new Player("turtle", 6, 6);

const totalPlayers = [playerCat, playerPuppy, playerSnail, playerTurtle];

let currGamePlayers = new Array();

btnNumofPlayers.addEventListener('click', (e) => {
    if(parseInt(numOfPlayers.value) > 4 || parseInt(numOfPlayers.value) < 1 || numOfPlayers.value === "") {
        e.preventDefault();
        alert('Invalid! The number of players cannot be greater than 4 or less than 1');
    } 
    else{
        //numPlayers = parseInt(numOfPlayers.value);
        messageToNumOfCards.innerHTML = "You can choose from 1 up to " + 24/parseInt(numOfPlayers.value) + " cards per player.";
    }
})
  
btnNumofCards.addEventListener('click', (e) => {
    if(parseInt(numOfCards.value) > 24/parseInt(numOfPlayers.value) || parseInt(numOfCards.value) < 1 || numOfCards.value === "") {
        e.preventDefault();
        alert('Invalid! The number of cards must be appropriate');
    } 
    else {
        //numCards = parseInt(numOfCards.value); fillCurrTreasures(); 
        textNumOfCards.innerHTML = "Now, press 'New Game' button to start a new game with the given number of players and cards!";
        fillCurrTreasures(); createTreasureArray();
    }
})

let currGameTreasures = new Array();

function fillCurrTreasures() { console.log(parseInt(numOfCards.value)*parseInt(numOfPlayers.value) + "it will appear");
    for(let i = 0; i < parseInt(numOfCards.value)*parseInt(numOfPlayers.value); i++) {
        currGameTreasures[i] = cards[i]; 
    }
}

 //console.log(parseInt(numCards*numPlayers));

let treasures = new Array();

function createTreasureArray() {
    for(let i = 0; i < 46; i++) {
        if(i < parseInt(numOfCards.value)*parseInt(numOfPlayers.value)) {
            //console.log(numCards*numPlayers);
            treasures[i] = currGameTreasures[i]; console.log(treasures[i]);
            //console.log(currGameTreasures[i]); 
        }
        else {
            treasures[i] = " ";
        }
    }
}

function randomTreasure() {
    let randomIndex = Math.floor(Math.random() * treasures.length);
    let randomElem = treasures[randomIndex];
    treasures.splice(randomIndex, 1);
    //console.log(randomElem);
    return randomElem;
}


function randomCard() {
    let randomIndex = Math.floor(Math.random() * currGameTreasures.length);
    let randomElem = currGameTreasures[randomIndex];
    cards.splice(randomIndex, 1);
    //currGameTreasures.push(randomElem);
    return randomElem;
}

function spreadCards(numPl, numCa) {
    let cardsPerPlayer = new Array();
    for(let i = 0; i < numPl; i++) {
        for(let j = 0; j < numCa; j++) {
            cardsPerPlayer.push(randomCard());
        }
        totalPlayers[i].setTreasure(cardsPerPlayer);
    }
}

function createPlayers() {
    let numPlayers = parseInt(numOfPlayers.value);
    let numCards = parseInt(numOfCards.value);
    spreadCards(numPlayers, numCards);
    for(let i = 0; i < numPlayers; i++) {
        currGamePlayers.push(totalPlayers[i]);
    }

    if(numPlayers === 1) {
        table[6][6].addPlayer(currGamePlayers[0]);
    }
    else if(numPlayers === 2) {
        table[0][0].addPlayer(currGamePlayers[0]);
        table[6][6].addPlayer(currGamePlayers[1]);
    }
    else if(numPlayers === 3) {
        table[0][0].addPlayer(currGamePlayers[0]);
        table[6][6].addPlayer(currGamePlayers[1]);
        table[0][6].addPlayer(currGamePlayers[2]);
    }
    else if(numPlayers === 4) {
        table[0][0].addPlayer(currGamePlayers[0]);
        table[6][6].addPlayer(currGamePlayers[1]);
        table[0][6].addPlayer(currGamePlayers[2]);
        table[6][0].addPlayer(currGamePlayers[3]);
    }
}



