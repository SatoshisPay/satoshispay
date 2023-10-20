import {
  SQLiteDatabase,
  enablePromise,
  openDatabase,
} from 'react-native-sqlite-storage';
import Address from '../data/address';
import Transaction from '../data/transaction';
import Decimal from 'decimal.js';
import Order, { OrderStatus } from '../data/order';

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
const ORDER_SATS_AMOUNT = 'satsAmount';
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
  return await db.transaction(tx => {
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
      ${ORDER_SATS_AMOUNT} TEXT NOT NULL,
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

export const getAddressByAddress = async (
  address: string,
): Promise<Address> => {
  const db = await getDBConnection();
  const [result] = await db.executeSql(
    `SELECT * FROM ${ADDRESS_TABLE} WHERE ${ADDRESS_ADDRESS} = ?;`,
    [address],
  );
  const addressObj = {
    address: result.rows.item(0).address,
    privateKey: result.rows.item(0).privateKey,
    balance: new Decimal(result.rows.item(0).balance),
    insertedAt: new Date(result.rows.item(0).insertedAt),
  };

  return addressObj;
};

export const insertAddressWithOrder = async (
  address: Address,
  order: Order,
) => {
  const db = await getDBConnection();
  return await db.transaction(tx => {
    tx.executeSql(
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
      INSERT INTO ${ORDER_TABLE} (${ORDER_ID}, ${ORDER_ADDRESS}, ${ORDER_STATUS}, ${ORDER_SATS_AMOUNT}, ${ORDER_FIAT_AMOUNT}, ${ORDER_INSERTED_AT}, ${ORDER_UPDATED_AT}) VALUES (?, ?, ?, ?, ?, ?, ?);
      `,
      [
        order.id,
        order.address.address,
        order.status,
        order.satsAmount.toString(),
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

export const getOrderById = async (id: string): Promise<Order> => {
  const db = await getDBConnection();
  const [result] = await db.executeSql(
    `SELECT * FROM ${ORDER_TABLE} WHERE ${ORDER_ID} = ?;`,
    [id],
  );
  const order = {
    id: result.rows.item(0).id,
    address: await getAddressByAddress(result.rows.item(0).address),
    status: result.rows.item(0).status,
    satsAmount: new Decimal(result.rows.item(0).satsAmount),
    fiatAmount: new Decimal(result.rows.item(0).fiatAmount),
    insertedAt: new Date(result.rows.item(0).insertedAt),
    updatedAt: new Date(result.rows.item(0).updatedAt),
  };
  return order;
};

/**
 * @description update address balance and set provided orders's status. Also add all the passed transactions
 * @param address
 * @param transaction
 */
export const finalizeOrder = async (
  address: Address,
  order: Order,
  transactions: Transaction[],
) => {
  const db = await getDBConnection();
  return await db.transaction(tx => {
    tx.executeSql(
      `UPDATE ${ADDRESS_TABLE} SET ${ADDRESS_BALANCE} = ? WHERE ${ADDRESS_ADDRESS} = ?;`,
      [address.balance.toString(), address.address],
    );
    tx.executeSql(
      `UPDATE ${ORDER_TABLE} SET ${ORDER_STATUS} = ? WHERE ${ORDER_ID} = ?;`,
      [OrderStatus.CONFIRMED, order.id],
    );
    for (const transaction of transactions) {
      tx.executeSql(
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

export const cancelOrder = async (order: Order) => {
  const db = await getDBConnection();
  return await db.executeSql(
    `UPDATE ${ORDER_TABLE} SET ${ORDER_STATUS} = ? WHERE ${ORDER_ID} = ?;`,
    [OrderStatus.CANCELLED, order.id],
  );
};
