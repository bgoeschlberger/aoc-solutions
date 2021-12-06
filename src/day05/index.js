import { IO } from "../utils/io";
import { SonarScan } from "./sonar-scan";

if(window.location.host === 'adventofcode.com' ){
    const sonarScan = new SonarScan(IO.lines);
    var i = 0;
    for (const p of sonarScan.multiHitPoints(false)) i++;
    alert(i);
    i = 0;
    for (const p of sonarScan.multiHitPoints(true)) i++;
    alert(i);
}