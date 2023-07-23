// https://www.typescriptlang.org/docs/handbook/variable-declarations.html#destructuring

// https://www.typescriptlang.org/docs/handbook/variable-declarations.html#array-destructuring
const basicArray = [1, 2, 3, 4]
let [one, two] = basicArray
one = -1

console.log(one, two)

let _1st, _2nd

;[_1st, _2nd] = basicArray
console.log(_1st, _2nd)

function parameterDeStructure(flag: boolean, [first, second]: number[]) {
  console.log(flag)
  console.log(first)
  console.log(second)
}

parameterDeStructure(true, basicArray)

let [first, ...rest] = basicArray

console.log(first)
console.log(rest)

const [, second, , fourth] = basicArray
console.log(second)
console.log(fourth)

// https://www.typescriptlang.org/docs/handbook/variable-declarations.html#tuple-destructuring
let tuple: [number, string, boolean] = [7, 'hello', true]
let [a, b, c] = tuple
console.log(a)
console.log(b)
console.log(c)

// https://www.typescriptlang.org/docs/handbook/variable-declarations.html#object-destructuring
