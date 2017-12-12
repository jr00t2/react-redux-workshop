const defaultState = {
    text: 'das ist ein langer text',
    person: {
        firstName: 'bob',
    },
    persons: [
        {
            firstName: 'Max',
            secondName: 'Mustermann',
            age: 18,
            car: {
                model: 'i30',
                manufacturer: 'Hyundai',
                horsePower: 99,
            },
        },
        {
            firstName: 'Buzz',
            secondName: 'Lyon',
            age: 38,
            car: {
                model: 'Diablo GT',
                manufacturer: 'Lamborghini',
                horsePower: 595,
            },
        },
        {
            firstName: 'Foo',
            secondName: 'Bar',
            age: 29,
            car: {
                model: 'Ford',
                manufacturer: 'Ka',
                horsePower: 45,
            },
        },
    ],
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'TEST':
            return {
                ...state,
                person: {
                    ...state.person,
                    firstName: action.payload.input,
                },
                history: state.history ? state.history.concat(state) : [state],
            };
        default:
            return state;
    }
}