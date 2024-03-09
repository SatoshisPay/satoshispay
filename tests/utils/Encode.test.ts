import { it, expect } from '@jest/globals';
import { encodeBIP21 } from '../../src/utils/encode';
import Decimal from 'decimal.js';

it('should encode bip21', () => {
  expect(
    encodeBIP21('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq'),
  ).toStrictEqual('bitcoin:bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq');

  expect(
    encodeBIP21(
      'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
      new Decimal('0.1'),
    ),
  ).toStrictEqual(
    'bitcoin:bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq?amount=0.1',
  );
});
