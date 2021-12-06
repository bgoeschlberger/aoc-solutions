import { VentLine } from "./vent-line";

export class SonarScan {
    constructor(lineArr) {
        this._lines = lineArr.map(l => new VentLine(l));
    }

    * scanPoints(includeDiagonals) {
        for (const line of this._lines) {
            if (includeDiagonals || !line.isDiagonal) {
                for (const point of line.linePoints()) {
                    yield point;
                }
            }
        }
    }

    * multiHitPoints(includeDiagonals) {
        const scanField = new Array(1000 * 1000).fill(0);
        for (const p of this.scanPoints(includeDiagonals)) {
            if ((++scanField[p.x * 1000 + p.y]) === 2) {
                yield p;
            }
        }
    }

}