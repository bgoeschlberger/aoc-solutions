import { IO } from "../utils/io";
import { SevenSegmentDisplay } from "./seven-segment-display";


if(window.location.host === 'adventofcode.com' ){
    const displays = IO.lines.map(str => new SevenSegmentDisplay(str));
    alert(displays.map(d => d.numSimpleValues).reduce((a, b) => a + b));
    alert(displays.map(d => d.displayedNumber).reduce((a, b) => a + b));
}