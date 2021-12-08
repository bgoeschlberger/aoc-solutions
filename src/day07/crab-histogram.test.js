import { CrabHistogram } from "./crab-histogram";

test('histogram construction', () => {
    const crabHist1 = new CrabHistogram('0,0,0');
    expect(crabHist1._hist).toEqual([3]);
    const crabHist2 = new CrabHistogram('0,1,2,3');
    expect(crabHist2._hist).toEqual([1,1,1,1]);
});

test('linear distance', () => {
    expect(CrabHistogram._linearDistance(1, 5)).toBe(4);
    expect(CrabHistogram._linearDistance(5, 1)).toBe(4);
    const crabHist = new CrabHistogram('0,1,2,3');
    expect(crabHist._distanceTo(0, CrabHistogram._linearDistance)).toBe(0+1+2+3);
    expect(crabHist._distanceTo(2, CrabHistogram._linearDistance)).toBe(2+1+0+1);
});

test('arithmetic progression distance', () => {
    expect(CrabHistogram._arithmeticProgressionDistance(1, 5)).toBe(1+2+3+4);
    expect(CrabHistogram._arithmeticProgressionDistance(5, 1)).toBe(1+2+3+4);
    const crabHist = new CrabHistogram('0,1,2,3');
    expect(crabHist._distanceTo(0, CrabHistogram._arithmeticProgressionDistance)).toBe((0)+(1)+(1+2)+(1+2+3));
    expect(crabHist._distanceTo(2, CrabHistogram._arithmeticProgressionDistance)).toBe((1+2)+(1)+(0)+(1));
});

test('search linear optimum', () => {
    const crabHist = new CrabHistogram('0,1,2,3');
    expect(crabHist.findMinLinearDistance()).toBe(4);
    const crabHist2 = new CrabHistogram('16,1,2,0,4,2,7,1,2,14');
    expect(crabHist2.findMinLinearDistance()).toBe(37);
});

test('search arithmetic progression distance optimum', () => {
    const crabHist = new CrabHistogram('0,1,2,3');
    expect(crabHist.findMinArithmeticProgressionDistance()).toBe(5);
    const crabHist2 = new CrabHistogram('16,1,2,0,4,2,7,1,2,14');
    expect(crabHist2.findMinArithmeticProgressionDistance()).toBe(168);
});

test('test for linear local optimum', () => {
    const crabHist = new CrabHistogram('0,1,2,3');
    expect(crabHist._testForLocalOptimum(-1, CrabHistogram._linearDistance).direction).toBe(1);
    expect(crabHist._testForLocalOptimum(0, CrabHistogram._linearDistance).direction).toBe(1);
    expect(crabHist._testForLocalOptimum(1, CrabHistogram._linearDistance).direction).toBe(0);
    expect(crabHist._testForLocalOptimum(2, CrabHistogram._linearDistance).direction).toBe(0);
    expect(crabHist._testForLocalOptimum(3, CrabHistogram._linearDistance).direction).toBe(-1);
    expect(crabHist._testForLocalOptimum(4, CrabHistogram._linearDistance).direction).toBe(-1);

});


test('test for arithmetic progression distance  local optimum', () => {
    const crabHist = new CrabHistogram('0,1,2,3');
    expect(crabHist._testForLocalOptimum(0, CrabHistogram._arithmeticProgressionDistance).direction).toBe(1);
    expect(crabHist._testForLocalOptimum(1, CrabHistogram._arithmeticProgressionDistance).direction).toBe(0);
    expect(crabHist._testForLocalOptimum(2, CrabHistogram._arithmeticProgressionDistance).direction).toBe(0);
    expect(crabHist._testForLocalOptimum(3, CrabHistogram._arithmeticProgressionDistance).direction).toBe(-1);
});