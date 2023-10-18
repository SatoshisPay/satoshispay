import {
  SQLiteDatabase,
  enablePromise,
  openDatabase,
} from 'react-native-sqlite-storage';
import Address from '../data/address';
import Transaction from '../data/transaction';
import Decimal from 'decimal.js';
import Order from '../data/order';

const DATABASE_NAME = 'satoshispay.db';

enablePromise(true);

let databaseInitialized = false;

const ADDRESS_TABLE = 'address';
const ADDRESS_ADDRESS = 'address';
const ADDRESS_PRIVATE_KEY = 'privateKey';
const ADDRESS_BALANCE = 'balance';
const ADDRESS_INSERTED_AT = 'insertedAt';

const ORDER_TABLE = 'buyOrder';
const ORDER_ID = 'id';
const ORDER_ADDRESS = 'address';
const ORDER_STATUS = 'status';
const ORDER_BTC_AMOUNT = 'btcAmount';
const ORDER_FIAT_AMOUNT = 'fiatAmount';
const ORDER_INSERTED_AT = 'insertedAt';
const ORDER_UPDATED_AT = 'updatedAt';

const TRANSACTION_TABLE = 'incomingTransaction';
const TRANSACTION_HASH = 'hash';
const TRANSACTION_ORDER = 'orderId';
const TRANSACTION_VALUE = 'value';
const TRANSACTION_INSERTED_AT = 'insertedAt';
const TRANSACTION_TIMESTAMP = 'timestamp';

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
      `CREATE TABLE IF NOT EXISTS ${ORDER_TABLE} (
      ${ORDER_ID} TEXT PRIMARY KEY NOT NULL,
      ${ORDER_ADDRESS} TEXT NOT NULL,
      ${ORDER_STATUS} TEXT NOT NULL,
      ${ORDER_BTC_AMOUNT} TEXT NOT NULL,
      ${ORDER_FIAT_AMOUNT} TEXT NOT NULL,
      ${ORDER_INSERTED_AT} TEXT NOT NULL,
      ${ORDER_UPDATED_AT} TEXT NOT NULL,
      FOREIGN KEY (${ORDER_ADDRESS}) REFERENCES ${ADDRESS_TABLE} (${ADDRESS_ADDRESS})
    );`,
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${TRANSACTION_TABLE} (
      ${TRANSACTION_HASH} TEXT PRIMARY KEY NOT NULL,
      ${TRANSACTION_ORDER} TEXT NOT NULL,
      ${TRANSACTION_VALUE} TEXT NOT NULL,
      ${TRANSACTION_INSERTED_AT} TEXT NOT NULL,
      ${TRANSACTION_TIMESTAMP} TEXT NOT NULL,
      FOREIGN KEY (${TRANSACTION_ORDER}) REFERENCES ${ORDER_TABLE} (${ORDER_ID})
    );`,
    );
  });
};

export const insertAddressWithOrder = async (
  address: Address,
  order: Order,
) => {
  const db = await getDBConnection();
  return await db.transaction(async tx => {
    await tx.executeSql(
      `INSERT INTO ${ADDRESS_TABLE} (${ADDRESS_ADDRESS}, ${ADDRESS_PRIVATE_KEY}, ${ADDRESS_BALANCE}, ${ADDRESS_INSERTED_AT}) VALUES (?, ?, ?, ?);`,
      [
        address.address,
        address.privateKey,
        address.balance.toString(),
        address.insertedAt.toISOString(),
      ],
    );
    tx.executeSql(
      `
      INSERT INTO ${ORDER_TABLE} (${ORDER_ID}, ${ORDER_ADDRESS}, ${ORDER_STATUS}, ${ORDER_BTC_AMOUNT}, ${ORDER_FIAT_AMOUNT}, ${ORDER_INSERTED_AT}, ${ORDER_UPDATED_AT}) VALUES (?, ?, ?, ?, ?, ?, ?);
      `,
      [
        order.id,
        order.address.address,
        order.status,
        order.btcAmount.toString(),
        order.fiatAmount.toString(),
        order.insertedAt.toISOString(),
        order.updatedAt.toISOString(),
      ],
    );
  });
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
 * @description update address balance and set provided orders's status. Also add all the passed transactions
 * @param address
 * @param transaction
 */
export const updateAddressBalance = async (
  address: Address,
  order: Order,
  transactions: Transaction[],
) => {
  const db = await getDBConnection();
  return await db.transaction(async tx => {
    await tx.executeSql(
      `UPDATE ${ADDRESS_TABLE} SET ${ADDRESS_BALANCE} = ? WHERE ${ADDRESS_ADDRESS} = ?;`,
      [address.balance.toString(), address.address],
    );
    await tx.executeSql(
      `UPDATE ${ORDER_TABLE} SET ${ORDER_STATUS} = ? WHERE ${ORDER_ID} = ?;`,
      [order.status, order.id],
    );
    for (const transaction of transactions) {
      await tx.executeSql(
        `INSERT INTO ${TRANSACTION_TABLE} (${TRANSACTION_HASH}, ${TRANSACTION_ORDER}, ${TRANSACTION_VALUE}, ${TRANSACTION_INSERTED_AT}, ${TRANSACTION_TIMESTAMP}) VALUES (?, ?, ?, ?, ?);`,
        [
          transaction.hash,
          transaction.order.id,
          transaction.value.toString(),
          transaction.insertedAt.toISOString(),
          transaction.timestamp.toISOString(),
        ],
      );
    }
  });
};
