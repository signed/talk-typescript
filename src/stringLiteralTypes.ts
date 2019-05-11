const aNumber: number = 5;
const aBoolean: boolean = false;
let aStringLiteral: 'string literal type' = 'string literal type';

console.log(aNumber, aBoolean, aStringLiteral);

type TrafficLightColor = 'red' | 'yellow' | 'green';

let current: TrafficLightColor = 'red';
current = 'yellow';

