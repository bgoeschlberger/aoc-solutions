import { CodeLine } from "./code-line";

export class ReportCode {

    constructor(arr) {
        this._arr = arr.map(v => new CodeLine(v));
    }

    _getBitSums() {
        return this._arr.reduce((bitSumArr, codeLine) => codeLine.addTo(bitSumArr));
    }

    getMostCommonBits() {
        const bitCrit = bitSum => bitSum >= this._arr.length / 2;
        return new CodeLine(this._getBitSums().map(bitCrit));
    }

    getLeastCommonBits() {
        const bitCrit = bitSum => bitSum < this._arr.length / 2;
        return new CodeLine(this._getBitSums().map(bitCrit));
    }

    getMostCommonBitOrder() {
        return this._searchInOrderFor(true);
    }

    getLeastCommonBitOrder() {
        return this._searchInOrderFor(false);
    }


    _searchInOrderFor(searchMajority) {
        const sortedCodeLines = this._getSortedLines();
        var result = new Array(sortedCodeLines[0].code.length);
        var bitPos = 0;
        var lbound = 0;
        var ubound = sortedCodeLines.length;
        while (bitPos < sortedCodeLines[0].code.length) {
            var searchIdx = Math.floor((lbound + ubound) / 2);
            var majorityCode = sortedCodeLines[searchIdx].codeAt(bitPos);
            searchIdx = ReportCode._findFirstOneWithinBounds(sortedCodeLines, lbound, ubound, bitPos);
            if ((majorityCode === 0 && searchMajority) || (majorityCode === 1 && !searchMajority)) {
                //looking for last/highest zero-value (if there is any)
                if (searchIdx >= 0) {
                    ubound = searchIdx > 0 ? searchIdx : lbound + 1;
                }
                result[bitPos] = sortedCodeLines[ubound - 1].codeAt(bitPos);
            } else {
                //looking for first/lowest one-value (if there is any)
                if(searchIdx >= 0){
                    lbound = searchIdx;
                }
                result[bitPos] = sortedCodeLines[lbound].codeAt(bitPos);
            }
            bitPos += 1;
        }
        return new CodeLine(result);
    }

    _getSortedLines() {
        return [...this._arr].sort((cl1, cl2) => cl1.val - cl2.val);
    }

    static _findFirstOneWithinBounds(arr, lbound, ubound, bitPos) {
        var searchIdx = lbound;
        var lastFound = -1;
        while (ubound - lbound > 1) {
            var searchIdx = Math.floor((lbound + ubound) / 2);
            var curSymbol = arr[searchIdx].codeAt(bitPos);
            if (curSymbol === 1) {
                ubound = searchIdx;
                lastFound = searchIdx;
            } else {
                lbound = searchIdx;
            }
        }
        if (curSymbol === 1) {
            return searchIdx;
        } else {
            return lastFound;
        }
    }

}