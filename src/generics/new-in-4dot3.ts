// https://devblogs.microsoft.com/typescript/announcing-typescript-4-3/?utm_source=typescript-weekly.com&utm_campaign=typescript_weekly_172&utm_medium=email#contextual-narrowing
function makeUnique<T, C extends Set<T> | T[]>(
  collection: C,
  comparer: (x: T | undefined, y: T | undefined) => number,
): C {
  // Early bail-out if we have a Set.
  // We assume the elements are already unique.
  if (collection instanceof Set) {
    return collection
  }

  // Sort the array, then remove consecutive duplicates.
  collection.sort(comparer)
  //         ~~~~
  // error: Property 'sort' does not exist on type 'C'.
  for (let i = 0; i < collection.length; i++) {
    //                             ~~~~~~
    // error: Property 'length' does not exist on type 'C'.
    let j = i
    while (j < collection.length && comparer(collection[i], collection[j + 1]) === 0) {
      //                    ~~~~~~
      // error: Property 'length' does not exist on type 'C'.
      //                                       ~~~~~~~~~~~~~  ~~~~~~~~~~~~~~~~~
      // error: Element implicitly has an 'any' type because expression of type 'number'
      //        can't be used to index type 'Set<T> | T[]'.
      j++
    }
    collection.splice(i + 1, j - i)
    //         ~~~~~~
    // error: Property 'splice' does not exist on type 'C'.
  }
  return collection
}
