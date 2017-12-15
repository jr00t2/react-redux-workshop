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
            const blueEntries = Object.keys(blue.entries).map((key) => (blue.entries[key]));
            const redEntries = Object.keys(red.entries).map((key) => (red.entries[key]));
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
        default:
            return state;
    }
}
