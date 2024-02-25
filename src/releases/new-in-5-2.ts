// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html

{
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#named-and-anonymous-tuple-elements
  type HasLabels = [a: string, string]
  type HasNoLabels = [number, number]
  type Merged = [...HasNoLabels, ...HasLabels]
}
