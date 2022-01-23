//Changes: finished setDoors(); edited addPlayer()

class Room {
    constructor(type, degree, treasure) { 
        this.type = type;
        this.degree = degree;
        this.players = [];
        this.treasure = treasure;
        this.setImage(type, degree, treasure, this.players);
        this.setDoors();
    }
    setImage(type, degree, treasure, players) {
        let playerIcon = '';
        for (const e of players){
            playerIcon += e.icon; 
            //playerIcon += e.name;
        }   
        this.image = `<img src="${type}.png" width="100%" height="100%" style="transform: rotate(${degree}deg)"><div class="roomContent">${treasure}${playerIcon}</div>`;
    }
    updateRoom (){
        this.setImage (this.type, this.degree, this.treasure, this.players);
    }
    addPlayer (player){
        this.players.push (player);
        //if treasure is here then delete the treasure and remove it from treasure list
        if (this.treasure == player.getCurrentTreasure()){ //do not use === because this.treasure is a string and getCurrentTreasure is a number
            this.treasure = '';
            player.treasures.pop();
        }
        this.updateRoom();
    }
    removePlayer (player){
        this.players.splice (this.players.indexOf(player), 1);
        this.updateRoom();
    }
    setDoors() {
        if(this.type == "I") {
            if(this.degree === 0 || this.degree === 180) {
                this.hasLeft = true;
                this.hasRight = true;
                this.hasBottom = false;
                this.hasTop = false;
            }
            else {
                this.hasBottom = true;
                this.hasTop = true;
                this.hasLeft = false;
                this.hasRight = false;
            }
        }
        else if(this.type == "T") {
            if(this.degree === 0) {
                this.hasLeft = true;
                this.hasRight = true;
                this.hasBottom = true;
                this.hasTop = false;
            }
            else if(this.degree === 90){
                this.hasBottom = true;
                this.hasTop = true;
                this.hasLeft = true;
                this.hasRight = false;
            }
            else if(this.degree === 180){
                this.hasBottom = false;
                this.hasTop = true;
                this.hasLeft = true;
                this.hasRight = true;
            }
            else{
                this.hasBottom = true;
                this.hasTop = true;
                this.hasLeft = false;
                this.hasRight = true;
            }
        }
        else if(this.type == "B") {
            if(this.degree === 0){
                this.hasBottom = true;
                this.hasTop = false;
                this.hasLeft = false;
                this.hasRight = true;
            }
            else if(this.degree === 90){
                this.hasBottom = true;
                this.hasTop = false;
                this.hasLeft = true;
                this.hasRight = false;
            }
            else if(this.degree === 180){
                this.hasBottom = false;
                this.hasTop = true;
                this.hasLeft = true;
                this.hasRight = false;
            }
            else{
                this.hasBottom = false;
                this.hasTop = true;
                this.hasLeft = false;
                this.hasRight = true;
            }
        }
    }
    rotate(){
        this.degree += 90;
        this.updateRoom();
    }
}

const table = new Array(7); 
const  degrees = [0, 90, 180, 270]; 

let randomRooms = new Array();
let leftoverRoom;
let fixedRooms = new Array();

function createFixedRooms() { //console.log(treasures);
        fixedRooms = [new Room("B", 0, ""), new Room("T", 0, randomTreasure()), new Room("T", 0, randomTreasure()), new Room("B", 90, ""), 
                    new Room("T", 270, randomTreasure()), new Room("T", 270, randomTreasure()), new Room("T", 0, randomTreasure()), new Room("T", 90, randomTreasure()),
                    new Room("T", 270, randomTreasure()), new Room("T", 180, randomTreasure()), new Room("T", 90, randomTreasure()), new Room("T", 90, randomTreasure()),
                    new Room("B", 270, ""), new Room("T", 180, randomTreasure()), new Room("T", 180, randomTreasure()), new Room("B", 180, "")];
    //return fixedRooms;
}

function createRandomRooms() {
    let newRoom;
    for(let i = 0; i < 34; i++) {
        let randDegInd = Math.floor(Math.random() * degrees.length);
        if(i < 15) {
            newRoom = new Room("B", degrees[randDegInd], randomTreasure());
            randomRooms.push(newRoom);
        } else if(i > 15 && i < 28) {
            newRoom = new Room("I", degrees[randDegInd], randomTreasure());
            randomRooms.push(newRoom);
        } else {    
            newRoom = new Room("T", degrees[randDegInd], randomTreasure());
            randomRooms.push(newRoom);
        }
    }  
    //console.log(randomRooms.length);
}

//createRandomRooms();

function randomRoomGetter() {
    let randomIndex = Math.floor(Math.random() * randomRooms.length);
    let randomElem = randomRooms[randomIndex];
    randomRooms.splice(randomIndex, 1);
    //console.log(randomElem);
    return randomElem;
}

function createTable() {
    let k = 0;
    for(let i = 0; i < 7; i++) {
        const row = new Array(7);
        table[i] = row;
    }

    for(let i = 0; i < 7; i++) {
        for(let j = 0; j < 7; j++) {
            if      (i==0 && j==0) { table[i][j] = fixedRooms[k++]; }
            else if (i==0 && j==2) { table[i][j] = fixedRooms[k++]; }
            else if (i==0 && j==4) { table[i][j] = fixedRooms[k++]; }
            else if (i==0 && j==6) { table[i][j] = fixedRooms[k++]; }
            else if (i==2 && j==0) { table[i][j] = fixedRooms[k++]; }
            else if (i==2 && j==2) { table[i][j] = fixedRooms[k++]; }
            else if (i==2 && j==4) { table[i][j] = fixedRooms[k++]; }
            else if (i==2 && j==6) { table[i][j] = fixedRooms[k++]; }
            else if (i==4 && j==0) { table[i][j] = fixedRooms[k++]; }
            else if (i==4 && j==2) { table[i][j] = fixedRooms[k++]; }
            else if (i==4 && j==4) { table[i][j] = fixedRooms[k++]; }
            else if (i==4 && j==6) { table[i][j] = fixedRooms[k++]; }
            else if (i==6 && j==0) { table[i][j] = fixedRooms[k++]; }
            else if (i==6 && j==2) { table[i][j] = fixedRooms[k++]; }
            else if (i==6 && j==4) { table[i][j] = fixedRooms[k++]; }
            else if (i==6 && j==6) { table[i][j] = fixedRooms[k++]; }
            else {
                table[i][j] = randomRoomGetter();
            }
        }
    }
    leftoverRoom = randomRooms[randomRooms.length-1];
    //console.log(leftoverRoom);
}
