import { IO } from "../utils/io";
import { BingoGame } from "./bingo-game";


if(window.location.host === 'adventofcode.com' ){
    const bingoGame = new BingoGame(IO.blocks);
    bingoGame.start();
    alert(bingoGame.winner.remainingValue * bingoGame.lastNumber);
    bingoGame.start(bingoGame.numBoards);
    alert(bingoGame.winner.remainingValue * bingoGame.lastNumber);
}