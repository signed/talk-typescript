// https://devblogs.microsoft.com/typescript/announcing-typescript-3-5-rc/?utm_source=typescript-weekly.com&utm_campaign=typescript_weekly_96&utm_medium=email
type Person = {
    name: string;
    age: number;
    location: string;
};

type RemainingKeys = Exclude<keyof Person, "location">;

type QuantumPersonManual = Pick<Person, RemainingKeys>;

type QuantumPersonEquivaltent = {
    name: string;
    age: number;
}

// The Omit helper type
//todo upgrade to typescript 3.5 and add the sample

