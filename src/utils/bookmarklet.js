import { IO } from "./io";

export class Bookmarklet {
    constructor(name){
        this._elem =  document.createElement('a');
        IO.getScriptContent(name).then(
            (scriptText) => this._elem.setAttribute('href', 'javascript:'+ scriptText));
        this._elem.innerHTML = name;
    };

    get element(){
        return this._elem;
    }
}