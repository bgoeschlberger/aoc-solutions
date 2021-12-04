import { BingoAnnouncer } from "./bingo-announcer";
import { BingoBoard } from "./bingo-board";

export class BingoGame {
    constructor(inputBlockArr){
        this._bingoAnnouncer = new BingoAnnouncer(inputBlockArr[0].split(',').map(v => parseInt(v)));
        this._bingoAnnouncer.addVictoryListener((winner) => this._setWinner(winner));
        this._bingoBoards = inputBlockArr.slice(1).map(v => new BingoBoard(v, this._bingoAnnouncer));
    }

    _setWinner(winner){
        this._winner = winner;
    }

    get numBoards(){
        return this._bingoBoards.length;
    }

    get winner() {
        return this._winner
    }

    get lastNumber() {
        return this._bingoAnnouncer.lastNumber;
    }

    start(numVictories){
        this._bingoAnnouncer.start(numVictories);
    }


}