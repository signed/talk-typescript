function h1(titel: string) {
  return (content?: string) => {}
}

h1('There are a lot of compiler options in TypeScript')(
  `Do yourself a favour and use strict
Do not assume that a library uses strict, check! 
`,
)

h1('types are a compile type feature')(
  `
Tsc/babel/swc/... strip types away. What is executed is javascript 
You can use tagged unions or classes to make type based decisions at runtime
`,
)
h1('structural 🦆 typing')(
  `
types are not sealed    
`,
)

import './defaulting'
