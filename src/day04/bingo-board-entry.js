export class BingoBoardEntry {
    constructor(val, row, col){
        this._val = val;
        this._row = row;
        this._col = col;
        this._crossOutListeners = [];
        this._isCrossedOut = false;
    }

    get val() {
        return this._val;
    }

    get row() {
        return this._row;
    }

    get col() {
        return this._col;
    }

    get isCrossedOut(){
        return this._isCrossedOut;
    }

    addCrossOutListener(listener){
        this._crossOutListeners.push(listener);
    }

    tryCrossOut(){
        if(!this._isCrossedOut){
            this._isCrossedOut = true;
            this._crossOutListeners.forEach(l => l());
        }
    }

}