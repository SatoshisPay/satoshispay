import * as React from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';

import Page from '@/src/js/components/reusable/Page';
import Heading from '@/src/js/components/reusable/Heading';
import Paragraph from '@/src/js/components/reusable/Paragraph';
import Container from '@/src/js/components/reusable/Container';

const TITLE = 'Privacy Policy | Satoshispay';
const DESCRIPTION = 'Privacy policy di Satoshispay';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL('https://satoshispay.app/privacy'),
  robots: 'noindex, nofollow',
  alternates: {
    canonical: 'https://satoshispay.app/privacy',
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
            <Heading.H1>Privacy Policy</Heading.H1>
            <Paragraph.Leading>
              Noi, di satoshispay.app, utilizziamo Umami per raccogliere dati.
              Abbiamo bisogno di questi dati per capire come utilizzi il nostro
              sito web, in modo da poter migliorarne il design e la
              funzionalità. Inoltre, ci servono questi dati per ottenere il
              massimo dalle nostre campagne di marketing.
            </Paragraph.Leading>
          </Container.Container>
          <Container.Container className="py-4">
            <Heading.H2 className="text-center">Umami</Heading.H2>
            <Paragraph.Default>
              Umami è un servizio di analisi web fornito da Umami Software, Inc
              (&quot;Umami&quot;). Umami utilizza i dati raccolti per monitorare
              ed esaminare l&apos;uso di questo sito web. Umami non colleziona
              nessun dato che può tracciare o risalire all&apos;utente. Umami è
              quindi GDPR compliant. Questo documento può essere stampato per
              riferimento utilizzando il comando di stampa nelle impostazioni di
              qualsiasi browser.
            </Paragraph.Default>
          </Container.Container>
          <Container.Container className="py-4">
            <Heading.H2 className="text-center">
              Owner e Data Controller
            </Heading.H2>
            <span className="block text-xl text-text">
              Nome: Christian Visintin
            </span>
            <span className="block text-xl text-text">
              Email: christian.visintin@veeso.dev
            </span>
            <Paragraph.Default>
              Il Titolare si riserva il diritto di apportare modifiche a questa
              politica sulla privacy in qualsiasi momento, notificando gli
              Utenti su questa pagina e, eventualmente, all&apos;interno di
              questo Sito Web e/o - per quanto tecnicamente e legalmente
              possibile - inviando una comunicazione agli Utenti tramite le
              informazioni di contatto disponibili al Titolare. Si consiglia
              vivamente di consultare frequentemente questa pagina, facendo
              riferimento alla data dell&apos;ultima modifica indicata in fondo.
              Qualora le modifiche interessino le attività di trattamento
              effettuate sulla base del consenso dell&apos;Utente, il Titolare
              raccoglierà un nuovo consenso da parte dell&apos;Utente, se
              necessario.
            </Paragraph.Default>
          </Container.Container>
          <Container.Container className="py-4">
            <Heading.H2 className="text-center">Legal action</Heading.H2>
            <Paragraph.Default>
              I Dati Personali dell&apos;Utente possono essere utilizzati per
              finalità legali da parte del Titolare in sede giudiziaria o nelle
              fasi che conducono a possibili azioni legali derivanti
              dall&apos;uso improprio di questo Sito Web o dei Servizi
              correlati. L&apos;Utente dichiara di essere consapevole che il
              Titolare potrebbe essere obbligato a rivelare dati personali su
              richiesta delle autorità pubbliche.
            </Paragraph.Default>
          </Container.Container>
          <Container.Container className="py-4">
            <Heading.H2 className="text-center">
              Informazioni non contenute in questo documento
            </Heading.H2>
            <Paragraph.Default>
              Maggiori dettagli riguardanti la raccolta o il trattamento dei
              Dati Personali possono essere richiesti in qualsiasi momento al
              Titolare. Si prega di consultare le informazioni di contatto
              all&apos;inizio di questo documento.
            </Paragraph.Default>
          </Container.Container>
          <span className="block text-xl text-text mt-4">
            Ultimo aggiornamento 19 novembre 2023
          </span>
        </Page.Body>
      </Page.BlankPage>
    </>
  );
};

export default PrivacyPage;
