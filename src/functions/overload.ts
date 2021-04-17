// https://stackoverflow.com/questions/61882444/how-to-combine-discriminated-unions-with-function-overloads-in-typescript

function overloadedFunction(mode: 'one'): void
function overloadedFunction(mode: 'two', details: string): void
function overloadedFunction(mode: 'one' | 'two', details?: string): void {
    if (mode === 'one') {
        return;
    }
    if (mode === 'two') {
        //@ts-expect-error
        console.log(details.length);
    }
}

type OverloadedArrowFunction = {
    (mode: 'one'): void;
    (mode: 'two', details: string): void
}

const example: OverloadedArrowFunction = (mode: 'one' | 'two', details?: string): void => {
    if (mode === 'one') {
        return;
    }

    if (mode === 'two') {
        //@ts-expect-error
        console.log(details.length);
    }
};

example('one');

//@ts-expect-error
example('two');

