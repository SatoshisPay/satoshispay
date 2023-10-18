import {
  SQLiteDatabase,
  enablePromise,
  openDatabase,
} from 'react-native-sqlite-storage';

const DATABASE_NAME = 'satoshispay.db';

enablePromise(true);

let databaseInitialized = false;

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
  const db = await openDatabase({ name: DATABASE_NAME, location: 'default' });
  if (!databaseInitialized) {
    await initDB(db);
    databaseInitialized = true;
  }

  return db;
};

/**
 * @description execute the table initialization. To be executed only once on startup
 * @param db
 */
const initDB = async (db: SQLiteDatabase) => {
  // TODO: queries
  await db.executeSql(
    `CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount INTEGER NOT NULL,
      currency TEXT NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      status TEXT NOT NULL
    );`,
  );
};
