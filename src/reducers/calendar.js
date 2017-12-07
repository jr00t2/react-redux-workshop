const defaultState = {
    test: '',
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'test':
            return {
                ...state,
                test: action.payload,
            }
        default:
            return state;
    }
}