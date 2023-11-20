import * as React from 'react';
import Container from './reusable/Container';

import AppBadge from './reusable/AppBadge';

import BreezLogo from '@/src/assets/images/breez.svg';
import Image from 'next/image';
import Link from './reusable/Link';
import { Route } from '../utils/routes';
import Donate from './shared/Donate';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-footer-texture w-screen flex flex-col text-gray-300 pb-4">
      <Container.FlexResponsiveRow className="w-page mx-auto justify-between py-4">
        <Container.FlexCols className="gap-2">
          <div>
            <span className="text-2xl block pb-4">Sito</span>
          </div>
          <Link.Default href={Route.HOME}>Home</Link.Default>
          <Link.Default href={Route.GET_STARTED}>
            Inizia ad usare SatoshisPay
          </Link.Default>
          <Link.Default href={Route.FAQ}>Domande Frequenti</Link.Default>
          <Link.Default href={Route.SUPPORT}>Supporto</Link.Default>
          <Link.Default href={Route.PRIVACY}>Privacy Policy</Link.Default>
          <Link.Default href="https://bitcoinmonfalcone.it" target="_blank">
            Bitcoin Monfalcone
          </Link.Default>
          <Donate
            size={128}
            text="Supporta il nostro progetto con una piccola donazione"
          />
        </Container.FlexCols>
        <Container.FlexCols className="gap-2">
          <div>
            <span className="text-2xl block pb-4">Download</span>
          </div>
          <AppBadge containerClassName="flex flex-col gap-2" />
        </Container.FlexCols>
        <Container.FlexCols className="gap-2">
          <div>
            <span className="text-2xl block pb-4">Contatti</span>
          </div>
          <Link.Default href="mailto:info@bitcoinmonfalcone.it" target="_blank">
            info@bitcoinmonfalcone.it
          </Link.Default>
          <Link.Default
            href="https://www.instagram.com/bitcoin.monfalcone/"
            target="_blank"
          >
            Instagram
          </Link.Default>
          <Link.Default
            href="https://www.tiktok.com/@bitcoinmonfalcone/"
            target="_blank"
          >
            TikTok
          </Link.Default>
          <Link.Default href="https://t.me/BitcoinMonfalcone" target="_blank">
            Telegram
          </Link.Default>
          <Link.Default
            href="https://github.com/veeso-dev/satoshispay"
            target="_blank"
          >
            Github
          </Link.Default>
          <Container.Container className="py-4">
            <Link.Default href="https://breez.technology" target="_blank">
              <span className="text-white block text-xl">Powered by Breez</span>
              <Image src={BreezLogo} alt="breez sdk" width={128} height={64} />
            </Link.Default>
          </Container.Container>
        </Container.FlexCols>
      </Container.FlexResponsiveRow>
      <Container.FlexCols className="justify-center items-center gap-2">
        <span className="block text-text text-xs">
          Google Play e il logo di Google Play sono marchi di Google LLC.
        </span>
        <span className="block text-text text-xs">
          Copyright © {year} BitcoinMonfalcone
        </span>
      </Container.FlexCols>
    </footer>
  );
};

export default Footer;
