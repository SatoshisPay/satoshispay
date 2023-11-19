import * as React from 'react';
import * as Icon from 'react-feather';
import Script from 'next/script';
import type { Metadata } from 'next';

import Page from '@/src/js/components/reusable/Page';
import Heading from '@/src/js/components/reusable/Heading';
import Paragraph from '@/src/js/components/reusable/Paragraph';
import Container from '@/src/js/components/reusable/Container';
import Link from '@/src/js/components/reusable/Link';

import TelegramQr from '@/src/assets/images/telegram-qr.svg';
import Image from 'next/image';
import { Route } from '@/src/js/utils/routes';

const TITLE = 'Supporto | Satoshispay';
const DESCRIPTION =
  'Ottieni support per Satoshispay in pochi minuti contattandoci via email o Telegram.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL('https://satoshispay.app/support'),
  alternates: {
    canonical: 'https://satoshispay.app/support',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Satoshispay',
  },
};

const PrivacyPage = () => {
  return (
    <>
      <Script
        async
        src="https://analytics.veeso.dev/script.js"
        data-website-id="b4343ca0-5b4d-425b-984a-3aad3b411a02"
      />
      <Page.BlankPage>
        <Page.Body>
          <Container.Container className="py-4">
            <Heading.H1>Supporto</Heading.H1>
            <Paragraph.Center className="text-xl">
              Stai riscontrando dei problemi con Satoshispay? Contattaci con uno
              dei metodi sottostanti e ottieni supporto in poche ore.
            </Paragraph.Center>
            <Paragraph.Center>
              Per favore, prima di contattarci verifica che la risposta alle tue
              domande non si trovi già nella{' '}
              <Link.Paragraph href={Route.FAQ}>Guida</Link.Paragraph>.
            </Paragraph.Center>
          </Container.Container>
          <Container.Container className="grid grid-cols-2 sm:grid-cols-1 gap-4">
            <Container.Card className="bg-white">
              <Container.FlexCols className="items-center justify-center gap-2">
                <Heading.H2>
                  <Icon.Mail size={24} className="inline mr-2" />
                  Email
                </Heading.H2>
                <Paragraph.Center className="text-lg">
                  Contattaci via email a{' '}
                  <Link.Paragraph href={'mailto:info@bitcoinmonfalcone.it'}>
                    info@bitcoinmonfalcone.it
                  </Link.Paragraph>
                </Paragraph.Center>
              </Container.FlexCols>
            </Container.Card>
            <Container.Card className="bg-white">
              <Container.FlexCols className="items-center justify-center gap-2">
                <Heading.H2>
                  <Icon.Mail size={24} className="inline mr-2" />
                  Telegram
                </Heading.H2>
                <Image
                  src={TelegramQr}
                  alt="Telegram QR Code"
                  width={256}
                  height={256}
                />
                <Paragraph.Center className="text-lg">
                  Contattaci sul gruppo Telegram{' '}
                  <Link.Paragraph href={'https://t.me/+7n_enM4sRA05MmQ0'}>
                    SatoshisPay Support
                  </Link.Paragraph>
                </Paragraph.Center>
              </Container.FlexCols>
            </Container.Card>
          </Container.Container>
        </Page.Body>
      </Page.BlankPage>
    </>
  );
};

export default PrivacyPage;
