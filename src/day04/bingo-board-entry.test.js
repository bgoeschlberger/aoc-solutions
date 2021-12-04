import { BingoBoardEntry } from "./bingo-board-entry";

test('cross-out and notify once' , () => {
    const entry = new BingoBoardEntry(7, 0, 0);
    const mockListener = jest.fn();
    entry.addCrossOutListener(mockListener);
    entry.tryCrossOut();
    entry.tryCrossOut();
    expect(entry.isCrossedOut).toBe(true);
    expect(mockListener.mock.calls.length).toBe(1);
});