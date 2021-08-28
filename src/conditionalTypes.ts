// https://codewithstyle.info/TypeScript-conditional-types-real-life-example/
type IsString<T> = T extends string ? 'yes' : 'no';

const nope: IsString<'banana'> = 'yes';


// https://rossbulat.medium.com/typescript-conditionals-explained-a096591f3ac0
// filter out all other types from the union besides string or number
type StringOrNumberOnly<T> = T extends string | number ? T : never;
type MyResult = StringOrNumberOnly<string | number | boolean>;
// MyResult = string | number
