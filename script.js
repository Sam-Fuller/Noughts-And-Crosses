/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const playerA = `O`;
const playerB = `X`;

let currentPlayer = playerA;

let won = false;

let board = [[], [], []];

const getElementId = (x, y) => `${x},${y}`;
const getElementCoords = (element) => {
    const coords = element.id.split(`,`);

    return {
        x: coords[0],
        y: coords[1],
    };
};

const getElement = (x, y) => document.getElementById(getElementId(x, y));

for (let x = 0; x <= 2; x++) {
    for (let y = 0; y <= 2; y++) {
        board[x][y] = {
            element: getElement(x, y),
            player: undefined,
        };
    }
}

const setPlayer = (cell) => {
    cell.player = currentPlayer;
    cell.element.className = `${currentPlayer}`;
    cell.element.innerText = currentPlayer;
};
const setWin = (cell) => {
    cell.element.className = `winner${cell.element.className}`;
};
const setLose = (cell) => {
    cell.element.className += ` lose`;
};

const place = (box) => {
    const coords = getElementCoords(box);
    const cell = board[coords.x][coords.y];

    if (won) return;
    if (cell.player) return;

    setPlayer(cell, currentPlayer);
    checkGameBoard();
    currentPlayer = currentPlayer === playerA ? playerB : playerA;
};

const doCellsMatch = (a, b, c) =>
    a.player && a.player === b.player && b.player === c.player;

const checkForWin = (a, b, c) => {
    if (doCellsMatch(a, b, c)) {
        board.forEach((row) => row.forEach(setLose));

        setWin(a);
        setWin(b);
        setWin(c);

        won = true;
    }
};

const checkGameBoard = () => {
    // this can be done with one loop, or two .forEach
    for (let x = 0; x <= 2; x++) {
        checkForWin(board[x][0], board[x][1], board[x][2]);
    }

    for (let y = 0; y <= 2; y++) {
        checkForWin(board[0][y], board[1][y], board[2][y]);
    }

    checkForWin(board[0][0], board[1][1], board[2][2]);
    checkForWin(board[0][2], board[1][1], board[2][0]);
};
