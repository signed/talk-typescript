// https://www.typescriptlang.org/docs/handbook/enums.html

enum StringEnumeration {
    One = 'One',
    Two = 'Two',
    Three = 'Three',
}

namespace StringEnumeration {
    export function valuesAsArray(): StringEnumeration[] {
        return [StringEnumeration.One, StringEnumeration.Two, StringEnumeration.Three];
    }
}

type StringEnumerationStrings = Exclude<keyof typeof StringEnumeration, 'valuesAsArray' >;

{
    const assertUnreachable = (arg: never): never => {
        throw new Error('Did not expect this be executed ever');
    };

    const exhaustiveSwitch = (value: StringEnumeration) => {
        switch (value) {
            case StringEnumeration.One:
                return 1;
            case StringEnumeration.Two:
                return 2;
            case StringEnumeration.Three:
                return 3;
        }
        assertUnreachable(value);
    };
}

console.log();
console.log('const value in StringEnumeration.valuesAsArray()');
for (const value in StringEnumeration.valuesAsArray()) {
    console.log(value);
}

console.log();
console.log('const value of StringEnumeration.valuesAsArray()');
for (const value of StringEnumeration.valuesAsArray()) {
    console.log(value);
}

console.log();
console.log('const value in StringEnumeration');
for (const value in StringEnumeration) {
    console.log(value);
}

console.log();
console.log('const value in Object.values(StringEnumeration)');
for (const value in Object.values(StringEnumeration)) {
    console.log(value);
}

console.log();
console.log('const value in Object.keys(StringEnumeration)');
for (const value in Object.keys(StringEnumeration)) {
    console.log(value);
}
