export class CrabHistogram {
    constructor(crabLine) {
        const crabPositions = crabLine.split(',').map((crabPos) => parseInt(crabPos));
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
        var searchIdx = Math.floor(this._hist.length/2);
        var testResult = this._testForLocalOptimum(searchIdx, distanceFn);
        var searchMove = Math.ceil(this._hist.length / 4) * testResult.direction;
        while (searchMove !== 0) {
            searchIdx += searchMove;
            testResult = this._testForLocalOptimum(searchIdx, distanceFn);
            searchMove = Math.ceil(Math.abs(searchMove / 2)) * testResult.direction;
        }
        return testResult.val;
    }

    _testForLocalOptimum(searchIdx, distanceFn) {
        if (searchIdx < 0 || searchIdx >= this._hist.length) {
            //search index out of bounds, optimum is in opposite direction
            return {
                direction: searchIdx < 0 ? 1 : -1,
                val: -1
            };
        }
        // check if val is an optimum
        const pred = searchIdx > 0 ? this._distanceTo(searchIdx - 1, distanceFn) : Number.MAX_SAFE_INTEGER;
        const val = this._distanceTo(searchIdx, distanceFn);
        const succ = searchIdx < this._hist.length - 2 ? this._distanceTo(searchIdx + 1, distanceFn) : Number.MAX_SAFE_INTEGER;
        return { 
            direction: (val <= pred && val <= succ) ? 0 : (pred < succ ? -1 : 1),
            val: val
        };
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