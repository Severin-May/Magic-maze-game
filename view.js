//changes: added another event listener to arrows (right click listener). Moved leftover innerHMTL update into updateTable() function

let board = document.querySelector('#board');
let btnStart = document.querySelector('#btnStart');
let btnInstructions = document.querySelector('#btnInstructions');

let link = document.querySelector('link');
let leftover = document.querySelector('#leftover');


//const myPlayer = new Player ("puppy", 0, 0);// TODO: create list of players that take control of movement one by one

btnStart.addEventListener('click', startGameHandler);

// should it be after pressing START button???

function startGameHandler(e) {
    if(numOfPlayers.value === "" || numOfCards.value === "") {
        e.preventDefault();
    }
    else {
        createRandomRooms();
        createFixedRooms(); //change its name if it happens to work
        createTable();
        createPlayers();
        link.setAttribute("href", "indexAfter.css");
        //table[0][0].addPlayer(myPlayer);
        updateTable();
        addArrowButtons(); 
        let arrowBtnDiv = document.querySelector('#arrowBtnsDiv');
        arrowBtnDiv.addEventListener('click', arrowEventHandler);  
        arrowBtnDiv.addEventListener('contextmenu', arrowRightClick); // ADDED contextmenu aka right-click event listener which rotates the leftoverRoom
    }
}

btnInstructions.addEventListener('click', (e) => {
    document.querySelector(".instrContent").classList.toggle("show");
})

document.addEventListener ('keyup', e => {
    for(let i = 0; i < currGamePlayers.length; i++) {
        let currPlayer = currGamePlayers[i];
        if (e.code === 'ArrowUp'){
            currPlayer.moveUp ();
            updateTable();
        }
        else if (e.code === 'ArrowDown'){
            currPlayer.moveDown ();
            updateTable();
        }
        else if (e.code === 'ArrowLeft'){
            currPlayer.moveLeft ();
            updateTable();
        }
        else if (e.code === 'ArrowRight'){
            currPlayer.moveRight ();
            updateTable();
        }
}
})

function updateTable() {
    //console.log(table);
    let mytable = "<table><tr>";
    for (let i = 0; i < table.length; i++) {  
        for(let j = 0; j < table.length; j++) {
            mytable += "<td class='cell'>" + table[i][j].image + "</td>"; 
        }
            mytable += "</tr></table>"; 
    }  
    board.innerHTML = mytable;
    leftoverRoom.updateRoom();
    leftover.innerHTML = leftoverRoom.image;
}
