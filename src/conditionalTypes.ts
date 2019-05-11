// https://codewithstyle.info/TypeScript-conditional-types-real-life-example/

type IsString<T> = T extends string ? 'yes' : 'no';

const nope: IsString<'banana'> = 'yes';