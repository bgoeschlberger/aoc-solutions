import { IO } from "./io";

export class Bookmarklet {
    constructor(name){
        this._elem =  document.createElement('a');
        this._elem.innerHTML = name;
        this._elem.setAttribute('style', 'padding: 25px');
        IO.getScriptContent(name).then(
            (scriptText) => this._elem.setAttribute('href', 'javascript:'+ scriptText));
    };

    get element(){
        return this._elem;
    }
}