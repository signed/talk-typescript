import { ReadableSignal, Signal } from 'micro-signals';
import { SignalWithTracking, Tag, TrackingContext } from './signal-with-tracking';

test('should ', () => {
    const signal = new Signal<string>();

    const trackingContext: TrackingContext<string> = {
        signal,
        signalsWithSubscription: new Set<ReadableSignal<unknown>>(),
        tag: new Tag('one')
    };
    const trackedSignal: ReadableSignal<string> = new SignalWithTracking(trackingContext);

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
