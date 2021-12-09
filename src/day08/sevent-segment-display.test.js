import { SevenSegmentDisplay } from "./seven-segment-display";
import { SegmentIdentifier } from "./segment-identifier";

jest.mock('./segment-identifier');

beforeEach(() => {
    SegmentIdentifier.mockClear();
});

test('single digit identificiation', () => {
    const display = new SevenSegmentDisplay(' | cdfeb fcadb cdfeb cdbaf');
    const encodedNumbers = [0b1110111, 0b0010010, 
        0b1011101, 0b1011011,
        0b0111010, 0b1101011,
        0b1101111, 0b1010010,
        0b1111111, 0b1111011];
    SegmentIdentifier.mock.instances[0].getEncodedSegmentString = jest.fn(() => encodedNumbers[2]);
    expect(display._getNumberForActiveSegments('')).toBe(2);
});

test('simplified value', () => {
    const encodedNumbers = [0b1110111, 0b0010010, 
        0b1011101, 0b1011011,
        0b0111010, 0b1101011,
        0b1101111, 0b1010010,
        0b1111111, 0b1111011];
    for(var i=0; i<10; i++) {
        const display = new SevenSegmentDisplay(' | cdfeb fcadb cdfeb cdbaf');
        SegmentIdentifier.mock.instances[0].getEncodedSegmentString = jest.fn(() => encodedNumbers[i]);
        expect(display.numSimpleValues).toBe([1,4,7,8].indexOf(i)>=0?4:0);
        expect(SegmentIdentifier.mock.instances[0].getEncodedSegmentString.mock.calls.length).toBe(4);
        SegmentIdentifier.mockClear();
    }
});

test('number identificiation', () => {
    const display = new SevenSegmentDisplay(' | cdfeb fcadb cdfeb cdbaf');
    const encodedNumbers = [0b1110111, 0b0010010, 
        0b1011101, 0b1011011,
        0b0111010, 0b1101011,
        0b1101111, 0b1010010,
        0b1111111, 0b1111011];
    SegmentIdentifier.mock.instances[0].getEncodedSegmentString = jest.fn(() => encodedNumbers[2]);
    expect(display.displayedNumber).toBe(2222);
});

