// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy

export class Banana {
    readonly color = 'yellow';
    readonly brand = 'blue banana';
}

const handler: ProxyHandler<Banana> = {
    get: function (target, propertyKey, receiver) {
        if (propertyKey === 'color') {
            return 'spotty yellow'
        }
        return Reflect.get(target, propertyKey, receiver);
    }
};
export const ripeBanana = new Proxy(new Banana(), handler);
