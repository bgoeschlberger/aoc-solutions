export class LanternLifecycleHistogram {
    static _NEWFISH_SPAWNPOINT = 8;
    static _OLDFISH_RESET_SPAWNPOINT = 6;

    constructor(lanternStateString) {
        this._hist = new Array(LanternLifecycleHistogram._NEWFISH_SPAWNPOINT+1).fill(0);
        lanternStateString.split(',').forEach((state) => this._hist[parseInt(state)]++);
    }

    get numLantern() {
        return this._hist.reduce((a, b) => a + b);
    }

    simulate(days, reproduction_factor) {
        if(days===undefined) days = 1;
        if(reproduction_factor===undefined) reproduction_factor = 1;
        for (var i = 0; i < days; i++) {
            const reproducing_fish = this._hist.shift();
            this._hist.push(Math.floor(reproducing_fish*reproduction_factor));
            this._hist[LanternLifecycleHistogram._OLDFISH_RESET_SPAWNPOINT] += reproducing_fish;
        }
    }
}