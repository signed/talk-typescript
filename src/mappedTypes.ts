// https://mariusschulz.com/blog/typescript-2-1-mapped-types
// https://github.com/Microsoft/TypeScript/blob/0a535f0bf7193741e6b4acf5b7dfea88e2d4beca/lib/lib.d.ts#L1379-L1405
// https://www.dslemay.com/blog/2020/05/25/typescript-utility-types-part-3-extract-exclude-and-nonnullable

/**
 * keyof
 *
 * It will just expose the keys of any given interface/type through a union
 */
type KeyOfAny = keyof any  // string | number | symbol
type KeyOfUnknown = keyof object

/**
 * typeof
 * extract type from an object
 */
const someObj = { foo: 42, bar: 'Hello' };
type SomeObjType = typeof someObj

/**
 * extract subtypes from a type
 */
type WithSubTypes = {
    sub : {one:string}[],
    marine: number
}
type Extracted = WithSubTypes['sub']

/**
 * infer
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-inference-in-conditional-types
 */
// TODO https://files.peterkroener.de/slides/ts60/#45/2

// each type in T is checked against the constraint separately
type Distributive<T> = T extends string | number ? T : never
type ApplyOne = Distributive<string>
type ApplyTwo = Distributive<number>
type ApplyThree = Distributive<string | number>
type ApplyFour = Distributive<string | number | boolean>

// the [] around T force a check of the entire type against the extends constraint of T
type NoneDistributive<T> = [T] extends [string | number] ? T : never
type NoneApplyOne = NoneDistributive<string>
type NoneApplyTwo = NoneDistributive<number>
type NoneApplyThree = NoneDistributive<string | number>
type NoneApplyFour = NoneDistributive<string | number | boolean>


// check if an empty object was passed
type Empty<T extends {}> = {} extends Required<T> ? true : false;
type isEmpty = Empty<{}>; // true
type isNotEmpty = Empty<{ name: string }>; // false

// length of a tuple
type Bang<T extends [...any]> = T['length'] extends 1 ? true : void;
type TooShort = Bang<[]>
type CorrectLength = Bang<[string]>
type TooLong = Bang<[string, string]>
