import { VentLine } from "./vent-line";


test('horizontal vent line construction', () => {
    const vl1 = new VentLine('0,9 -> 5,9');
    expect(vl1.numLinePoints).toBe(6);
    var x = 0;
    var y = 9;
    for (const pointIterator of vl1.linePoints()){
        expect(pointIterator.x).toBe(x++);
        expect(pointIterator.y).toBe(y);
    }
    expect(vl1.isDiagonal).toBe(false);
    const vl2 = new VentLine('9,4 -> 3,4');
    expect(vl2.numLinePoints).toBe(7);

    x = 9;
    y = 4;
    for (const pointIterator of vl2.linePoints()){
        expect(pointIterator.x).toBe(x--);
        expect(pointIterator.y).toBe(y);
    }
    expect(vl2.isDiagonal).toBe(false);
});

test('vertical vent line construction', () => {
    const vl1 = new VentLine('2,2 -> 2,1');
    expect(vl1.numLinePoints).toBe(2);
    var x = 2;
    var y = 2;
    for (const pointIterator of vl1.linePoints()){
        expect(pointIterator.x).toBe(x);
        expect(pointIterator.y).toBe(y--);
    }
    expect(vl1.isDiagonal).toBe(false);
    const vl2 = new VentLine('7,0 -> 7,4');
    expect(vl2.numLinePoints).toBe(5);
    x = 7;
    y = 0;
    for (const pointIterator of vl2.linePoints()){
        expect(pointIterator.x).toBe(x);
        expect(pointIterator.y).toBe(y++);
    }
    expect(vl2.isDiagonal).toBe(false);
});

test('diagonal vent line construction', () => {
    const vl1 = new VentLine('6,4 -> 2,0');
    expect(vl1.numLinePoints).toBe(5);
    var x = 6;
    var y = 4;
    for (const pointIterator of vl1.linePoints()){
        expect(pointIterator.x).toBe(x--);
        expect(pointIterator.y).toBe(y--);
    }
    expect(vl1.isDiagonal).toBe(true);
    const vl2 = new VentLine('0,0 -> 8,8');
    expect(vl2.numLinePoints).toBe(9);
    x = 0;
    y = 0;
    for (const pointIterator of vl2.linePoints()){
        expect(pointIterator.x).toBe(x++);
        expect(pointIterator.y).toBe(y++);
    }
    expect(vl2.isDiagonal).toBe(true);
});

