import { IO } from "../utils/io";
import { ReportCode } from "./report-code";


if(window.location.host === 'adventofcode.com' ){
    const rC = new ReportCode(IO.lines);
    alert(rC.getMostCommonBits().val*rC.getLeastCommonBits().val);
    alert(rC.getMostCommonBitOrder().val*rC.getLeastCommonBitOrder().val);
}