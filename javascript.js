let colorPixel = (e) => {
    e.target.style.backgroundColor = "black";
}

let createGrid = (numSquares) => {
    const grid = document.querySelector("#squareGrid");

    for (let row = 0; row < numSquares; row++) {
        const newRow = document.createElement("div");
        newRow.classList.add("squareRow");

        for (let col = 0; col < numSquares; col++) {
            const newSquare = document.createElement("div");
            newSquare.classList.add("square");
            newSquare.addEventListener("mouseenter", colorPixel);
            newSquare.style.width = `${100/numSquares}%`;
            newRow.appendChild(newSquare);
        }

        grid.appendChild(newRow);
    }
}



createGrid(32);