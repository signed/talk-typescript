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
