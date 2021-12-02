import { CommandList } from "./command-list";


test('example for mode1', () => {
    const cmdL = new CommandList(['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2']);
    const pI = cmdL.executeMode1();
    expect(pI.horizontal).toBe(15);
    expect(pI.depth).toBe(10);
    expect(pI.solutionValue).toBe(150);
});

test('example for mode2', () => {
    const cmdL = new CommandList(['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2']);
    const pI = cmdL.executeMode2();
    expect(pI.horizontal).toBe(15);
    expect(pI.depth).toBe(60);
    expect(pI.solutionValue).toBe(900);
});