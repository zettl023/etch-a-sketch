// Global variables (if we were using React for this, they would be states!)
let gridSize = 16; // the default grid size is 16x16
let randomizeColors = false;

/** 
* Generates a random value within the range of acceptable RGB single color values.
* @returns {number} A random integer between 0 and 255.
*/
let getRandomRGBValue = () => {
     return Math.floor(Math.random() * 255);
}

/**
* Changes the background color of the element specified by e.
* If randomizeColors is true, the background color is randomized. Otherwise, the color is black.
* @param {MouseEvent} e Details about the square hovered over by the mouse. 
* @sideEffect Changes the background color of the square hovered over.
*/
let colorPixel = (e) => {
    if (randomizeColors) {
        const rValue = getRandomRGBValue();
        const gValue = getRandomRGBValue();
        const bValue = getRandomRGBValue();
        e.target.style.backgroundColor = `rgb(${rValue},${gValue},${bValue})`;
    } else {
        e.target.style.backgroundColor = "black";
    }
}

/**
 * Creates a grid of squares that the user can color inside using their mouse.
 * @param {number} gridSize The length and width of the square grid. 
 */
let createGrid = (gridSize) => {
    const grid = document.querySelector("#squareGrid");

    for (let row = 0; row < gridSize; row++) {
        const newRow = document.createElement("div");
        newRow.classList.add("squareRow");
        newRow.style.height = `${100/gridSize}%`;

        for (let col = 0; col < gridSize; col++) {
            const newSquare = document.createElement("div");
            newSquare.classList.add("square");
            newSquare.addEventListener("mouseenter", colorPixel);
            newSquare.style.width = `${100/gridSize}%`;
            newRow.appendChild(newSquare);
        }

        grid.appendChild(newRow);
    }
}

/**
 * Deletes the current grid.
 */
let removeGrid = () => {
    const squares = Array.from(document.querySelectorAll(".square"));
    for (let i = 0; i < squares.length; i++) {
        squares[i].remove();
    }
    const squareRows = Array.from(document.querySelectorAll(".squareRow"));
    for (let i = 0; i < squareRows.length; i++) {
        squareRows[i].remove();
    }
}

/**
 * Prompts the user for a new grid size. If the grid size is valid, the current grid is deleted and a new
 * grid is drawn.
 * @sideEffect Modifies gridSize.
 */
let getGridSizeFromUser = () => {
    let newGridSize = prompt("Enter a new number of squares (<=100) in one row. (For example, entering 16 creates a 16x16 grid.", gridSize);
    console.log(newGridSize);
    if (newGridSize != null) { // If the user didn't cancel...
        newGridSize = Number(newGridSize);
        if (!Number.isInteger(newGridSize) || newGridSize <= 0) {
            alert("The grid size must be a non-negative, non-zero integer.");
        } else if (newGridSize > 100) {
            alert("The grid size must be less than or equal to 100.");
        } else {
            gridSize = newGridSize;
            removeGrid();
            createGrid(gridSize);
        }
    }
}

/**
 * Toggles randomizeColors.
 */
let toggleRandomizeColors = () => {
    console.log("randomize toggled!");
    randomizeColors = !randomizeColors;
}

// Called upon program execution.
createGrid(gridSize);
