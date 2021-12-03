export class CodeLine {
    constructor(code) {
        if(typeof code === 'string'){
            this._codeStr = code;
            this._code = code.split('').map(char => parseInt(char));
        } else if (code instanceof Array) {
            this._code = code.map(c => {
                if(typeof c === 'boolean') 
                    return c?1:0;
                if(typeof c === 'string') 
                    return parseInt(c);
                if(typeof c === 'number') 
                    return c; 
            });
            this._codeStr = this._code.join('');
        }
    }

    get codeLength() {
        return this._code.length;
    }

    addTo(bitSumArr) {
        if (bitSumArr === undefined || bitSumArr.length === undefined)
            return this.code;
        return bitSumArr.map((curSum, index) => curSum + this.codeAt(index));
    }


    codeAt(pos) {
        return this._code[pos];
    }

    get code() {
        return this._code;
    }

    get val() {
        return parseInt(this._codeStr, 2);
    }


}