import * as React from 'react';

import type { Metadata } from 'next';
import Page from '@/src/js/components/reusable/Page';
import Intro from '@/src/js/components/pages/Home/Intro';
import App from '@/src/js/components/pages/Home/App';
import ChiSiamo from '@/src/js/components/pages/Home/ChiSiamo';
import Container from '@/src/js/components/reusable/Container';

const TITLE = 'Accetta pagamenti in Bitcoin nella tua attività | Satoshispay';
const DESCRIPTION =
  "Scopri Satoshispay: l'app gratuita per accettare fin da subito pagamenti in bitcoin nella tua attività tramite la tecnologia di Lightning Network";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL('https://satoshispay.app/'),
  alternates: {
    canonical: 'https://satoshispay.app/',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Satoshispay',
  },
};

const Home = () => {
  return (
    <Page.BlankPage>
      <Page.Body>
        <Container.FlexCols className="gap-8">
          <Intro />
          <App />
          <ChiSiamo />
        </Container.FlexCols>
      </Page.Body>
    </Page.BlankPage>
  );
};

export default Home;
