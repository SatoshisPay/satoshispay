import * as React from 'react';
import Container from './reusable/Container';
import Image from 'next/image';

import GooglePlayBadge from '@/src/assets/images/it_badge_web_generic.webp';
import AppStoreBadge from '@/src/assets/images/appstore.webp';
import AppBadge from './reusable/AppBadge';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-footer-texture w-screen flex flex-col text-gray-300 pb-4">
      <Container.FlexResponsiveRow className="w-page mx-auto justify-between py-4">
        <Container.FlexCols className="gap-2">
          <div>
            <span className="text-2xl block pb-4">Sito</span>
          </div>
          <a
            className="block hover:underline text-xl"
            href="https://bitcoinmonfalcone.it"
            target="_blank"
          >
            Bitcoin Monfalcone
          </a>
          <a
            className="block hover:underline text-xl"
            href="https://github.com/veeso-dev/satoshispay"
            target="_blank"
          >
            Github
          </a>
        </Container.FlexCols>
        <Container.FlexCols className="gap-2 hidden">
          <div>
            <span className="text-2xl block pb-4">Download</span>
          </div>
          <AppBadge containerClassName="flex flex-col gap-2 items-center" />
        </Container.FlexCols>
        <Container.FlexCols className="gap-2">
          <div>
            <span className="text-2xl block pb-4">Contatti</span>
          </div>
          <a
            className="block hover:underline text-xl"
            href="mailto:info@bitcoinmonfalcone.it"
            target="_blank"
          >
            info@bitcoinmonfalcone.it
          </a>
          <a
            className="block hover:underline text-xl"
            href="https://www.instagram.com/bitcoin.monfalcone/"
            target="_blank"
          >
            Instagram
          </a>
          <a
            className="block hover:underline text-xl"
            href="https://www.tiktok.com/@bitcoinmonfalcone/"
            target="_blank"
          >
            TikTok
          </a>
          <a
            className="block hover:underline text-xl"
            href="https://t.me/BitcoinMonfalcone"
            target="_blank"
          >
            Telegram
          </a>
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
