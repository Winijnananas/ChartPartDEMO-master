import * as SQLite from 'expo-sqlite';

const database_name = 'database.db';

export function openDatabase() {
  const db = SQLite.openDatabase(database_name);
  return db;
}


export function createTable() {
  const db = openDatabase();
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY AUTOINCREMENT, label TEXT, value INTEGER);'
    );
  });
}

export function insertData(label, value) {
  const db = openDatabase();
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO data (label, value) VALUES (?, ?);',
      [label, value],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('Data inserted successfully2');
        } else {
          console.log('Failed to insert data');
        }
      }
    );
  });
}

export function fetchAllData(callback) {
  const db = openDatabase();
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM data;',
      [],
      (tx, results) => {
        const data = [];
        for (let i = 0; i < results.rows.length; i++) {
          data.push(results.rows.item(i));
        }
        callback(data);
      }
    );
  });
}
//delete
export function deleteAllData(callback) {
  const db = openDatabase();
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM data;',
      [],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('All data deleted successfully');
        } else {
          console.log('Failed to delete data');
        }
        callback();
      },
      (tx, error) => {
        console.error('Error deleting data:', error);
      }
    );
  });
}
