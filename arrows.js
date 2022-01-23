function addArrowButtons() {
    let row01 = document.createElement("button"); row01.setAttribute("id", "row01");
    let row03 = document.createElement("button"); row03.setAttribute("id", "row03");
    let row05 = document.createElement("button"); row05.setAttribute("id", "row05");
    row01.classList.add("arrowsDown"); row03.classList.add("arrowsDown"); row05.classList.add("arrowsDown");

    let col16 = document.createElement("button"); col16.setAttribute("id", "col16");
    let col36 = document.createElement("button"); col36.setAttribute("id", "col36");
    let col56 = document.createElement("button"); col56.setAttribute("id", "col56");
    col16.classList.add("arrowsLeft"); col36.classList.add("arrowsLeft"); col56.classList.add("arrowsLeft");

    let col10 = document.createElement("button"); col10.setAttribute("id", "col10");
    let col30 = document.createElement("button"); col30.setAttribute("id", "col30");
    let col50 = document.createElement("button"); col50.setAttribute("id", "col50");
    col10.classList.add("arrowsRight"); col30.classList.add("arrowsRight"); col50.classList.add("arrowsRight");

    let row61 = document.createElement("button"); row61.setAttribute("id", "row61");
    let row63 = document.createElement("button"); row63.setAttribute("id", "row63");
    let row65 = document.createElement("button"); row65.setAttribute("id", "row65");
    row61.classList.add("arrowsUp"); row63.classList.add("arrowsUp"); row65.classList.add("arrowsUp");

    const arrowButtons = [row01, row03, row05, col16, col36, col56, col10, col30, col50, row61, row63, row65];
    for(let i = 0; i < 12; i++) {
        document.getElementById("arrowBtnsDiv").appendChild(arrowButtons[i]);
        arrowButtons[i].classList.add("arrows");
    }

}