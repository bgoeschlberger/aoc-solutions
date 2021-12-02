export class Measurement {
    
    constructor(arr){
        this._arr = arr.map(value => parseInt(value));
    }

    hasDepthIncOver(distance) {
        return this._arr.map((value, index, arr) => index >= distance && value > arr[index-distance]);
    }

    countDepthIncsOver(distance) {
        return this.hasDepthIncOver(distance).filter((v => v)).length;
    }

}