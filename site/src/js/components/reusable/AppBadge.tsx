import * as React from 'react';
// import Image from 'next/image';

import Container from './Container';

// import GooglePlayBadge from '@/src/assets/images/it_badge_web_generic.webp';
// import AppStoreBadge from '@/src/assets/images/appstore.webp';

interface Props {
  containerClassName?: string;
}

const AppBadge = ({ containerClassName }: Props) => (
  <Container.Container className={`${containerClassName}`}>
    <span className="text-lg">Disponibile prossimamente su Android e iOS</span>
    {/*
    <a className="block hover:underline text-xl" href="" target="_blank">
      <Image
        src={GooglePlayBadge}
        alt="google play badge"
        width="200"
        height="100"
      />
    </a>
    <a className="block hover:underline text-xl" href="" target="_blank">
      <Image
        src={AppStoreBadge}
        alt="appstore badge"
        width="200"
        height="100"
      />
    </a>
*/}
  </Container.Container>
);

export default AppBadge;