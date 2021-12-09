export class SegmentIdentifier {
    // constants for indexes of numbers that can be identified by number of segments
    static _IDX_ONE = 0;
    static _IDX_SEVEN = 1;
    //static _IDX_FOUR = 2;
    static _IDX_EIGHT = 9;


    constructor(powerInputStr) {
        this._powerInputs = powerInputStr.split(' ').sort((a, b) => a.length - b.length);
        this._powerInputHist = powerInputStr.split('').reduce(SegmentIdentifier._addToHist, new Array(7).fill(0));
        this._loaded = false;
    }

    getEncodedSegmentString(segmentStr){
        const segments = this._loadSegments();
        return segments.reduce((sum, segment) => sum*2 + (segmentStr.indexOf(segment)>=0?1:0),0);
    }

    _loadSegments() {
        if (!this._loaded) {
            this._identifyUpperSegment();
            this._identifyLowerLeftSegment();
            this._identifyUpperLeftSegment();
            this._identifyLowerRightSegment();
            this._identifyUpperRightSegment()
            this._identifyMiddleSegment();
            this._identifyLowerSegment();
            this._loaded = true;
        }
        return [this._upperSegment, this._upperLeftSegment, this._upperRightSegment, this._middleSegment, this._lowerLeftSegment, this._lowerRightSegment, this._lowerSegment];
    }


    // identifiable without dependencies 
    _identifyUpperSegment() {
        this._upperSegment = SegmentIdentifier._subtractSegments(this._powerInputs[SegmentIdentifier._IDX_SEVEN], this._powerInputs[SegmentIdentifier._IDX_ONE]);
    }

    _identifyLowerLeftSegment() {
        this._lowerLeftSegment = this._findSegmentByUsageFrequency(4);
    }

    _identifyUpperLeftSegment() {
        this._upperLeftSegment = this._findSegmentByUsageFrequency(6);
    }

    _identifyLowerRightSegment() {
        this._lowerRightSegment = this._findSegmentByUsageFrequency(9);
    }


    //identifiable with dependencies
    _identifyUpperRightSegment() {
        this._upperRightSegment = SegmentIdentifier._subtractSegments(this._powerInputs[SegmentIdentifier._IDX_ONE], this._lowerRightSegment);
    }

    _identifyMiddleSegment() {
        const idxOfZero = this._powerInputs.findIndex(inputStr =>
            inputStr.length === 6 &&
            inputStr.indexOf(this._lowerLeftSegment) >= 0 &&
            inputStr.indexOf(this._upperRightSegment) >= 0);
        this._middleSegment = SegmentIdentifier._subtractSegments(this._powerInputs[SegmentIdentifier._IDX_EIGHT], this._powerInputs[idxOfZero]);
    }

    _identifyLowerSegment() {
        this._lowerSegment = SegmentIdentifier._subtractSegments(this._powerInputs[SegmentIdentifier._IDX_EIGHT],
            this._upperSegment + this._upperLeftSegment + this._upperRightSegment + this._middleSegment + this._lowerLeftSegment + this._lowerRightSegment)
    }

    _findSegmentByUsageFrequency(n) {
        return SegmentIdentifier._getCharForHistPos(this._powerInputHist.findIndex((v) => v === n));
    }

    static _subtractSegments(minuend, subtrahend) {
        return subtrahend.split('').reduce((res, char) => res.replace(char, ''), minuend);
    }

    static _addToHist(histogramArray, character) {
        var idx = SegmentIdentifier._getHistIndex(character);
        if (idx >= 0 && idx < 7) {
            histogramArray[idx]++;
        }
        return histogramArray;
    }

    static _getHistIndex(char) {
        return char.charCodeAt(0) - 'a'.charCodeAt(0);
    }

    static _getCharForHistPos(index) {
        return String.fromCharCode('a'.charCodeAt(0) + index);
    }
}