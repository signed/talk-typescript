// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html
// https://dev.to/busypeoples/notes-on-typescript-mapped-types-and-lookup-types-i36


interface SomeInterface{
    justAProperty: Date;
}

type TypeOfJustAProperty = SomeInterface['justAProperty']
