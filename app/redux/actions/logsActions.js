import {LOGS} from '../constants';
import { sqliteDatabase } from "../../database/Database";

const database = sqliteDatabase;
export const getLogs = () => async (dispatch) => {
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

export const createLog = (log) => async (dispatch) => {
  console.log('[createLog Action] start');
  try {
    database.createLog(log).then(() => {
      dispatch(getLogs());
    });
  } catch (error) {
    console.error('[createLog Action] Error:', error);
  }
};

export const editLog = log => ({
  type: LOGS.EDIT_LOG,
  payload: log,
});

export const deleteLog = log => ({
  type: LOGS.DELETE_LOG,
  payload: log,
});
