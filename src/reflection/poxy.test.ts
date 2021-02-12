import { ripeBanana } from './proxy';

test('forward not trapped properties to the original object', () => {
    expect(ripeBanana.brand).toBe('blue banana')
});
test('return proxy override for trapped properties ', () => {
    expect(ripeBanana.color).toBe('spotty yellow')
});
