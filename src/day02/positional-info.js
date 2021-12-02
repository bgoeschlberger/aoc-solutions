export class PositionalInfo {
    constructor(){
        this.horizontal = 0;
        this.depth = 0;
        this.aim = 0;
    }

    get solutionValue() {
        return this.horizontal * this.depth;
    }
}