export class VentLine {

    constructor(str){
        [this._x1, this._y1, this._x2, this._y2] = str.split(/[\s,\->]+/).map(coord => parseInt(coord));
        this._dx = Math.sign(this._x2-this._x1);
        this._dy = Math.sign(this._y2-this._y1);
        this._numLinePoints = Math.max(Math.abs(this._x2-this._x1), Math.abs(this._y2-this._y1))+1;
    }

    get numLinePoints(){
        return this._numLinePoints;
    }

    get isDiagonal(){
        return Math.abs(this._dx)+Math.abs(this._dy) === 2
    }

    * linePoints(){
        for(var i=0; i<this._numLinePoints; i++){
            yield { x: this._x1+this._dx*i, y: this._y1+this._dy*i };
        }
    }

}