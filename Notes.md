# facts
- type script has a structural type system instead of a nominal type system like java/c++
- programming in the type system https://youtu.be/ET4kT88JRXs?t=847

#  [2alitie´s introduction to type script](http://2ality.com/2018/04/type-notation-typescript.html) 
- there are type operators to combine basic type expressions to more complex ones

https://mariusschulz.com/blog/typescript-2-3-generic-parameter-defaults

https://github.com/Microsoft/TypeScript/issues/14833 turing complete

# Typescript the language

## FAQ
### How can I work with a library that is not written in typescript?
If you just want to give it a quick try you can provide quick `any` types for all imports like [this](https://www.typescriptlang.org/docs/handbook/modules.html#shorthand-ambient-modules)
```typescript
declare module 'hot-new-module';

import x, {y} from 'hot-new-module';
x(y);
```
The compiler will not complain, but you will not get typesafety.
## [Scripts and Modules](https://www.typescriptlang.org/docs/handbook/modules.html#introduction) 
Any file containing a top-level import or export is considered a module.
Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope (and therefore to modules as well).
A script is a file with no imports or exports.
