import {LOG_ENTRIES} from '../constants';

export const createLogEntry = logEntry => ({
  type: LOG_ENTRIES.CREATE_LOG_ENTRY,
  payload: logEntry,
});

export const editLogEntry = logEntry => ({
  type: LOG_ENTRIES.EDIT_LOG_ENTRY,
  payload: logEntry,
});

export const deleteLogEntry = logEntry => ({
  type: LOG_ENTRIES.DELETE_LOG_ENTRY,
  payload: logEntry,
});

export const getLogEntries = () => ({
  type: LOG_ENTRIES.GET_LOG_ENTRIES,
});
