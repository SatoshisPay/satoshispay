import {
  SQLiteDatabase,
  enablePromise,
  openDatabase,
} from 'react-native-sqlite-storage';
import Address from '../data/address';
import Transaction from '../data/transaction';
import Decimal from 'decimal.js';

const DATABASE_NAME = 'satoshispay.db';

enablePromise(true);

let databaseInitialized = false;

const ADDRESS_TABLE = 'address';
const ADDRESS_ADDRESS = 'address';
const ADDRESS_PRIVATE_KEY = 'privateKey';
const ADDRESS_BALANCE = 'balance';
const ADDRESS_INSERTED_AT = 'insertedAt';

const TRANSACTION_TABLE = 'btcTransaction';
const TRANSACTION_ID = 'id';
const TRANSACTION_HASH = 'hash';
const TRANSACTION_ADDRESS = 'address';
const TRANSACTION_VALUE = 'value';
const TRANSACTION_STATUS = 'status';
const TRANSACTION_INSERTED_AT = 'insertedAt';

const getDBConnection = async (): Promise<SQLiteDatabase> => {
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
  await db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${ADDRESS_TABLE} (
      ${ADDRESS_ADDRESS} TEXT PRIMARY KEY NOT NULL,
      ${ADDRESS_PRIVATE_KEY} TEXT NOT NULL,
      ${ADDRESS_BALANCE} TEXT NOT NULL,
      ${ADDRESS_INSERTED_AT} TEXT NOT NULL
    );`,
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${TRANSACTION_TABLE} (
      ${TRANSACTION_ID} TEXT PRIMARY KEY NOT NULL,
      ${TRANSACTION_HASH} TEXT,
      ${TRANSACTION_ADDRESS} TEXT NOT NULL,
      ${TRANSACTION_VALUE} TEXT NOT NULL,
      ${TRANSACTION_STATUS} TEXT NOT NULL,
      ${TRANSACTION_INSERTED_AT} TEXT NOT NULL,
      FOREIGN KEY (${TRANSACTION_ADDRESS}) REFERENCES ${ADDRESS_TABLE} (${ADDRESS_ADDRESS})
      );`,
    );
  });
};

export const insertAddress = async (address: Address) => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO ${ADDRESS_TABLE} (${ADDRESS_ADDRESS}, ${ADDRESS_PRIVATE_KEY}, ${ADDRESS_BALANCE}, ${ADDRESS_INSERTED_AT}) VALUES (?, ?, ?, ?);`,
    [
      address.address,
      address.privateKey,
      address.balance.toString(),
      address.insertedAt.toISOString(),
    ],
  );
};

/**
 * @description get the total balance for the wallet
 * @returns {Promise<Address[]>}
 */
export const getBalance = async (): Promise<Decimal> => {
  const db = await getDBConnection();
  const [result] = await db.executeSql(
    `SELECT ${ADDRESS_BALANCE} AS balance FROM ${ADDRESS_TABLE};`,
  );
  let balance = new Decimal(0);
  for (let i = 0; i < result.rows.length; i++) {
    const addressBalance = new Decimal(result.rows.item(i).balance);
    balance = balance.plus(addressBalance);
  }
  return balance;
};

/**
 * @description update address balance and set provided transaction's status to confirmed
 * @param address
 * @param transaction
 */
export const updateAddressBalance = async (
  address: Address,
  transaction: Transaction,
) => {
  const db = await getDBConnection();
  await db.transaction(async tx => {
    await tx.executeSql(
      `UPDATE ${ADDRESS_TABLE} SET ${ADDRESS_BALANCE} = ? WHERE ${ADDRESS_ADDRESS} = ?;`,
      [address.balance.toString(), address.address],
    );
    await tx.executeSql(
      `UPDATE ${TRANSACTION_TABLE} SET ${TRANSACTION_STATUS} = ? WHERE ${TRANSACTION_HASH} = ?;`,
      [transaction.status, transaction.hash],
    );
  });
};

export const insertTransaction = async (transaction: Transaction) => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO ${TRANSACTION_TABLE} (${TRANSACTION_ID}, ${TRANSACTION_ADDRESS}, ${TRANSACTION_VALUE}, ${TRANSACTION_STATUS}, ${TRANSACTION_INSERTED_AT}) VALUES (?, ?, ?, ?, ?);`,
    [
      transaction.id,
      transaction.address.address,
      transaction.value.toString(),
      transaction.status,
      transaction.insertedAt.toISOString(),
    ],
  );
};

export const updateTransactionStatusAndHash = async (
  transaction: Transaction,
) => {
  const db = await getDBConnection();

  if (transaction.hash) {
    db.executeSql(
      `UPDATE ${TRANSACTION_TABLE} SET ${TRANSACTION_HASH} = ?, ${TRANSACTION_STATUS} = ? WHERE ${TRANSACTION_ID} = ?;`,
      [transaction.hash, transaction.status, transaction.id],
    );
  } else {
    db.executeSql(
      `UPDATE ${TRANSACTION_TABLE} SET ${TRANSACTION_STATUS} = ? WHERE ${TRANSACTION_ID} = ?;`,
      [transaction.status, transaction.id],
    );
  }
};
