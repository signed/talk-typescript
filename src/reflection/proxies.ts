export const introspect = <T extends object>(object: T): T => {
    return new Proxy<T>(object, {
        getPrototypeOf(target: T): object | null {
            console.log('tracer: getPrototypeOf');
            return Reflect.getPrototypeOf(target);
        },
        setPrototypeOf(target: T, v: any): boolean {
            console.log('tracer: setPrototypeOf');
            return Reflect.setPrototypeOf(target, v);
        },
        isExtensible(target: T): boolean {
            console.log('tracer: isExtensible');
            return Reflect.isExtensible(target);
        },
        preventExtensions(target: T): boolean {
            console.log('tracer: preventExtensions');
            return Reflect.preventExtensions(target);
        },
        getOwnPropertyDescriptor(target: T, p: PropertyKey): PropertyDescriptor | undefined {
            console.log('tracer: getOwnPropertyDescriptor');
            return Reflect.getOwnPropertyDescriptor(target, p);
        },
        has(target: T, p: PropertyKey): boolean {
            console.log('tracer: has');
            return Reflect.has(target, p);
        },
        get(target: T, p: PropertyKey, receiver: any): any {
            console.log('tracer: get ' + p.toString());
            return Reflect.get(target, p, receiver);
        },
        set(target: T, p: PropertyKey, value: any, receiver: any): boolean {
            console.log('tracer: set');
            return Reflect.set(target, value, receiver);
        },
        deleteProperty(target: T, p: PropertyKey): boolean {
            console.log('tracer: deleteProperty');
            return Reflect.deleteProperty(target, p);
        },
        defineProperty(target: T, p: PropertyKey, attributes: PropertyDescriptor): boolean {
            console.log('tracer: defineProperty');
            return Reflect.defineProperty(target, p, attributes);
        },
        ownKeys(target: T): PropertyKey[] {
            console.log('tracer: ownKeys');
            return Reflect.ownKeys(target);
        },
        apply(target: T, thisArg: any, argArray?: any): any {
            console.log('tracer: apply');
            if (!(target instanceof Function)) {
                throw new Error('hmm, this comes as a surprise');
            }
            return Reflect.apply(target, thisArg, argArray);
        },
        construct(target: T, argArray: any, newTarget?: any): object {
            console.log('tracer: construct');
            if (!(target instanceof Function)) {
                throw new Error('hmm, this comes as a surprise');
            }
            return Reflect.construct(target, argArray, newTarget);
        }
    });
};
