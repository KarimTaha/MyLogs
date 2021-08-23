import {LOGS} from '../constants';
import {sqliteDatabase} from '../../database/Database';

const database = sqliteDatabase;

export const getLogs = () => async dispatch => {
  console.log('[getLogs Action] start');
  try {
    database.getLogs().then(logs => {
      dispatch({
        type: LOGS.GET_LOGS,
        payload: logs,
      });
    });
  } catch (error) {
    console.error('[getLogs Action] Error:', error);
  }
};

export const createLog = log => async dispatch => {
  console.log('[createLog Action] start');
  try {
    database.createLog(log).then(() => {
      dispatch(getLogs());
    });
  } catch (error) {
    console.error('[createLog Action] Error:', error);
  }
};

export const editLog = log => async dispatch => {
  console.log('[editLog Action] start');
  try {
    database.editLog(log).then(() => {
      dispatch(getLogs());
    });
  } catch (error) {
    console.error('[editLog Action] Error:', error);
  }
};

export const deleteLog = log => async dispatch => {
  console.log('[deleteLog Action] start');
  try {
    database.deleteLog(log).then(() => {
      dispatch(getLogs());
    });
  } catch (error) {
    console.error('[deleteLog Action] Error:', error);
  }
};
