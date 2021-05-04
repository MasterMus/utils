import { 
    cardToNumericalValue4Reyes,
    cardToNumericalValue8Reyes,
    compareGrande4Reyes,
    compareGrande8Reyes
} from "./index";

// cardToNumericalValue4Reyes

test('K card expected to have 10 value', () => {
    expect(cardToNumericalValue4Reyes('K')).toBe(10);
});

test('C card expected to have 10 value', () => {
    expect(cardToNumericalValue4Reyes('C')).toBe(10);
});

test('S card expected to have 10 value', () => {
    expect(cardToNumericalValue4Reyes('S')).toBe(10);
});

test('7 card expected to have 7 value', () => {
    expect(cardToNumericalValue4Reyes('7')).toBe(7);
});

test('6 card expected to have 6 value', () => {
    expect(cardToNumericalValue4Reyes('6')).toBe(6);
});

test('5 card expected to have 5 value', () => {
    expect(cardToNumericalValue4Reyes('5')).toBe(5);
});

test('4 card expected to have 4 value', () => {
    expect(cardToNumericalValue4Reyes('4')).toBe(4);
});

test('3 card expected to have 3 value', () => {
    expect(cardToNumericalValue4Reyes('3')).toBe(3);
});

test('2 card expected to have 2 value', () => {
    expect(cardToNumericalValue4Reyes('2')).toBe(2);
});

test('A card expected to have 1 value', () => {
    expect(cardToNumericalValue4Reyes('A')).toBe(1);
});

// cardToNumericalValue8Reyes

test('K card expected to have 10 value', () => {
    expect(cardToNumericalValue8Reyes('K')).toBe(10);
});

test('C card expected to have 10 value', () => {
    expect(cardToNumericalValue8Reyes('C')).toBe(10);
});

test('S card expected to have 10 value', () => {
    expect(cardToNumericalValue8Reyes('S')).toBe(10);
});

test('7 card expected to have 7 value', () => {
    expect(cardToNumericalValue8Reyes('7')).toBe(7);
});

test('6 card expected to have 6 value', () => {
    expect(cardToNumericalValue8Reyes('6')).toBe(6);
});

test('5 card expected to have 5 value', () => {
    expect(cardToNumericalValue8Reyes('5')).toBe(5);
});

test('4 card expected to have 4 value', () => {
    expect(cardToNumericalValue8Reyes('4')).toBe(4);
});

test('3 card expected to have 10 value', () => {
    expect(cardToNumericalValue8Reyes('3')).toBe(10);
});

test('2 card expected to have 1 value', () => {
    expect(cardToNumericalValue8Reyes('2')).toBe(1);
});

test('A card expected to have 1 value', () => {
    expect(cardToNumericalValue8Reyes('A')).toBe(1);
});


// compareGrande4Reyes

test('Same hand been "mano" should return 1', () => {
    expect(compareGrande4Reyes(['K', 'K', 'K', 'K'], ['K', 'K', 'K', 'K'], true)).toBe(1);
});

test('Same hand not been "mano" should return -1', () => {
    expect(compareGrande4Reyes(['K', 'K', 'K', 'K'], ['K', 'K', 'K', 'K'], false)).toBe(-1);
});

test('4 Reyes vs 3 Reyes 1 Caballo should return 1', () => {
    expect(compareGrande4Reyes(['K', 'K', 'K', 'K'], ['K', 'K', 'K', 'C'], false)).toBe(1);
});

test('3 Reyes 1 Caballo vs 4 Reyes should return -1', () => {
    expect(compareGrande4Reyes(['K', 'K', 'K', 'C'], ['K', 'K', 'K', 'K'], false)).toBe(-1);
});

test('', () => {
    expect(compareGrande4Reyes(['K', 'A', 'A', 'A'], ['C', 'C', 'C', 'C'], false)).toBe(1);
});

test('', () => {
    expect(compareGrande4Reyes(['K', 'C', 'A', 'A'], ['K', 'C', '7', 'A'], false)).toBe(-1);
});

// compareGrande8Reyes

test('', () => {
    expect(compareGrande8Reyes(['K', '3', '2', 'A'], ['K', 'C', '7', 'A'], false)).toBe(1);
});

test('', () => {
    expect(compareGrande8Reyes(['K', '3', '2', 'A'], ['K', 'K', '7', 'A'], false)).toBe(-1);
});

test('', () => {
    expect(compareGrande8Reyes(['K', '3', '2', 'A'], ['K', 'K', 'A', 'A'], true)).toBe(1);
});

test('', () => {
    expect(compareGrande8Reyes(['K', '3', '2', 'A'], ['K', 'K', 'A', 'A'], false)).toBe(-1);
});