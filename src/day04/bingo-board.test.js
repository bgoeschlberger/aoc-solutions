import { BingoAnnouncer } from "./bingo-announcer";
import { BingoBoard } from "./bingo-board";

jest.mock('./bingo-announcer');

beforeEach(() => {
    BingoAnnouncer.mockClear();
});

test('BingoBoard construction from input', () => {
    const announcer = new BingoAnnouncer();
    const bingoBoard = new BingoBoard('22 13 17 11  0\n 8  2 23  4 24\n21  9 14 16  7\n 6 10  3 18  5\n 1 12 20 15 19', announcer);
    expect(bingoBoard._boardState.length).toBe(25);
    expect(bingoBoard._boardState[5].val).toBe(8);
    expect(bingoBoard._boardState[5].row).toBe(1);
    expect(bingoBoard._boardState[5].col).toBe(0);
});

test('remaining value of Bingo board', () => {
    const announcer = new BingoAnnouncer();
    const bingoBoard = new BingoBoard('22 13 17 11  0\n 8  2 23  4 24\n21  9 14 16  7\n 6 10  3 18  5\n 1 12 20 15 19', announcer);
    expect(bingoBoard._colStates).toEqual([5, 5, 5, 5, 5]);
    expect(bingoBoard._rowStates).toEqual([5, 5, 5, 5, 5]);
    expect(bingoBoard.remainingValue).toBe(300);

    //after crossing out first value in 3 row (21) 
    bingoBoard._boardState[10].tryCrossOut();
    expect(bingoBoard._colStates).toEqual([4, 5, 5, 5, 5]);
    expect(bingoBoard._rowStates).toEqual([5, 5, 4, 5, 5]);
    expect(bingoBoard.remainingValue).toBe(279);
});


test('completing BingoBoard row', () => {
    const announcer = new BingoAnnouncer();
    const bingoBoard = new BingoBoard('22 13 17 11  0\n 8  2 23  4 24\n21  9 14 16  7\n 6 10  3 18  5\n 1 12 20 15 19', announcer);
    for(var i=10;i<15;i++) {
        expect(BingoAnnouncer.mock.instances[0].announceVictory.mock.calls.length).toBe(0);
        bingoBoard._boardState[i].tryCrossOut();
    };
    expect(BingoAnnouncer.mock.instances[0].announceVictory.mock.calls.length).toBe(1);
});

test('completing BingoBoard col', () => {
    const announcer = new BingoAnnouncer();
    const bingoBoard = new BingoBoard('22 13 17 11  0\n 8  2 23  4 24\n21  9 14 16  7\n 6 10  3 18  5\n 1 12 20 15 19', announcer);
    for(var i=0;i<25;i+=5) {
        expect(BingoAnnouncer.mock.instances[0].announceVictory.mock.calls.length).toBe(0);
        bingoBoard._boardState[i].tryCrossOut();
    };
    expect(BingoAnnouncer.mock.instances[0].announceVictory.mock.calls.length).toBe(1);
});

test('BingoBoard cannot be completed more than once', () => {
    const announcer = new BingoAnnouncer();
    const bingoBoard = new BingoBoard('22 13 17 11  0\n 8  2 23  4 24\n21  9 14 16  7\n 6 10  3 18  5\n 1 12 20 15 19', announcer);
    for(var i=10;i<15;i++) {
        bingoBoard._boardState[i].tryCrossOut();
    };
    for(var i=0;i<25;i+=5) {
        bingoBoard._boardState[i].tryCrossOut();
    };
    expect(BingoAnnouncer.mock.instances[0].announceVictory.mock.calls.length).toBe(1);
});