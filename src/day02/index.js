import { IO } from "../utils/io";
import { CommandList } from "./command-list";

if(window.location.host === 'adventofcode.com' ){
    const cmdL = new CommandList(IO.lines);
    alert(cmdL.executeMode1().solutionValue);
    alert(cmdL.executeMode2().solutionValue);
}