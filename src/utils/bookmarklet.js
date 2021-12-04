import { IO } from "./io";
import styles from './bookmarklet.less'

export class Bookmarklet {
    constructor(name){
        this._elem =  document.createElement('a');
        this._elem.setAttribute('class', styles.bookmarklet)
        this._elem.innerHTML = name;
        IO.getScriptContent(name).then(
            (scriptText) => this._elem.setAttribute('href', 'javascript:'+ scriptText));
    };

    get element(){
        return this._elem;
    }
}