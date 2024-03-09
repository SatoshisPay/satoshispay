import { it, expect } from '@jest/globals';
import {
  convertBTCToEUR,
  convertBTCtoSats,
  convertEURToBTC,
  convertEURToSats,
  convertSatsToBTC,
  convertSatsToEUR,
  convertStringToBytes,
} from '../../src/utils/conversion';
import Decimal from 'decimal.js';

it('should convert btc to eur', () => {
  expect(convertBTCToEUR(new Decimal('1000'), new Decimal('1'))).toStrictEqual(
    new Decimal('1000'),
  );
});

it('should convert btc to sats', () => {
  expect(convertBTCtoSats(new Decimal('1'))).toStrictEqual(
    new Decimal('100000000'),
  );
});

it('should convert eur to btc', () => {
  expect(convertEURToBTC(new Decimal('1000'), new Decimal('1'))).toStrictEqual(
    new Decimal('0.001'),
  );
});

it('should convert eur to sats', () => {
  expect(convertEURToSats(new Decimal('1000'), new Decimal('1'))).toStrictEqual(
    new Decimal('100000'),
  );
});

it('should convert sats to btc', () => {
  expect(convertSatsToBTC(new Decimal('100000000'))).toStrictEqual(
    new Decimal('1'),
  );
});

it('should convert sats to eur', () => {
  expect(
    convertSatsToEUR(new Decimal('1000'), new Decimal('100000000')),
  ).toStrictEqual(new Decimal('1000'));
});

it('should convert string to bytes', () => {
  expect(convertStringToBytes('hello')).toStrictEqual([
    104, 101, 108, 108, 111,
  ]);
});
