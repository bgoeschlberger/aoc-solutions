export class BingoAnnouncer {
    constructor(sequence){
        this._sequence = sequence;
        this._history = [];
        this._annoucementListeners = new Array(100).fill(0).map(() => new Array(0));
        this._victoryListeners = [];
        this._numVictoriesAnnounced = 0;
    }

    get lastNumber(){
        return this._history.at(-1);
    }

    start(numVictories){
        if(numVictories===undefined) 
            numVictories = 1;
        while(this._numVictoriesAnnounced < numVictories && this._sequence.length > 0){
            const nextNumber = this._sequence.shift();
            this._history.push(nextNumber);
            this._announce(nextNumber);
        }
    }

    addAnnouncementListener(number, listener){
        if(BingoAnnouncer._isValidNumber(number)){
            this._annoucementListeners[number].push(listener);
        }
    }

    addVictoryListener(listener){
        this._victoryListeners.push(listener);
    }

    _announce(number){
        if(BingoAnnouncer._isValidNumber(number)){
            this._annoucementListeners[number].forEach(l => l());
        }
    }

    announceVictory(bingoBoard) {
        this._victoryListeners.forEach(l => l(bingoBoard));
        this._numVictoriesAnnounced += 1;
    }

    static _isValidNumber(number){
        return number >=0 && number < 100;
    }
}