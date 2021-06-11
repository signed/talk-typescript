const aNumber: number = 5;
const aBoolean: boolean = false;
let aStringLiteral: 'string literal type' = 'string literal type';

console.log(aNumber, aBoolean, aStringLiteral);

type TrafficLightColor = 'red' | 'yellow' | 'green';

let current: TrafficLightColor = 'red';
current = 'yellow';


/* A string literal type can be considered a subtype of the string type.
 This means that a string literal type is assignable to a plain string, but not vice-versa.
 */

// Template literal types
//https://ikoshelev.azurewebsites.net/search/id/16/Pragmatic-uses-of-TypeScript-type-system-03-Tag-hierarchies-via-Template-Literal-Types?utm_source=typescript-weekly.com&utm_campaign=typescript_weekly_171&utm_medium=email

type VanTag = `van${string}`;
const vanTag: VanTag = `van`;

type AmbulanceTag = `van;ambulance${string}`
const ambulanceTag: AmbulanceTag = 'van;ambulance' as const

const hello = (_vanTag: VanTag) => true;

hello(vanTag)
hello(ambulanceTag)

