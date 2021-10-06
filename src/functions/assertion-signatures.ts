// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html
//
function some(parameter: string | undefined) {
  ensureNotUndefined(parameter)
  parameter.length
}

function ensureNotUndefined(parameter: string | undefined): asserts parameter is string {}
