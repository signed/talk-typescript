interface One {
    a: string
}

interface Two {
    b: number
}

type Combined = One & Two;

const combined: Combined = {
    a: 'a',
    b: 7
};

console.log(combined);

