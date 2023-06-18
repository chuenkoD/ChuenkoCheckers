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


function removeActive() {
    let res = Array.from(document.getElementsByClassName('active'));
    for (const item of res) {
        item.classList.remove('active');
    }
}

function removeGraphMoves() {
    let res = document.getElementsByClassName('movement');
    while (res.length > 0) {
        res[0].parentNode.removeChild(res[0]);
    }
}
function setDraggable() {
    let res = document.getElementsByClassName('chess-field');

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i % 2) {
                if (j % 2 == false) {
                    res[i * 8 + j].addEventListener('drop', function () { drop(event) });
                    res[i * 8 + j].addEventListener('dragover', function () { allowDrop(event) });
                }
            }
            else {
                if (j % 2) {
                    res[i * 8 + j].addEventListener('drop', function () { drop(event) });
                    res[i * 8 + j].addEventListener('dragover', function () { allowDrop(event) });
                }
            }
        }
    }
}
function fillField() {
    let fields = document.getElementsByClassName('chess-field');

    let index = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i * 8 + j < 24) || (i * 8 + j > 39)) {
                if (i % 2) {
                    if (j % 2 == false) {
                        fields[i * 8 + j].appendChild(setChecker(i, index));
                        index++;
                    }
                }
                else {
                    if (j % 2) {
                        fields[i * 8 + j].appendChild(setChecker(i, index));
                        index++;
                    }
                }
            }
        }
    }
}
function setChecker(index, checkerindex) {
    let checker = document.createElement("div");
    checker.className = 'checker';
    checker.draggable = true;
    checker.id = `ch${checkerindex}`;

    checker.addEventListener('dragstart', function () { drag(event), false });;
    checker.addEventListener('mousedown', function () { MouseMove(true) });

    if (index > 2) {
        checker.classList.add('black');
    }
    else {
        checker.classList.add('white');
    }
    return checker;
}

const setDragCursor = value => {
    const body = document.getElementsByTagName('body').item(0);
    body.classList.toggle('grabbing', value);
}
function allowDrop(dragevent) {
    dragevent.preventDefault();
}

function getElements(ev) {
    let elements = document.getElementsByClassName('field-active');
    for (let item of elements) {
        item.classList.remove('field-active');
    }
    let elemBelow = document.elementsFromPoint(ev.clientX, ev.clientY);
    let elemNeeded = elemBelow.find(x => x.className == 'chess-field' && x.children[0] != null && x.children[0].className == 'movement');
    if (elemNeeded != null && !elemNeeded.classList.contains('field-active')) elemNeeded.classList.add('field-active');
    // console.log();
}
function MouseMove(toggle) {
    if (toggle) {
        document.addEventListener('mouseover', function (event) {
            getElements(event);
        })
    }
    else {
        document.removeEventListener('mouseover', function (event) {
            getElements(event);
        })
    }

}

function tryAddMove(dragevent) {
    if (Game.RequiredToBeat) {
        console.log(Game.AvailableCheckers);
        console.log(dragevent.target);
        if (Game.AvailableCheckers.find(x => x.checker == dragevent.target) != undefined) {
            dragevent.target.parentElement.classList.add('active');
        }
    }
    else {
        dragevent.target.parentElement.classList.add('active');
    }
}

InitGame();