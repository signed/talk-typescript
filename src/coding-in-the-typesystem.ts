export {}
// https://www.typescriptlang.org/docs/handbook/2/types-from-types.html

// https://stackoverflow.com/questions/51528780/typescript-check-typeof-against-custom-type/51529486#comment105389691_51529486
// explains
const values = ['tell', 'me', 'why'] as const
type Step = typeof values
type ByHand = (typeof values)[0] | (typeof values)[1] | (typeof values)[2]
type TypeOfAllKeysAccessibleUsingANumberIndex = Step[number]

// return typs based on input parameters
//https://stackoverflow.com/questions/54165536/typescript-function-return-type-based-on-input-parameter

// type to remove trailing spaces in a string
// handle tail recursive types in the typesystem
// https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-beta/#tailrec-conditional
