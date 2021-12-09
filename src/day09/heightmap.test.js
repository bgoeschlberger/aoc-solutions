import { HeightMap } from "./heightmap";



test('low point', () => {
    const hm = new HeightMap(['2199943210', '3987894921', '9856789892', '8767896789', '9899965678']);
    expect(hm.isLowPoint(0,0)).toBeFalsy();
    expect(hm.isLowPoint(1, 0)).toBeTruthy();
    expect(hm.lowPointRiskValueSum).toBe(15);
});

test('neighbours of', () => {
    const hm = new HeightMap(['2199943210', '3987894921', '9856789892', '8767896789', '9899965678']);
    expect(hm.neigboursOf(0,0)).toEqual([9, 9, 1, 3]);
    expect(hm.neigboursOf(3,3)).toEqual([6, 6, 8, 9]);
});


test('basin labels', () => {
    const hm = new HeightMap(['2199943210', '3987894921', '9856789892', '8767896789', '9899965678']);
    expect(hm._basinLabels[0]).toEqual([0, 0, -1, -1, -1, 2, 2, 2, 2, 2]);
    expect(hm._basinLabels[1]).toEqual([0, -1, 8, 8, 8, -1, 2, -1, 2, 2]);
    expect(hm._basinLabels[2]).toEqual([-1, 8, 8, 8, 8, 8, -1, 19, -1, 2]);

});

test('basin sizes', () => {
    const hm = new HeightMap(['2199943210', '3987894921', '9856789892', '8767896789', '9899965678']);
    expect(hm.basinsSizes).toEqual([3, 9, 14, 9]);
    expect(hm.basinsSizes.sort((a,b)=>b-a).slice(0,3).reduce((a,b) => a*b)).toBe(1134);
});


test('edge case (propagate left upwards to position C3)', () => {
    const hm = new HeightMap(['5987898765','4398969876','7989656987','9876545698','5987656789','4398768891','5679879932','6789989899','9895496798','8901345987']);
    expect(hm.basinsSizes).toEqual([4, 4, 10, 27, 10, 3, 10, 3, 1]);
})
