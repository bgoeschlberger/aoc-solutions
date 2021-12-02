import { Command } from "./command";
import { PositionalInfo } from "./positional-info";

export class CommandList {
    constructor(arr){
        this._arr = arr.map(v => new Command(v));
    }

    executeMode1(){
        const pI = new PositionalInfo();
        this._arr.forEach(c => c.updatePosition(pI, 1));
        return pI;
    }

    executeMode2(){
        const pI = new PositionalInfo();
        this._arr.forEach(c => c.updatePosition(pI, 2));
        return pI;
    }
}