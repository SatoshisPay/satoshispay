import * as React from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';

import Page from '@/src/js/components/reusable/Page';
import Container from '@/src/js/components/reusable/Container';
import Intro from '@/src/js/components/pages/GetStarted/Intro';
import Steps from '@/src/js/components/pages/GetStarted/Steps';

const TITLE = 'Come iniziare ad accettare pagamenti in Bitcoin | Satoshispay';
const DESCRIPTION =
  'Come iniziare ad accettare pagamenti in Bitcoin nella tua attività tramite la tecnologia di Lightning Network con SatoshisPay';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL('https://satoshispay.app/get-started'),
  alternates: {
    canonical: 'https://satoshispay.app/get-started',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Satoshispay',
  },
};

const GetStarted = () => {
  return (
    <>
      <Script
        async
        src="https://analytics.veeso.dev/script.js"
        data-website-id="b4343ca0-5b4d-425b-984a-3aad3b411a02"
      />
      <Page.BlankPage>
        <Page.Body>
          <Container.FlexCols>
            <Intro />
            <Steps />
          </Container.FlexCols>
        </Page.Body>
      </Page.BlankPage>
    </>
  );
};

export default GetStarted;
