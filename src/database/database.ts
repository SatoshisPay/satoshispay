import {
  SQLiteDatabase,
  enablePromise,
  openDatabase,
} from 'react-native-sqlite-storage';
import Address from '../data/address';
import Transaction from '../data/transaction';
import Decimal from 'decimal.js';
import Order, { OrderStatus, OrderType } from '../data/order';
import Withdrawal from '../data/withdrawal';

const DATABASE_NAME = 'satoshispay.db';

enablePromise(true);

let databaseInitialized = false;

const ADDRESS_TABLE = 'address';
const ADDRESS_ADDRESS = 'address';
const ADDRESS_MNEMONIC = 'mnemonic';
const ADDRESS_PRIVATE_KEY = 'privateKey';
const ADDRESS_BALANCE = 'balance';
const ADDRESS_INSERTED_AT = 'insertedAt';

const ORDER_TABLE = 'buyOrder';
const ORDER_ID = 'id';
const ORDER_ORDER_TYPE = 'orderType';
const ORDER_ADDRESS = 'address';
const ORDER_PAYMENT_HASH = 'paymentHash';
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

const WITHDRAWAL_TABLE = 'withdrawal';
const WITHDRAWAL_ID = 'id';
const WITHDRAWAL_RECIPIENT = 'recipient';
const WITHDRAWAL_FIAT_AMOUNT = 'fiatAmount';
const WITHDRAWAL_SATS_AMOUNT = 'satsAmount';
const WITHDRAWAL_STATUS = 'status';
const WITHDRAWAL_INSERTED_AT = 'insertedAt';

const getDBConnection = async (): Promise<SQLiteDatabase> => {
  const db = await openDatabase({ name: DATABASE_NAME, location: 'default' });
  if (!databaseInitialized) {
    await initDB(db);
    databaseInitialized = true;
  }

  return db;
};

/**
 * @description reset the entire database
 * @returns
 */
export const resetDB = async () => {
  const db = await getDBConnection();
  return await db.transaction(tx => {
    tx.executeSql(`DROP TABLE ${ADDRESS_TABLE};`);
    tx.executeSql(`DROP TABLE ${ORDER_TABLE};`);
    tx.executeSql(`DROP TABLE ${TRANSACTION_TABLE};`);
    tx.executeSql(`DROP TABLE ${WITHDRAWAL_TABLE};`);
  });
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
      ${ADDRESS_MNEMONIC} TEXT NOT NULL,
      ${ADDRESS_BALANCE} TEXT NOT NULL,
      ${ADDRESS_INSERTED_AT} TEXT NOT NULL
    );`,
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${ORDER_TABLE} (
      ${ORDER_ID} TEXT PRIMARY KEY NOT NULL,
      ${ORDER_ORDER_TYPE} TEXT NOT NULL,
      ${ORDER_ADDRESS} TEXT,
      ${ORDER_PAYMENT_HASH} TEXT,
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

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${WITHDRAWAL_TABLE} (
        ${WITHDRAWAL_ID} TEXT PRIMARY KEY NOT NULL,
        ${WITHDRAWAL_RECIPIENT} TEXT NOT NULL,
        ${WITHDRAWAL_FIAT_AMOUNT} TEXT NOT NULL,
        ${WITHDRAWAL_SATS_AMOUNT} TEXT NOT NULL,
        ${WITHDRAWAL_STATUS} TEXT NOT NULL,
        ${WITHDRAWAL_INSERTED_AT} TEXT NOT NULL
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
    mnemonic: result.rows.item(0).mnemonic,
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
    if (order.address === undefined || order.orderType !== OrderType.BTC) {
      throw new Error(
        'Address must be defined for order and the type must be BTC',
      );
    }
    tx.executeSql(
      `INSERT INTO ${ADDRESS_TABLE} (${ADDRESS_ADDRESS}, ${ADDRESS_MNEMONIC}, ${ADDRESS_PRIVATE_KEY}, ${ADDRESS_BALANCE}, ${ADDRESS_INSERTED_AT}) VALUES (?, ?, ?, ?, ?);`,
      [
        address.address,
        address.mnemonic,
        address.privateKey,
        address.balance.toString(),
        address.insertedAt.toISOString(),
      ],
    );
    tx.executeSql(
      `
      INSERT INTO ${ORDER_TABLE} (${ORDER_ID}, ${ORDER_ORDER_TYPE}, ${ORDER_ADDRESS}, ${ORDER_STATUS}, ${ORDER_SATS_AMOUNT}, ${ORDER_FIAT_AMOUNT}, ${ORDER_INSERTED_AT}, ${ORDER_UPDATED_AT}) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [
        order.id,
        order.orderType,
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

export const insertLnOrder = async (order: Order) => {
  const db = await getDBConnection();
  return await db.executeSql(
    `
    INSERT INTO ${ORDER_TABLE} (${ORDER_ID}, ${ORDER_ORDER_TYPE}, ${ORDER_PAYMENT_HASH}, ${ORDER_STATUS}, ${ORDER_SATS_AMOUNT}, ${ORDER_FIAT_AMOUNT}, ${ORDER_INSERTED_AT}, ${ORDER_UPDATED_AT}) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `,
    [
      order.id,
      order.orderType,
      order.paymentHash,
      order.status,
      order.satsAmount.toString(),
      order.fiatAmount.toString(),
      order.insertedAt.toISOString(),
      order.updatedAt.toISOString(),
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

export const getOrderById = async (id: string): Promise<Order> => {
  const db = await getDBConnection();
  const [result] = await db.executeSql(
    `SELECT * FROM ${ORDER_TABLE} WHERE ${ORDER_ID} = ?;`,
    [id],
  );
  // get address if btc
  const orderType = result.rows.item(0).orderType;
  let address;
  if (orderType === OrderType.BTC) {
    address = await getAddressByAddress(result.rows.item(0).address);
  }

  const order: Order = {
    id: result.rows.item(0).id,
    orderType,
    address,
    paymentHash: result.rows.item(0).paymentHash,
    status: result.rows.item(0).status,
    satsAmount: new Decimal(result.rows.item(0).satsAmount),
    fiatAmount: new Decimal(result.rows.item(0).fiatAmount),
    insertedAt: new Date(result.rows.item(0).insertedAt),
    updatedAt: new Date(result.rows.item(0).updatedAt),
  };
  return order;
};

export const getOrdersByDate = async (
  startDate: Date,
  endDate: Date,
  limit: number,
  offset: number,
): Promise<Order[]> => {
  const db = await getDBConnection();
  const [result] = await db.executeSql(
    `SELECT * FROM ${ORDER_TABLE} WHERE ${ORDER_INSERTED_AT} >= ? AND ${ORDER_INSERTED_AT} <= ? ORDER BY ${ORDER_UPDATED_AT} DESC LIMIT ? OFFSET ?;`,
    [startDate.toISOString(), endDate.toISOString(), limit, offset],
  );
  const orders: Order[] = [];
  for (let i = 0; i < result.rows.length; i++) {
    // get address if btc
    const orderType = result.rows.item(i).orderType;
    let address;
    if (orderType === OrderType.BTC) {
      address = await getAddressByAddress(result.rows.item(i).address);
    }

    const order: Order = {
      id: result.rows.item(i).id,
      orderType,
      address,
      paymentHash: result.rows.item(i).paymentHash,
      status: result.rows.item(i).status,
      satsAmount: new Decimal(result.rows.item(i).satsAmount),
      fiatAmount: new Decimal(result.rows.item(i).fiatAmount),
      insertedAt: new Date(result.rows.item(i).insertedAt),
      updatedAt: new Date(result.rows.item(i).updatedAt),
    };
    orders.push(order);
  }

  return orders;
};

export const getOrdersCount = async (
  startDate: Date,
  endDate: Date,
): Promise<number> => {
  const db = await getDBConnection();
  const [result] = await db.executeSql(
    `SELECT COUNT(*) AS count FROM ${ORDER_TABLE} WHERE ${ORDER_INSERTED_AT} >= ? AND ${ORDER_INSERTED_AT} <= ?;`,
    [startDate.toISOString(), endDate.toISOString()],
  );
  return result.rows.item(0).count;
};

export const getPendingOrders = async (): Promise<Order[]> => {
  const db = await getDBConnection();
  const [result] = await db.executeSql(
    `SELECT * FROM ${ORDER_TABLE} WHERE ${ORDER_STATUS} = ?;`,
    [OrderStatus.PENDING],
  );
  const orders: Order[] = [];
  for (let i = 0; i < result.rows.length; i++) {
    // get address if btc
    const orderType = result.rows.item(i).orderType;
    let address;
    if (orderType === OrderType.BTC) {
      address = await getAddressByAddress(result.rows.item(i).address);
    }

    const order: Order = {
      id: result.rows.item(i).id,
      orderType,
      address,
      paymentHash: result.rows.item(i).paymentHash,
      status: result.rows.item(i).status,
      satsAmount: new Decimal(result.rows.item(i).satsAmount),
      fiatAmount: new Decimal(result.rows.item(i).fiatAmount),
      insertedAt: new Date(result.rows.item(i).insertedAt),
      updatedAt: new Date(result.rows.item(i).updatedAt),
    };
    orders.push(order);
  }

  return orders;
};

/**
 * @description update address balance and set provided orders's status. Also add all the passed transactions
 * @param address
 * @param transaction
 */
export const finalizeOrder = async (
  address: Address | undefined,
  order: Order,
  transactions: Transaction[],
) => {
  const db = await getDBConnection();
  return await db.transaction(tx => {
    if (address) {
      tx.executeSql(
        `UPDATE ${ADDRESS_TABLE} SET ${ADDRESS_BALANCE} = ? WHERE ${ADDRESS_ADDRESS} = ?;`,
        [address.balance.toString(), address.address],
      );
    }
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

export const getOrderByPaymentHash = async (
  paymentHash: string,
): Promise<Order | undefined> => {
  const db = await getDBConnection();

  const [result] = await db.executeSql(
    `SELECT * FROM ${ORDER_TABLE} WHERE ${ORDER_PAYMENT_HASH} = ?;`,
    [paymentHash],
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  // get address if btc
  const orderType = result.rows.item(0).orderType;
  let address;
  if (orderType === OrderType.BTC) {
    address = await getAddressByAddress(result.rows.item(0).address);
  }

  const order: Order = {
    id: result.rows.item(0).id,
    orderType,
    address,
    paymentHash: result.rows.item(0).paymentHash,
    status: result.rows.item(0).status,
    satsAmount: new Decimal(result.rows.item(0).satsAmount),
    fiatAmount: new Decimal(result.rows.item(0).fiatAmount),
    insertedAt: new Date(result.rows.item(0).insertedAt),
    updatedAt: new Date(result.rows.item(0).updatedAt),
  };
  return order;
};

export const cancelOrder = async (order: Order) => {
  const db = await getDBConnection();
  return await db.executeSql(
    `UPDATE ${ORDER_TABLE} SET ${ORDER_STATUS} = ? WHERE ${ORDER_ID} = ?;`,
    [OrderStatus.CANCELLED, order.id],
  );
};

export const insertWithdrawal = async (withdrawal: Withdrawal) => {
  const db = await getDBConnection();
  return await db.executeSql(
    `INSERT INTO ${WITHDRAWAL_TABLE} (${WITHDRAWAL_ID}, ${WITHDRAWAL_RECIPIENT}, ${WITHDRAWAL_FIAT_AMOUNT}, ${WITHDRAWAL_SATS_AMOUNT}, ${WITHDRAWAL_STATUS}, ${WITHDRAWAL_INSERTED_AT}) VALUES (?, ?, ?, ?, ?, ?);`,
    [
      withdrawal.id,
      withdrawal.recipient,
      withdrawal.fiatAmount.toString(),
      withdrawal.satsAmount.toString(),
      withdrawal.status,
      withdrawal.insertedAt.toISOString(),
    ],
  );
};

export const getWithdrawalsByDate = async (
  limit: number,
  offset: number,
): Promise<Withdrawal[]> => {
  const db = await getDBConnection();
  const [result] = await db.executeSql(
    `SELECT * FROM ${WITHDRAWAL_TABLE} ORDER BY ${WITHDRAWAL_INSERTED_AT} DESC LIMIT ? OFFSET ?;`,
    [limit, offset],
  );
  const withdrawals: Withdrawal[] = [];
  for (let i = 0; i < result.rows.length; i++) {
    const withdrawal: Withdrawal = {
      id: result.rows.item(i).id,
      recipient: result.rows.item(i).recipient,
      fiatAmount: new Decimal(result.rows.item(i).fiatAmount),
      satsAmount: new Decimal(
        result.rows.item(i).satsAmount || result.rows.item(i).satAmount,
      ),
      status: result.rows.item(i).status,
      insertedAt: new Date(result.rows.item(i).insertedAt),
    };
    withdrawals.push(withdrawal);
  }

  return withdrawals;
};

export const updateWithdrawalStatus = async (withdrawal: Withdrawal) => {
  const db = await getDBConnection();
  return await db.executeSql(
    `UPDATE ${WITHDRAWAL_TABLE} SET ${WITHDRAWAL_STATUS} = ? WHERE ${WITHDRAWAL_ID} = ?;`,
    [withdrawal.status, withdrawal.id],
  );
};

export const getWithdrawalsCount = async (): Promise<number> => {
  const db = await getDBConnection();
  const [result] = await db.executeSql(
    `SELECT COUNT(*) AS count FROM ${WITHDRAWAL_TABLE};`,
  );
  return result.rows.item(0).count;
};
