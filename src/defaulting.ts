export default {}
// basic function parameter defaulting
const func = (one: number, two: string = 'default') => {
    console.log(`one: ${one} two: ${two}`);
};

func(1);
func(2, 'override');

// Type parameter defaults
class Component<Properties = {}, State = {}> {
    constructor(private _props: Properties, private _state: State) {
    }
}

const component = new Component({}, {});
const stringComponent = new Component<string>('argument', {});
const numberComponent: Component<boolean, number> = new Component(true, 42);
console.log(numberComponent);
