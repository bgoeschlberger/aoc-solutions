export class HeightMap {
    constructor(heightMapLineArr) {
        this._heightMap = heightMapLineArr.map(line => line.split('').map(val => parseInt(val)));
        this._basinLabels = this._calcBasinLabels();
    }

    get basinsSizes() {
        var sizes = [];
        this._basinLabels.flat().filter(n => n >= 0).sort((a, b) => a - b).forEach((_, i, arr) => {
            if (i > 0 && arr[i - 1] === arr[i]) {
                sizes[sizes.length - 1]++;
            } else {
                sizes.push(1);
            }
        });
        return sizes;
    }

    get lowPointRiskValueSum() {
        return this._heightMap.map((line, y) => line.filter((_, x) => this.isLowPoint(x, y)).reduce((a, b) => a + b + 1, 0)).reduce((a, b) => a + b, 0);
    }

    isLowPoint(x, y) {
        var val = this.valAt(x, y);
        return this.neigboursOf(x, y).every(n => n > val);
    }

    neigboursOf(x, y) {
        return [this.valAt(x, y - 1), this.valAt(x - 1, y), this.valAt(x + 1, y), this.valAt(x, y + 1)];
    }


    valAt(x, y) {
        return HeightMap._arr2dValAt(this._heightMap, x, y, 9);
    }

    static _arr2dValAt(arr, x, y, def) {
        if (x < 0 || y < 0 || y >= arr.length || x >= arr[y].length) {
            return def;
        } else {
            return arr[y][x];
        }
    }

    static _arr2dNeighboursOf(arr, x, y, def) {
        return [
            HeightMap._arr2dValAt(arr, x, y - 1, def),
            HeightMap._arr2dValAt(arr, x - 1, y, def),
            HeightMap._arr2dValAt(arr, x + 1, y, def),
            HeightMap._arr2dValAt(arr, x, y + 1, def)
        ];

    }

    _calcBasinLabels() {
        var max_label = 0;
        var assignedLabels = this._heightMap.map((line) => line.map((val, x) => val === 9 ? Number.MAX_SAFE_INTEGER : max_label++));
        do {
            assignedLabels = this._propagateLabels(assignedLabels, max_label);
        } while (assignedLabels.hasChanged);
        return assignedLabels.map(line => line.map(label => label>max_label?-1:label));
    }

    _propagateLabels(assignedLabels, max_label) {
        var hasChanged = false;
        var result = assignedLabels.map((line, y) => line.map((label, x) => {
            if (label < max_label) {
                var ret = Math.min(...HeightMap._arr2dNeighboursOf(assignedLabels, x, y, Number.MAX_SAFE_INTEGER), label);
                hasChanged |= (ret !== label);
                return ret;
            } else {
                return label;
            }
        }));
        result.hasChanged = hasChanged;
        return result;
    }
}