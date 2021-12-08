import { IO } from '../utils/io';
import { CrabHistogram } from "./crab-histogram";


if (window.location.host === 'adventofcode.com') {
    const crabHist = new CrabHistogram(IO.lines[0]);
    alert(crabHist.findMinLinearDistance());
    alert(crabHist.findMinArithmeticProgressionDistance());
}