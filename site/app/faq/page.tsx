import * as React from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';

import Page from '@/src/js/components/reusable/Page';
import Faq from '@/src/js/components/pages/Faq/Faq';

const TITLE = 'Domande frequenti | Satoshispay';
const DESCRIPTION =
  'Come prelevo i miei Bitcoin? | Perché devo fare un deposito di Bitcoin? | Quali sono le commissioni su Lightning Network?';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL('https://satoshispay.app/faq'),
  alternates: {
    canonical: 'https://satoshispay.app/faq',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Satoshispay',
  },
};

const FaqPage = () => {
  return (
    <>
      <Script
        async
        src="https://analytics.veeso.dev/script.js"
        data-website-id="b4343ca0-5b4d-425b-984a-3aad3b411a02"
      />
      <Page.BlankPage>
        <Page.Body>
          <Faq />
        </Page.Body>
      </Page.BlankPage>
    </>
  );
};

export default FaqPage;
