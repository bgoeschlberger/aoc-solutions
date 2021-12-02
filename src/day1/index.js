import { IO } from "../utils/io";
import { Measurement } from "./measurement";

if(window.location.host === 'adventofcode.com' ){
    const m = new Measurement(IO.lines);
    alert(m.countDepthIncsOver(1));
    alert(m.countDepthIncsOver(3));
}