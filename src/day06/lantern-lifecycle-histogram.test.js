import { LanternLifecycleHistogram } from "./lantern-lifecycle-histogram";


test('init histogram', () => {
    const lantHist = new LanternLifecycleHistogram('1,2,3,1');
    expect(lantHist._hist.slice(0,4)).toEqual([0, 2, 1, 1]);
    expect(lantHist.numLantern).toBe(4);
});

test('simulate two days', () => {
    const lantHist = new LanternLifecycleHistogram('1,2,3,1');
    lantHist.simulate();
    expect(lantHist._hist).toEqual([2, 1, 1, 0, 0, 0, 0, 0, 0]);
    lantHist.simulate();
    expect(lantHist._hist).toEqual([1, 1, 0, 0, 0, 0, 2, 0, 2]);
    expect(lantHist.numLantern).toBe(6);
    const lantHist2 = new LanternLifecycleHistogram('1,2,3,1');
    lantHist2.simulate(2);
    expect(lantHist2._hist).toEqual([1, 1, 0, 0, 0, 0, 2, 0, 2]);
    expect(lantHist2.numLantern).toBe(6);
});

test('simulate four days', () => {
    const lantHist = new LanternLifecycleHistogram('1,2,3,1');
    lantHist.simulate(4);
    expect(lantHist._hist).toEqual([0, 0, 0, 0, 2, 1, 3, 1, 1]);
});


test('simulate with other reproduction rate', () => {
    const lantHist = new LanternLifecycleHistogram('1,2,3,1');
    lantHist.simulate(2, 1.5);
    expect(lantHist._hist).toEqual([1, 1, 0, 0, 0, 0, 2, 0, 3]);
    expect(lantHist.numLantern).toBe(7);
    lantHist.simulate(1,1.5);
    expect(lantHist._hist).toEqual([1, 0, 0, 0, 0, 2, 1, 3, 1]);
    expect(lantHist.numLantern).toBe(8);
});
