const audioCtx = new AudioContext();
const audio = new Audio('move-self.wav');
const source = audioCtx.createMediaElementSource(audio);
source.connect(audioCtx.destination);

const Players = {
    One: 1,
    Two: 2
}
const Game = {
    CurrentPlayer: Players.One,
    CurrentMove: 0,
    AvailableMoves: [],
    HistoryMoves: [],
    RequiredToBeat: false,
    AvailableCheckers: []
}
const TempMove = {
    startPos: null,
    finalPos: null
}
const Letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const Numbers = ['8', '7', '6', '5', '4', '3', '2', '1'];

class BeatMove {
    constructor(checker, enemychecker, fielddestination) {
        this.checker = checker;
        this.enemychecker = enemychecker;
        this.fielddestination = fielddestination;
    }
}

class Move {
    constructor(moveNum, color, startPos, finalPos) {
        this.moveNum = moveNum;
        this.color = color;
        this.startPos = startPos;
        this.finalPos = finalPos;
    }
}

function InitGame() {
    setDragging('black', false);
    setDragging('white', true);
}

function ChangePlayer() {
    Game.CurrentPlayer = Game.CurrentPlayer == Players.One ? Players.Two : Players.One;
    if (Game.CurrentPlayer == Players.One) {
        setDragging('black', false);
        setDragging('white', true);
        // calcMoves('white');
    }
    else {
        setDragging('black', true);
        setDragging('white', false);
        Game.CurrentMove++;
        // calcMoves('black');
    }
}

function calcMoves(color) {
    let elements = document.getElementsByClassName(color);
    for (const item of elements) {
        console.log(`${item.id} ${item.parentElement.id}`);
    }
}

function calcDistinctMoves(i, color) {
    let fields = Array.from(document.getElementsByClassName('chess-field'));
    Game.AvailableMoves = [];

    let checker = document.getElementById(i).children[0];

    if (fields.find(x => x.id == parseInt(i) - 9) != undefined
        && fields.find(x => x.id == parseInt(i) - 9).style.backgroundColor != 'var(--field-background-white-old)') {

        if ((color == 'white' && fields.find(x => x.id == parseInt(i) - 9).children.length != 0)
            || color == 'black' || checker.classList.contains('crown')) {
            Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) - 9));
        }
    }

    if (fields.find(x => x.id == parseInt(i) - 7) != undefined
        && fields.find(x => x.id == parseInt(i) - 7).style.backgroundColor != 'var(--field-background-white-old)') {

        if ((color == 'white' && fields.find(x => x.id == parseInt(i) - 7).children.length != 0)
            || color == 'black' || checker.classList.contains('crown')) {
            Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) - 7));
        }
    }

    if (fields.find(x => x.id == parseInt(i) + 7) != undefined
        && fields.find(x => x.id == parseInt(i) + 7).style.backgroundColor != 'var(--field-background-white-old)') {

        if ((color == 'black' && fields.find(x => x.id == parseInt(i) + 7).children.length != 0)
            || color == 'white' || checker.classList.contains('crown')) {
            Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) + 7));
        }
    }

    if (fields.find(x => x.id == parseInt(i) + 9) != undefined
        && fields.find(x => x.id == parseInt(i) + 9).style.backgroundColor != 'var(--field-background-white-old)') {

        if ((color == 'black' && fields.find(x => x.id == parseInt(i) + 9).children.length != 0)
            || color == 'white' || checker.classList.contains('crown')) {
            Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) + 9));
        }
    }

    for (const item of Game.AvailableMoves) {
        let movement = document.createElement('div');
        movement.className = 'movement';
        if (!item.children.length != 0) {
            item.appendChild(movement);
        }
    }
}

function displayBeatMoves(target) {
    for (const item of Game.AvailableMoves) {
        let movement = document.createElement('div');
        movement.className = 'movement';

        if (!item.children.length != 0 && Game.AvailableCheckers.find(x => x.fielddestination == item).checker == target) {
            item.appendChild(movement);
        }
    }

    console.log(Game.AvailableMoves);
}

InitGame();