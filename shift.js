//changes: refactored the code. Edited shifts so that it is known from id what index to move. Added additional for loop to change coordinates of affected players by the shift
//         Also added arrows right-click event handler which makes the leftoverRoom rotate
function arrowEventHandler(e) { 
    // console.log(e.target, 'was clicked');
    const id = e.target.getAttribute("id");
    const chosenI = parseInt (id[id.length-2]); // choosing a character from id then using as coordinates
    const chosenJ = parseInt (id[id.length-1]);
    if(e.target.classList[0] == "arrowsDown") {
        
        for(let i = 0; i < table.length; i++) {
            let curr = table[i][chosenJ];
            // ---------------FROM HERE --------------------------
            for (const p of curr.players){//For every player that exists in this room
                if (i === table.length - 1){//if there is/are player/-s on the edge, then move them all to the other side
                    p.i = 0;
                    table[i][chosenJ].removePlayer (p);
                    table[0][chosenJ].addPlayer (p);
                }
                else{//else just edit coordinate
                    p.i++;
                }
            }
            //---------------TILL HERE IS EDITED (change is made for every following such cases)------------------
            table[i][chosenJ] = leftoverRoom;
            leftoverRoom = curr;
        }
    } else if(e.target.classList[0] == "arrowsUp") { 
        for(let i = table.length-1; i >= 0; i--) {
            let curr = table[i][chosenJ];
            //The change:
            for (const p of curr.players){
                if (i === 0 && curr.players !== [] ){
                    p.i = table.length-1;
                    table[i][chosenJ].removePlayer (p);
                    table[table.length-1][chosenJ].addPlayer (p);
                }
                else {
                    p.i--; 
                }
            }
                
            table[i][chosenJ] = leftoverRoom;
            leftoverRoom = curr;
        }  
    } else if(e.target.classList[0] == "arrowsLeft") {

        for(let j = table.length-1; j >= 0; j--) {
            let curr = table[chosenI][j];
            // the change:
            for (const p of curr.players){
                if (j === 0 && curr.players !== [] ){
                    p.j = table.length-1;
                    table[chosenI][j].removePlayer (p);
                    table[chosenI][table.length-1].addPlayer (p);
                }
                else {
                    p.j--; 
                }
            }
            
            table[chosenI][j] = leftoverRoom;
            leftoverRoom = curr;
        }
    } else if(e.target.classList[0] == "arrowsRight") {
        for(let j = 0; j < table.length; j++) {
            let curr = table[chosenI][j];
             // the change:
            for (const p of curr.players){
                if (j === table.length - 1 && curr.players !== [] ){
                    p.j = 0;
                    table[chosenI][j].removePlayer (p);
                    table[chosenI][0].addPlayer (p);
                }
                else {
                    p.j++; 
                }
            }
            
            table[chosenI][j] = leftoverRoom;
            leftoverRoom = curr;
        }

    } 
    updateTable();
}


function arrowRightClick (e){
    if (e.target.classList[1] === 'arrows'){
        e.preventDefault();
        leftoverRoom.rotate();
        updateTable();
    }
    
}

