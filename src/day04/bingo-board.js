import { BingoBoardEntry } from "./bingo-board-entry";

export class BingoBoard {
    constructor(boardStr, bingoAnnouncer) {
        const rows = boardStr.split('\n').filter(r => r.length > 0);
        this._bingoAnnouncer = bingoAnnouncer;
        this._hasBingo = false;
        this._rowStates = new Array(rows.length).fill(rows.length);
        this._colStates = new Array(rows.length).fill(rows.length);
        this._boardState = rows.flatMap((boardRow, rowIndex) =>
            boardRow.trim().split(/\s+/).map((entry, colIndex) => {
                const bbe = new BingoBoardEntry(parseInt(entry), rowIndex, colIndex);
                bbe.addCrossOutListener(() => this.onEntryCrossedOut(bbe));
                this._bingoAnnouncer.addAnnouncementListener(bbe.val, () => bbe.tryCrossOut())
                return bbe;
            })
        );
    }

    onEntryCrossedOut(bingoBoardEntry) {
        this._rowStates[bingoBoardEntry.row] -= 1;
        this._colStates[bingoBoardEntry.col] -= 1;
        if (!this._hasBingo && (this._rowStates[bingoBoardEntry.row] === 0 || this._colStates[bingoBoardEntry.col] ===0 )) {
            this._hasBingo = true;
            this._bingoAnnouncer.announceVictory(this);
        }
    }

    get remainingValue() {
        return this._boardState.reduce((sum, boardEntry) => sum + (boardEntry.isCrossedOut ? 0 : boardEntry.val), 0);
    }
}