import { diff } from 'deep-object-diff';
import { isEmpty } from 'lodash';

const logger = store => next => (action) => {
    /* eslint-disable no-console */
    console.group('Dispatch action:', action.type);
    const previous = store.getState();
    const result = next(action);
    const changes = diff(previous, store.getState());
    if (!isEmpty(changes)) {
      console.log('changes', changes);
    } else {
      console.log('no changes');
    }
    console.log('current state', store.getState());
    console.groupEnd(action.type);
    /* eslint-enable no-console */
    return result;
  };
  
  export default logger;