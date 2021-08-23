import {LOG_ENTRIES} from '../constants';

const INITIAL_STATE = {
  items: [],
};

const logEntriesReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOG_ENTRIES.GET_LOG_ENTRIES:
      return {items: payload};
    default:
      return state;
  }
};

export default logEntriesReducer;
