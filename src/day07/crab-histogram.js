export class CrabHistogram {
    constructor(crabLine) {
        const crabPositions = crabLine.split(',').map((crabPos) => parseInt(crabPos));
        this._meanCrabPos = crabPositions.reduce((a, b) => a + b) / crabPositions.length;
        this._hist = new Array(Math.max(...crabPositions) + 1).fill(0);
        crabPositions.forEach((crabPos) => this._hist[crabPos]++);
    }


    findMinLinearDistance() {
        return this._binarySearchOptimum(CrabHistogram._linearDistance);
    }

    findMinArithmeticProgressionDistance() {
        return this._binarySearchOptimum(CrabHistogram._arithmeticProgressionDistance);
    }

    _binarySearchOptimum(distanceFn) {
        var searchIdx = Math.floor(this._meanCrabPos);
        const searchSpace = new Array(this._hist.length);
        var searchMove = Math.ceil(searchSpace.length / 4) * this._testForLocalOptimum(searchSpace, searchIdx, distanceFn);
        while (searchMove !== 0) {
            searchIdx += searchMove;
            var searchDirection = this._testForLocalOptimum(searchSpace, searchIdx, distanceFn);
            searchMove = Math.ceil(Math.abs(searchMove / 2)) * searchDirection;
        }
        return searchSpace[searchIdx];
    }

    _testForLocalOptimum(searchSpace, searchIdx, distanceFn) {
        if (searchIdx < 0 || searchIdx >= searchSpace.length) {
            //search index out of bounds, optimum is in opposite direction
            return searchIdx < 0 ? 1 : -1;
        }
        // calculated values of interrest that have not been precalculated yet 
        if (searchIdx > 0 && searchSpace[searchIdx - 1] === undefined) {
            searchSpace[searchIdx - 1] = this._distanceTo(searchIdx - 1, distanceFn);
        }
        if (searchSpace[searchIdx] === undefined) {
            searchSpace[searchIdx] = this._distanceTo(searchIdx, distanceFn);
        }
        if (searchIdx < searchSpace.length - 2 && searchSpace[searchIdx + 1] === undefined) {
            searchSpace[searchIdx + 1] = this._distanceTo(searchIdx + 1, distanceFn);
        }
        // check if val is an optimum
        const pred = searchIdx > 0 ? searchSpace[searchIdx - 1] : Number.MAX_SAFE_INTEGER;
        const val = searchSpace[searchIdx];
        const succ = searchIdx < searchSpace.length - 2 ? searchSpace[searchIdx + 1] : Number.MAX_SAFE_INTEGER;
        return (val <= pred && val <= succ) ? 0 : (pred < succ ? -1 : 1);
    }

    _distanceTo(pos, distanceFn) {
        return this._hist.reduce((distSum, numCrabs, crabPos) => distSum + numCrabs * distanceFn(pos, crabPos), 0);
    }

    static _linearDistance(pos1, pos2) {
        return Math.abs(pos1 - pos2);
    }

    static _arithmeticProgressionDistance(pos1, pos2) {
        var progLength = Math.abs(pos1 - pos2);
        return progLength * (progLength + 1) / 2;
    }
}