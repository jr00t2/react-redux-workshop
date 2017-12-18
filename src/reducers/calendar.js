import * as ActionTypes from 'actions/types';

const defaultState = {
    rooms: {
        red: {
            entries: [],
        },
        blue: {
            entries: [],
        },
    }
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.GET_ENTRIES: {
            const { red, blue } = action.payload.data ? action.payload.data.calendarListEntries : defaultState.rooms;
            const blueEntries = Object.keys(blue.entries).map(
                (key) => ({
                     key: JSON.stringify(blue.entries[key]),
                     value: blue.entries[key],
                })
            )[0];
            const redEntries = Object.keys(red.entries).map(
                (key) => ({
                    key: JSON.stringify(red.entries[key]),
                    value: red.entries[key]}),
                )[0];
            return {
                ...state,
                rooms: {
                    red: {
                        entries: [
                            ...state.rooms.red.entries,
                            redEntries,
                        ],
                    },
                    blue: {
                        entries: [
                            ...state.rooms.blue.entries,
                            blueEntries,
                        ],
                    },
                }
            }
        }

        case ActionTypes.SET_CANCELLED_STATE: {
            const { room, item } = action.payload;
            const index = state.rooms[room].entries.indexOf(item);
            const { rooms, rooms: {[room]: { entries: oldEntries } } } = state;
            const newItem = {
                ...oldEntries[index],
                isCancelled: true,
            };
            const entries = [
                ...oldEntries.slice(index + 1), //first element starts at 1... -.-*
                newItem,
            ];
            return {
                ...state,
                rooms: {
                    ...rooms,
                    [room]: {
                        entries,
                    }
                }
            }

        }

        default:
            return state;
    }
}
