import { Measurement } from "./measurement";


test('measurement depth offset one', () => {
    const m = new Measurement([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]);
    const res = m.hasDepthIncOver(1);
    expect(res).toEqual([false, true, true, true, false, true, true, true, false, true]);
});


test('measurement depth offset three', () => {
    const m = new Measurement([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]);
    const res = m.hasDepthIncOver(3);
    expect(res).toEqual([false, false, false, true, false, false,  true, true, true, true]);
});

test('count increased measurement depth offset one', () => {
    const m = new Measurement([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]);
    const res = m.countDepthIncsOver(1);
    expect(res).toBe(7);
});


test('count increased measurement depth offset three', () => {
    const m = new Measurement([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]);
    const res = m.countDepthIncsOver(3);
    expect(res).toBe(5);
});