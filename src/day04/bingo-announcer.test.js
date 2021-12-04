import { BingoAnnouncer } from "./bingo-announcer";
import { BingoBoard } from "./bingo-board";

jest.mock('./bingo-board');


test('isValidNumber', () => {
    expect(BingoAnnouncer._isValidNumber(-1)).toBeFalsy();
    expect(BingoAnnouncer._isValidNumber(0)).toBeTruthy();
    expect(BingoAnnouncer._isValidNumber(50)).toBeTruthy();
    expect(BingoAnnouncer._isValidNumber(99)).toBeTruthy();
    expect(BingoAnnouncer._isValidNumber(100)).toBeFalsy();
})

test('addAnnouncementListener', () => {
    const announcer = new BingoAnnouncer([1,2,3]);
    const mockListener = jest.fn();
    announcer.addAnnouncementListener(7, mockListener);
    announcer.addAnnouncementListener(17, mockListener);
    announcer.addAnnouncementListener(77, mockListener);
    announcer.addAnnouncementListener(777, mockListener);
    expect(announcer._annoucementListeners[7]).toEqual([mockListener]);
    expect(announcer._annoucementListeners.flat().length).toBe(3);
    announcer._announce(777);
    expect(mockListener.mock.calls.length).toBe(0);
    announcer._announce(7);
    expect(mockListener.mock.calls.length).toBe(1);
});

test('announce sequence without winner', () => {
    const announcer = new BingoAnnouncer([1,2,3]);
    const mockListener1 = jest.fn();
    announcer.addAnnouncementListener(1, mockListener1);
    const mockListener2 = jest.fn();
    announcer.addAnnouncementListener(2, mockListener2);
    const mockListener3 = jest.fn();
    announcer.addAnnouncementListener(3, mockListener3);
    expect(announcer._sequence.length).toBe(3);
    announcer.start();
    expect(announcer._sequence.length).toBe(0);
    expect(mockListener1.mock.calls.length).toBe(1);
    expect(mockListener2.mock.calls.length).toBe(1);
    expect(mockListener3.mock.calls.length).toBe(1);
});

test('announce sequence with winner', () => {
    const announcer = new BingoAnnouncer([1,2,3]);
    expect(announcer._sequence.length).toBe(3);
    const mockListener = jest.fn();
    announcer.addAnnouncementListener(2, mockListener);
    mockListener.mockImplementation(() => announcer.announceVictory(new BingoBoard()));
    const mockVictoryListener = jest.fn();
    announcer.addVictoryListener(mockVictoryListener);
    announcer.start();
    expect(announcer._sequence.length).toBe(1);
    expect(mockVictoryListener.mock.calls.length).toBe(1);
});

test('announce sequence with two winners', () => {
    const announcer = new BingoAnnouncer([1,2,3]);
    expect(announcer._sequence.length).toBe(3);
    const mockListener = jest.fn();
    announcer.addAnnouncementListener(1, mockListener);
    announcer.addAnnouncementListener(2, mockListener);
    mockListener.mockImplementation(() => announcer.announceVictory(new BingoBoard()));
    const mockVictoryListener = jest.fn();
    announcer.addVictoryListener(mockVictoryListener);
    announcer.start(2);
    expect(announcer._sequence.length).toBe(1);
    expect(mockListener.mock.calls.length).toBe(2);
    expect(mockVictoryListener.mock.calls.length).toBe(2);
    expect(announcer.lastNumber).toBe(2);
});