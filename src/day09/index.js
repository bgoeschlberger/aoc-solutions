import { IO } from "../utils/io";
import { HeightMap } from "./heightmap";

if(window.location.host === 'adventofcode.com' ){
    const hm = new HeightMap(IO.lines);
    alert(hm.lowPointRiskValueSum);
    alert(hm.basinsSizes.sort((a,b)=>b-a).slice(0,3).reduce((a,b) => a*b));
    console.log(hm._basinLabels);
}