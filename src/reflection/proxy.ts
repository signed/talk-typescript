// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// https://exploringjs.com/deep-js/ch_proxies.html
// https://2ality.com/2014/12/es6-proxies.html

export class Banana {
  readonly color = 'yellow'
  readonly brand = 'blue banana'

  peel(speed?: 'slow' | 'fast') {
    return `${speed ?? 'just'} yummy`
  }
}

type PeelType = Banana['peel']
type PeelParameters = Parameters<PeelType>

const track = (peel: PeelType): PeelType => {
  const handler: ProxyHandler<PeelType> = {
    apply(target: PeelType, thisArg: any, argArray: PeelParameters): string {
      let one = argArray ? argArray[0] : undefined
      if (one === undefined) {
        one = 'slow'
      }
      return target(one)
    },
  }
  return new Proxy(peel, handler)
}

const mature: ProxyHandler<Banana> = {
  get: function (target, propertyKey, receiver) {
    if ('color' === propertyKey) {
      return 'spotty yellow'
    }
    if ('peel' === propertyKey) {
      return track(target.peel)
      //return introspect(target.peel);
      //return new Proxy(target.peel, {})
    }
    return Reflect.get(target, propertyKey, receiver)
  },
}

export const ripeBanana = new Proxy(new Banana(), mature)
