import { CodeLine } from "./code-line";
import { ReportCode } from "./report-code";


test('construct CodeLine', () => {
    const cl = new CodeLine('00100');
    expect(cl.code).toEqual([0,0,1,0,0]);
    expect(cl.codeLength).toBe(5);
    const cl2 = new CodeLine([0,0,1,0,0]);
    expect(cl2._codeStr).toBe('00100');
    expect(cl2.codeLength).toBe(5);
    const cl3 = new CodeLine([false,false,true,false,false]);
    expect(cl3._codeStr).toBe('00100');
    expect(cl3.codeLength).toBe(5);
    const cl4 = new CodeLine(['0', '0', '1', '0', '0']);
    expect(cl4._codeStr).toBe('00100');
    expect(cl4.codeLength).toBe(5);
});


test('add to existing BitSum', () => {
    const cl = new CodeLine('00100');
    const bitSum = [0,0,0,0,0];
    expect(cl.addTo(bitSum)).toEqual([0,0,1,0,0]);
});

test('add to empty BitSum', () => {
    const cl = new CodeLine('00100');
    expect(cl.addTo()).toEqual([0,0,1,0,0]);
});

test('get bit sums', () => {
    const rep = new ReportCode(
        ['00100', '11110', '10110',
            '10111', '10101', '01111',
            '00111', '11100', '10000',
            '11001', '00010', '01010']);
    expect(rep._getBitSums()).toEqual([7, 5, 7, 7, 5]);
});

test('most common bits', () => {
    const rep = new ReportCode(
        ['00100', '11110', '10110',
            '10111', '10101', '01111',
            '00111', '11100', '10000',
            '11001', '00010', '01010']);
    expect(rep.getMostCommonBits()).toEqual(new CodeLine('10110'))
});

test('least common bits', () => {
    const rep = new ReportCode(
        ['00100', '11110', '10110',
            '10111', '10101', '01111',
            '00111', '11100', '10000',
            '11001', '00010', '01010']);
    expect(rep.getLeastCommonBits()).toEqual(new CodeLine('01001'))
});

test('sort lines', () => {
    const rep = new ReportCode(
        ['00100', '11110', '10110',
            '10111', '10101', '01111',
            '00111', '11100', '10000',
            '11001', '00010', '01010']);
    const sortedRep = new ReportCode(['00010',
    '00100','00111',
    '01010', '01111',
    '10000', '10101', '10110', '10111',
    '11001','11100', '11110']);
    expect(rep._getSortedLines()).toEqual(sortedRep._arr);
});

test('find first 1 in bounds', () => {
    const sortedRep = new ReportCode(['00010',
        '00100','00111',
        '01010', '01111',
        '10000', '10101', '10110', '10111',
        '11001','11100', '11110']);
    //binary search: bit by bit (sunshine)
    expect(ReportCode._findFirstOneWithinBounds(sortedRep._arr, 0, 12, 0)).toBe(5);
    expect(ReportCode._findFirstOneWithinBounds(sortedRep._arr, 0, 5, 1)).toBe(3);
    expect(ReportCode._findFirstOneWithinBounds(sortedRep._arr, 3, 5, 2)).toBe(4);
    expect(ReportCode._findFirstOneWithinBounds(sortedRep._arr, 5, 12, 1)).toBe(9);
    expect(ReportCode._findFirstOneWithinBounds(sortedRep._arr, 9, 12, 2)).toBe(10);
    expect(ReportCode._findFirstOneWithinBounds(sortedRep._arr, 10, 12, 3)).toBe(11);
    //nothing matching
    expect(ReportCode._findFirstOneWithinBounds(sortedRep._arr, 0, 5, 0)).toBe(-1);

});


test('search in Order', () => {
    const rep = new ReportCode(
        ['00100', '11110', '10110',
            '10111', '10101', '01111',
            '00111', '11100', '10000',
            '11001', '00010', '01010']);
    expect(rep.getMostCommonBitOrder()).toEqual(new CodeLine('10111'));
    expect(rep.getLeastCommonBitOrder()).toEqual(new CodeLine('01010'));
});

test('search ties', () => {
    const rep = new ReportCode(['0011', '0101', '1010', '1100']);
    expect(ReportCode._findFirstOneWithinBounds(rep._arr, 0, 4, 0)).toBe(2);
});

test('resolve ties correctly', () => {
    const rep = new ReportCode(['0011', '0101', '1010', '1100']);
    expect(rep.getMostCommonBitOrder()).toEqual(new CodeLine('1100'));
    expect(rep.getLeastCommonBitOrder()).toEqual(new CodeLine('0011'));
});

test('resolve equalities correctly', () => {
    const rep = new ReportCode(['00110', '00110', '00111', '00111']);
    expect(rep.getMostCommonBitOrder()).toEqual(new CodeLine('00111'));
    expect(rep.getLeastCommonBitOrder()).toEqual(new CodeLine('00110'));
});
