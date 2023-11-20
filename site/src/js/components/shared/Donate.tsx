import * as React from 'react';
import Image from 'next/image';

import Container from '../reusable/Container';

import BtcDonateSvg from '@/src/assets/images/btc-donate.svg';

interface Props {
  center?: boolean;
  size?: number;
  text?: string;
  address?: boolean;
}

const Donate = ({ size, text, center, address }: Props) => {
  return (
    <Container.FlexCols
      className={`gap-4 ${center ? 'items-center justify-center' : ''}`}
    >
      {text && (
        <Container.Container>
          <span className="block">{text}</span>
        </Container.Container>
      )}
      <a
        href="https://blockchair.com/bitcoin/address/bc1qql247l894ahqvd5affjk69mrf49dcnxg7c0l74"
        target="_blank"
      >
        <Image
          src={BtcDonateSvg}
          alt="bitcoin donate qr code"
          width={size ?? 256}
          height={size ?? 256}
        />
      </a>
      {address && (
        <Container.Container>
          <code>bc1qql247l894ahqvd5affjk69mrf49dcnxg7c0l74</code>
        </Container.Container>
      )}
    </Container.FlexCols>
  );
};

export default Donate;
