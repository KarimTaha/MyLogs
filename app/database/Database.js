import SQLite from 'react-native-sqlite-storage';
import {updateDatabaseTables} from './DatabaseInitialization';
import {DATABASE} from './Constants';
import {AppState} from 'react-native';

let databaseInstance;

// Get an array of all the logs in the database
async function getLogs() {
  console.log('[db] Fetching logs from the db...');
  return getDatabase()
    .then(db =>
      // Get all the logs, ordered by newest logs first
      db.executeSql(
        'SELECT log_id as id, name, description, color, type, reminder, creation_date FROM Log ORDER BY id DESC;',
      ),
    )
    .then(([results]) => {
      console.log('[db] select logs result = ', results);
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const logs = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {id, name, description, color, type, reminder, creation_date} =
          row;
        console.log(`[db] Log name: ${name}, id: ${id}`);
        logs.push({
          id,
          name,
          description,
          color,
          type,
          reminder,
          creation_date,
        });
      }
      return logs;
    })
    .catch(error => {
      console.log('[db] Error fetching logs', error);
    });
}

// Insert a new log into the database
async function createLog(newLog) {
  return getDatabase()
    .then(db =>
      db.executeSql(
        'INSERT INTO Log (name, description, color, type, reminder, creation_date) VALUES (?, ?, ?, ?, ?, ?);',
        [
          newLog.name,
          newLog.description,
          newLog.color,
          newLog.type,
          newLog.reminder,
          newLog.creation_date,
        ],
      ),
    )
    .then(([results]) => {
      const {insertId} = results;
      console.log(
        `[db] Added log with name: "${newLog.name}"! InsertId: ${insertId}`,
      );
    });
}

// Insert a new log into the database
async function editLog(log) {
  return getDatabase()
    .then(db =>
      db.executeSql(
        'UPDATE Log SET name = ?, description = ?, color = ?, type = ? , reminder = ? WHERE log_id = ?;',
        [log.name, log.description, log.color, log.type, log.reminder, log.id],
      ),
    )
    .then(([results]) => {
      console.log(
        `[db] Updated log with name: "${log.name}" and ID: ${log.id}`,
      );
    });
}

async function deleteLog(log) {
  console.log(`[db] Deleting log titled: "${log.name}" with id: ${log.id}`);
  return getDatabase()
    .then(db => {
      // Delete log items first, then delete the log itself
      return db
        .executeSql('DELETE FROM LogEntry WHERE log_id = ?;', [log.id])
        .then(() => db);
    })
    .then(db => db.executeSql('DELETE FROM Log WHERE log_id = ?;', [log.id]))
    .then(() => {
      console.log(`[db] Deleted log named: "${log.name}"!`);
    });
}

// Log entries
// Get an array of all the log entries in the database
async function getLogEntries(log_id) {
  console.log('[db] Fetching log entries from the db...');
  return getDatabase()
    .then(db =>
      // Get all the log entries, ordered by newest log entries first
      db.executeSql(
        'SELECT entry_id as id, value, value_date, creation_date FROM LogEntry WHERE log_id = ? ORDER BY id DESC;', [log_id]
      ),
    )
    .then(([results]) => {
      console.log('[db] select log entries result = ', results);
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const entries = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {id, value, value_date, creation_date} = row;
        console.log(`[db] Log entry id: ${id}`);
        entries.push({
          id,
          value,
          value_date,
          creation_date,
          log_id,
        });
      }
      return entries;
    })
    .catch(error => {
      console.log('[db] Error fetching entries', error);
    });
}

// Insert a new log into the database
async function createLogEntry(newLogEntry) {
  return getDatabase()
    .then(db =>
      db.executeSql(
        'INSERT INTO LogEntry (log_id, value, creation_date, value_date) VALUES (?, ?, ?, ?);',
        [newLogEntry.log_id, newLogEntry.value, newLogEntry.creation_date, newLogEntry.value_date],
      ),
    )
    .then(([results]) => {
      const {insertId} = results;
      console.log(
        `[db] Added log entry with log Id: "${newLogEntry.log_id}"! InsertId: ${insertId}`,
      );
    })
    .catch(error => {
      console.log('[db] Error creating entry', error);
    });
}

// Insert a new log into the database
async function editLogEntry(logEntry) {
  return getDatabase()
    .then(db =>
      db.executeSql('UPDATE LogEntry SET value = ? , value_date = ? WHERE entry_id = ?;', [
        logEntry.value,
        logEntry.value_date,
        logEntry.id,
      ]),
    )
    .then(([results]) => {
      console.log(`[db] Updated log entry with Id: ${logEntry.id}`);
    })
    .catch(error => {
      console.log('[db] Error editing entry', error);
    });
}

async function deleteLogEntry(logEntry) {
  console.log(`[db] Deleting log entry with id: ${logEntry.id}`);
  return getDatabase()
    .then(db =>
      db.executeSql('DELETE FROM LogEntry WHERE entry_id = ?;', [logEntry.id]),
    )
    .then(() => {
      console.log(`[db] Deleted log entry with Id: "${logEntry.id}"!`);
    });
}


// --------------"Private" helpers----------------

async function getDatabase() {
  if (databaseInstance !== undefined) {
    return Promise.resolve(databaseInstance);
  }
  // otherwise: open the database first
  return open();
}

// Open a connection to the database
async function open() {
  SQLite.DEBUG(true);
  SQLite.enablePromise(true);

  if (databaseInstance) {
    console.log(
      '[db] Database is already open: returning the existing instance',
    );
    return databaseInstance;
  }

  // Otherwise, create a new instance
  const db = await SQLite.openDatabase({
    name: DATABASE.FILE_NAME,
    location: 'default',
  });
  console.log('[db] Database open!');

  // Perform any database initialization or updates, if needed
  await updateDatabaseTables(db);

  databaseInstance = db;
  return db;
}

// Close the connection to the database
async function close() {
  if (databaseInstance === undefined) {
    console.log("[db] No need to close DB again - it's already closed");
    return;
  }
  const status = await databaseInstance.close().catch(error => {
    console.log('[db] error while closing the database', error);
  });
  console.log('[db] Database closed.');
  databaseInstance = undefined;
}

// Listen to app state changes. Close the database when the app is put into the background (or enters the "inactive" state)
let appState = 'active';
console.log('[db] Adding listener to handle app state changes');
AppState.addEventListener('change', handleAppStateChange);

// Handle the app going from foreground to background, and vice versa.
function handleAppStateChange(nextAppState) {
  if (appState === 'active' && nextAppState.match(/inactive|background/)) {
    // App has moved from the foreground into the background (or become inactive)
    console.log('[db] App has gone to the background - closing DB connection.');
    close();
  }
  appState = nextAppState;
}

// Export the functions which fulfill the Database interface contract
export const sqliteDatabase = {
  createLog,
  getLogs,
  deleteLog,
  editLog,
  getLogEntries,
  createLogEntry,
  editLogEntry,
  deleteLogEntry,
};
