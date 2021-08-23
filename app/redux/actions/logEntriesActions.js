import {LOG_ENTRIES} from '../constants';
import {sqliteDatabase} from '../../database/Database';

const database = sqliteDatabase;

export const getLogEntries = () => async dispatch => {
  console.log('[getLogEntries Action] start');
  try {
    database.getLogEntries().then(entries => {
      dispatch({
        type: LOG_ENTRIES.GET_LOG_ENTRIES,
        payload: entries,
      });
    });
  } catch (error) {
    console.error('[getLogEntries Action] Error:', error);
  }
};

export const createLogEntry = logEntry => async dispatch => {
  console.log('[createLogEntry Action] start');
  try {
    database.createLogEntry(logEntry).then(() => {
      dispatch(getLogEntries());
    });
  } catch (error) {
    console.error('[createLogEntry Action] Error:', error);
  }
};

export const editLogEntry = logEntry => async dispatch => {
  console.log('[editLogEntry Action] start');
  try {
    database.editLogEntry(logEntry).then(() => {
      dispatch(getLogEntries());
    });
  } catch (error) {
    console.error('[editLogEntry Action] Error:', error);
  }
};

export const deleteLogEntry = logEntry => async dispatch => {
  console.log('[deleteLog Action] start');
  try {
    database.deleteLogEntry(logEntry).then(() => {
      dispatch(getLogEntries());
    });
  } catch (error) {
    console.error('[deleteLogEntry Action] Error:', error);
  }
};
