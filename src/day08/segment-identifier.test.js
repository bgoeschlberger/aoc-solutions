import { SegmentIdentifier } from "./segment-identifier";

test('segment identificiation', () => {
    const segId = new SegmentIdentifier('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab');
    expect(segId._loadSegments()).toEqual(['d', 'e', 'a', 'f', 'g', 'b', 'c']);
    expect(segId._upperSegment).toBe('d');
    expect(segId._upperLeftSegment).toBe('e');
    expect(segId._upperRightSegment).toBe('a');
    expect(segId._middleSegment).toBe('f');
    expect(segId._lowerLeftSegment).toBe('g');
    expect(segId._lowerRightSegment).toBe('b');
    expect(segId._lowerSegment).toBe('c');
});

test('loading of segment identification', () => {
    const segId = new SegmentIdentifier('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab');
    expect(segId._loadSegments()).toEqual(['d', 'e', 'a', 'f', 'g', 'b', 'c']);
    // it is not loaded on subsequent calls
    segId._upperSegment = undefined;
    expect(segId._loadSegments()).toEqual([undefined, 'e', 'a', 'f', 'g', 'b', 'c']);
});

test('segment encoding', () => {
    const segId = new SegmentIdentifier('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab');
    var encodedNumbers = [0b1110111, 0b0010010, 
        0b1011101, 0b1011011,
        0b0111010, 0b1101011,
        0b1101111, 0b1010010,
        0b1111111, 0b1111011]; 
    expect(segId.getEncodedSegmentString('cagedb')).toBe(encodedNumbers[0]);
    expect(segId.getEncodedSegmentString('ab')).toBe(encodedNumbers[1]);
    expect(segId.getEncodedSegmentString('gcdfa')).toBe(encodedNumbers[2]);
    expect(segId.getEncodedSegmentString('cdbaf')).toBe(encodedNumbers[3]);
    expect(segId.getEncodedSegmentString('eafb')).toBe(encodedNumbers[4]);
    expect(segId.getEncodedSegmentString('cdfeb')).toBe(encodedNumbers[5]);
    expect(segId.getEncodedSegmentString('cdfgeb')).toBe(encodedNumbers[6]);
    expect(segId.getEncodedSegmentString('dab')).toBe(encodedNumbers[7]);
    expect(segId.getEncodedSegmentString('acedgfb')).toBe(encodedNumbers[8]);
    expect(segId.getEncodedSegmentString('cefabd')).toBe(encodedNumbers[9]);
});