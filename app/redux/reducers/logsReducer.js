import {LOGS} from '../constants';

const INITIAL_STATE = {
  items: [],
};

const logsReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOGS.GET_LOGS:
      return {items: payload};
    default:
      return state;
  }
};

export default logsReducer;
