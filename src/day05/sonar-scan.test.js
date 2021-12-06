import { SonarScan } from "./sonar-scan";
import { VentLine } from "./vent-line";

jest.mock('./vent-line')

beforeEach(() => {
    VentLine.mockClear();
});


test('construct scan', () => {
    const exampleLines =
        ['0,9 -> 5,9', '8,0 -> 0,8',
            '9,4 -> 3,4', '2,2 -> 2,1',
            '7,0 -> 7,4', '6,4 -> 2,0',
            '0,9 -> 2,9', '3,4 -> 1,4',
            '0,0 -> 8,8', '5,5 -> 8,2'];
    const scan = new SonarScan(exampleLines);
    expect(scan._lines.length).toBe(10);
    expect(VentLine.mock.instances.length).toBe(10);
    var diagonal = false;
    for(const mockVentLine of VentLine.mock.instances){
        mockVentLine.linePoints.mockImplementation(function* () {
            yield { x: 1, y: 1 };
        });
        mockVentLine.isDiagonal = diagonal;
        diagonal = !diagonal;
    }
    for(const point of scan.scanPoints(false)){
        expect(point).toEqual({ x: 1, y: 1});
    }
    for(const point of scan.scanPoints(true)){
        expect(point).toEqual({ x: 1, y: 1});
    }
    diagonal = false;
    for(const mockVentLine of VentLine.mock.instances){
        expect(mockVentLine.linePoints.mock.calls.length).toBe(diagonal?1:2);
        diagonal = !diagonal;
    }
});

test('multi hit', () => {
    const scan = new SonarScan(['','']);
    expect(scan._lines.length).toBe(2);
    expect(VentLine.mock.instances.length).toBe(2);
    var diagonal = false;
    for(const mockVentLine of VentLine.mock.instances){
        mockVentLine.linePoints.mockImplementation(function* () {
            yield { x: 1, y: 1 };
        });
        mockVentLine.isDiagonal = diagonal;
        diagonal = !diagonal;
    }
    var i = 0;
    for(const point of scan.multiHitPoints(false)){
        i++;
    }
    expect(i).toBe(0);
    for(const point of scan.multiHitPoints(true)){
        expect(point).toEqual({x: 1, y: 1});
        i++;
    }
    expect(i).toBe(1);
});