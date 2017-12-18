import * as ActionTypes from 'actions/types';
import _ from 'lodash';

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

function getItemJsonString(item) {
    return `${item.summary}, ${item.timeStart}, ${item.timeEnd}, ${item.organizerName}`.replace(/[|&;$%@"<>()+,]/g, "");
}
function filterEntryIfExistsOrExistsWithIsCancelled (currentEntries, nextEntries) {
    const mergedEntries = [
        ...currentEntries,
        nextEntries,
    ];
    const indexed = {};
    return mergedEntries.filter((item) => {
        const index = getItemJsonString(item);
        if (indexed[index] && !item.hasOwnProperty('isCancelled')) {
            return false;
        }
        indexed[index] = index;
        return true;
    });
    
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.GET_ENTRIES: {
            const { red, blue } = action.payload.data ? action.payload.data.calendarListEntries : defaultState.rooms;
            const blueEntries =
             filterEntryIfExistsOrExistsWithIsCancelled(
                 state.rooms.blue.entries,
                 Object.keys(blue.entries).map((key) => (blue.entries[key]))[0],
            );
            const redEntries = filterEntryIfExistsOrExistsWithIsCancelled(
                state.rooms.red.entries,
                Object.keys(red.entries).map((key) => (red.entries[key]))[0],
            );
            return {
                ...state,
                rooms: {
                    red: {
                        entries: redEntries,
                    },
                    blue: {
                        entries: blueEntries,
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
                ...oldEntries.slice(index + 1), //first element starts at 1 ... -.-*
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
