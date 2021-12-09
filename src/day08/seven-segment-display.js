import { SegmentIdentifier } from "./segment-identifier";

export class SevenSegmentDisplay {

    
    constructor(segmentInformationString){
        const [powerInputStr, displayOutputStr] = segmentInformationString.split(' | ');
        this._segmentIdentifier = new SegmentIdentifier(powerInputStr);
        this._displayOutputStr = displayOutputStr;
    }

    get numSimpleValues(){
        const strArr = this._displayOutputStr.split(' ');
        return strArr.map((str) =>this._getNumberForActiveSegments(str)).filter(n => [1,4,7,8].indexOf(n)>=0).length;
    }

    get displayedNumber(){
        const strArr = this._displayOutputStr.split(' ');
        return strArr.reduce((sum, str) => sum*10 + this._getNumberForActiveSegments(str), 0)
    }


    _getNumberForActiveSegments(activeSegmentStr){
        // segments are in order left-to-right, top-to-bottom 
        return [0b1110111, 0b0010010, 
                0b1011101, 0b1011011,
                0b0111010, 0b1101011,
                0b1101111, 0b1010010,
                0b1111111, 0b1111011
            ].indexOf(this._segmentIdentifier.getEncodedSegmentString(activeSegmentStr));
    }

    


}