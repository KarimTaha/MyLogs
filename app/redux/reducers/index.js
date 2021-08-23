import {combineReducers} from 'redux';
import logsReducer from './logsReducer';
import logEntriesReducer from './logEntriesReducer';

export default combineReducers({
  logs: logsReducer,
  // logEntries: logEntriesReducer,
});
