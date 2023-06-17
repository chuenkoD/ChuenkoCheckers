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
