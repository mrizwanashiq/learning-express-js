function sum(a, b) {
    return a + b;
}

test('addition should return 4', () => {
    const a = 2;
    const b = 2;

    expect(sum(a, b)).toBe(4);
});