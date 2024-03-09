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
    parseBolt11Amount(
      'LIGHTNING:LNBC239860N1PJ7CS0JPP5DL8FTU0EC6SM5NLNZ4Z2YYUJPLJS2PLXLKNH2Q4MU2MH588RCQWSDZ2GF5HGUN9VE5KCMPQ8YCNSVF58QURVTFC89JKYTF5XF3K2TTPXE3RXTFEVGMNXVMPVG6NVEFH8YCQZX7XQRPCGSP58G86UTCJ8WCRVYVRCRJN8J9UWTSK2YP242ZNNAE6DEFRTHG5U08S9QYYSSQMKTJRAD2YFZKXNGKWKDHAJNM2YNTFGWSVPPPVYYVZYGPANTAYZEX0WMXTC5CSS25QEE66ZACT0P2Q29DWKVEVZV28SEY48VHK63VPKGPDF7LKF',
    ),
  ).toStrictEqual(new Decimal('23986'));

  expect(
    isBolt11(
      'lnbc239860n1pj7cs0jpp5dl8ftu0ec6sm5nlnz4z2yyujpljs2plxlknh2q4mu2mh588rcqwsdz2gf5hgun9ve5kcmpq8ycnsvf58qurvtfc89jkytf5xf3k2ttpxe3rxtfevgmnxvmpvg6nvefh8ycqzx7xqrpcgsp58g86utcj8wcrvyvrcrjn8j9uwtsk2yp242znnae6defrthg5u08s9qyyssqmktjrad2yfzkxngkwkdhajnm2yntfgwsvpppvyyvzygpantayzex0wmxtc5css25qee66zact0p2q29dwkvevzv28sey48vhk63vpkgpdf7lkf',
    ),
  ).toStrictEqual(true);

  expect(
    isBolt11(
      'LIGHTNING:LNBC239860N1PJ7CS0JPP5DL8FTU0EC6SM5NLNZ4Z2YYUJPLJS2PLXLKNH2Q4MU2MH588RCQWSDZ2GF5HGUN9VE5KCMPQ8YCNSVF58QURVTFC89JKYTF5XF3K2TTPXE3RXTFEVGMNXVMPVG6NVEFH8YCQZX7XQRPCGSP58G86UTCJ8WCRVYVRCRJN8J9UWTSK2YP242ZNNAE6DEFRTHG5U08S9QYYSSQMKTJRAD2YFZKXNGKWKDHAJNM2YNTFGWSVPPPVYYVZYGPANTAYZEX0WMXTC5CSS25QEE66ZACT0P2Q29DWKVEVZV28SEY48VHK63VPKGPDF7LKF',
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
