// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html
// https://dev.to/busypeoples/notes-on-typescript-mapped-types-and-lookup-types-i36


interface SomeInterface{
    justAProperty: Date;
    anotherOne: string;
}

const instance: SomeInterface = {
    anotherOne: 'flupp', justAProperty: new Date()

}

type TypeOfJustAProperty = SomeInterface['justAProperty'];
type AllPropertiesOfSomeInterface = keyof SomeInterface;

const accessProperty = ( obj: SomeInterface, key: AllPropertiesOfSomeInterface) => {
    return obj[key]
}

const _first = accessProperty(instance, 'anotherOne' )

function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]; // Inferred type is T[K]
}

const _second = getProperty(instance, 'justAProperty')
