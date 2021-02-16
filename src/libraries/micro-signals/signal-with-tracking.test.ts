import { ReadableSignal, Signal } from 'micro-signals';
import { Tag, TrackingContext, trackListenersAddedTo } from './signal-with-tracking';

test('basic sanity check ', () => {
    const signal = new Signal<string>();

    const trackingContext: TrackingContext = {
        signalsWithSubscription: new Set<ReadableSignal<unknown>>(),
        tag: new Tag('one'),
        active: true
    };
    const trackedSignal = trackListenersAddedTo(signal, trackingContext);

    const one = () => {
        throw new Error('evil');
    };
    const two = () => {
        throw new Error('evil');
    };

    trackedSignal.addOnce(one);
    trackedSignal.addOnce(two);
    expect(trackingContext.signalsWithSubscription.size).toBe(1);

    trackingContext.signalsWithSubscription.forEach(signal => signal.remove(trackingContext.tag));

    expect(trackingContext.signalsWithSubscription.size).toBe(0);

    signal.dispatch('hello');
});
