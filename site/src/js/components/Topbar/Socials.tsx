import * as React from 'react';

import Container from '../reusable/Container';
import Instagram from '../reusable/icons/Instagram';
import TikTok from '../reusable/icons/Tiktok';
import Telegram from '../reusable/icons/Telegram';
import Github from '../reusable/icons/Github';

const Socials = () => (
  <Container.FlexRow className="justify-around items-center gap-8">
    <a
      className="block"
      href="https://www.instagram.com/bitcoin.monfalcone/"
      target="_blank"
    >
      <Instagram fill="#ffffff" width={24} height={24} />
    </a>
    <a
      className="block"
      href="https://www.tiktok.com/@bitcoinmonfalcone/"
      target="_blank"
    >
      <TikTok fill="#ffffff" width={24} height={24} />
    </a>
    <a className="block" href="https://t.me/BitcoinMonfalcone" target="_blank">
      <Telegram fill="#ffffff" width={24} height={24} />
    </a>
    <a className="block" href="https://github.com/veeso-dev" target="_blank">
      <Github fill="#ffffff" width={24} height={24} />
    </a>
  </Container.FlexRow>
);

export default Socials;
