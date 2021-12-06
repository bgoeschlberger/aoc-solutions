import { IO } from "../utils/io";
import { LanternLifecycleHistogram } from "./lantern-lifecycle-histogram";



if(window.location.host === 'adventofcode.com' ){
    const lanternHist = new LanternLifecycleHistogram(IO.lines[0]);
    lanternHist.simulate(80);
    alert(lanternHist.numLantern);
    lanternHist.simulate(256-80);
    alert(lanternHist.numLantern);
}