/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const playerA = `O`;
const playerB = `X`;

let currentPlayer = playerA;

let won = false;

const place = (box) => {
    if (box.innerText != `` || won) return;

    box.innerText = currentPlayer;
    box.className = `${currentPlayer}`;

    checkGameBoard();
    currentPlayer = currentPlayer === playerA ? playerB : playerA;
};

const getCoordString = (x, y) => {
    return `cell(${x}, ${y})`;
};

const getCell = (x, y) => {
    return {
        x: x,
        y: y,
        element: document.getElementById(getCoordString(x, y)),
        value: document.getElementById(getCoordString(x, y)).className,
    };
};

const getAllCells = () => {
    const cells = [[], [], []];

    for (let x = 0; x <= 2; x++) {
        for (let y = 0; y <= 2; y++) {
            cells[x][y] = getCell(x, y);
        }
    }

    return cells;
};

const doCellsMatch = (a, b, c) => {
    if (a.value !== `` && a.value === b.value && b.value === c.value) {
        return true;
    }

    return false;
};

const checkForWin = (a, b, c) => {
    if (doCellsMatch(a, b, c)) {
        getAllCells().map((row) =>
            row.map((cell) => (cell.element.className += ` lose`)),
        );

        a.element.className = `winner${a.value}`;
        b.element.className = `winner${a.value}`;
        c.element.className = `winner${a.value}`;

        won = true;
    }
};

const checkGameBoard = () => {
    const cells = getAllCells();

    for (let x = 0; x <= 2; x++) {
        checkForWin(cells[x][0], cells[x][1], cells[x][2]);
    }

    for (let y = 0; y <= 2; y++) {
        checkForWin(cells[0][y], cells[1][y], cells[2][y]);
    }

    checkForWin(cells[0][0], cells[1][1], cells[2][2]);
    checkForWin(cells[0][2], cells[1][1], cells[2][0]);
};
