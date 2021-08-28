// https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript

enum Color {
    Red,
    Green,
    Blue
}

function getColorName(c: Color) {
    switch (c) {
        case Color.Red:
            return "red";
        case Color.Green:
            return "green";
        // case Color.Blue:
        //     return "blue"
        default:
            // @ts-expect-error
            const exhaustiveCheck: never = c;
            throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
    }
}
