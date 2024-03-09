import { it, expect } from '@jest/globals';
import {
  isBolt11,
  isBtcAddress,
  parseBitcoinQRCode,
  parseBolt11Amount,
} from '../../src/utils/parser';
import Decimal from 'decimal.js';

it('should parse bolt11', () => {
  expect(
    parseBolt11Amount(
      'lnbc239860n1pj7cs0jpp5dl8ftu0ec6sm5nlnz4z2yyujpljs2plxlknh2q4mu2mh588rcqwsdz2gf5hgun9ve5kcmpq8ycnsvf58qurvtfc89jkytf5xf3k2ttpxe3rxtfevgmnxvmpvg6nvefh8ycqzx7xqrpcgsp58g86utcj8wcrvyvrcrjn8j9uwtsk2yp242znnae6defrthg5u08s9qyyssqmktjrad2yfzkxngkwkdhajnm2yntfgwsvpppvyyvzygpantayzex0wmxtc5css25qee66zact0p2q29dwkvevzv28sey48vhk63vpkgpdf7lkf',
    ),
  ).toStrictEqual(new Decimal('23986'));

  expect(
    isBolt11(
      'lnbc239860n1pj7cs0jpp5dl8ftu0ec6sm5nlnz4z2yyujpljs2plxlknh2q4mu2mh588rcqwsdz2gf5hgun9ve5kcmpq8ycnsvf58qurvtfc89jkytf5xf3k2ttpxe3rxtfevgmnxvmpvg6nvefh8ycqzx7xqrpcgsp58g86utcj8wcrvyvrcrjn8j9uwtsk2yp242znnae6defrthg5u08s9qyyssqmktjrad2yfzkxngkwkdhajnm2yntfgwsvpppvyyvzygpantayzex0wmxtc5css25qee66zact0p2q29dwkvevzv28sey48vhk63vpkgpdf7lkf',
    ),
  ).toStrictEqual(true);
});

it('should tell whether is bitcoin address', () => {
  expect(
    isBtcAddress('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq'),
  ).toStrictEqual(true);
  expect(isBtcAddress('1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2')).toStrictEqual(
    true,
  );
  expect(isBtcAddress('3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy')).toStrictEqual(
    true,
  );
});

it('should parse bitcoin qr code', async () => {
  expect(
    await parseBitcoinQRCode(
      'bitcoin:bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
    ),
  ).toStrictEqual({
    address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
    amount: undefined,
  });

  expect(
    await parseBitcoinQRCode(
      'bitcoin:bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq?amount=0.1',
    ),
  ).toStrictEqual({
    address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
    amount: new Decimal('0.1'),
  });
});
