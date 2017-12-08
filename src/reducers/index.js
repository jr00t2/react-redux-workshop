import { combineReducers } from 'redux';
import calendar from './calendar';
import example from './example';

const rootReducer = combineReducers({
  calendar,
  example,
});

export default rootReducer;
