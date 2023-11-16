import * as React from 'react';

import Container from '../../reusable/Container';
import Heading from '../../reusable/Heading';
import Paragraph from '../../reusable/Paragraph';
import Card from './Intro/Card';
import Image from 'next/image';

import BitcoinImg from '@/src/assets/images/bitcoin.webp';

const Intro = () => (
  <Container.FlexCols className="gap-8">
    <Container.FlexCols>
      <Heading.H1 className="text-3xl">Satoshispay</Heading.H1>
      <Paragraph.Center className="!text-2xl">
        Accetta pagamenti in <strong>Bitcoin</strong> nella tua attività
      </Paragraph.Center>

      <Container.Container className="grid grid-cols-3 sm:grid-cols-1 gap-8">
        <Card title={'No Custodial'}>
          <Paragraph.Center>
            Nessun ente terzo che custodisce i tuoi fondi, hai il{' '}
            <strong>pieno controllo</strong> del tuo portafoglio.
          </Paragraph.Center>
        </Card>
        <Card title={'Zero Commissioni'}>
          <>
            <Paragraph.Center>
              <strong>Nessuna commissione</strong> di transazione, nessuna
              commissione di gestione*.
            </Paragraph.Center>
            <Paragraph.Center className="text-xs text-text">
              *Solo nel caso il ricevente non abbia nel portafoglio una quantità
              di bitcoin uguale o maggiore all'importo, è prevista una
              commissione del 0.4% sull'importo ricevuto, con un minimo di 2500
              sats,
            </Paragraph.Center>
          </>
        </Card>
        <Card title={'Open Source e No-Profit'}>
          <Paragraph.Center>
            La nostra app è <strong>open-source</strong>: chiunque può leggere
            il nostro codice e verificare che cosa fa la nostra app con i soldi
            degli utenti.
          </Paragraph.Center>
        </Card>
      </Container.Container>
    </Container.FlexCols>
    <Container.FlexCols className="gap-4">
      <Container.FlexRow className="items-center justify-center gap-4">
        <Image src={BitcoinImg} alt="bitcoin logo" width={48} height={48} />
        <Heading.H2>
          Perché adottare <strong>Bitcoin</strong> come metodo di pagamento?
        </Heading.H2>
      </Container.FlexRow>
      <Container.Container className="grid grid-cols-3 sm:grid-cols-1 gap-8">
        <Card title={'Sicurezza e Trasparenza'}>
          <Paragraph.Center>
            Con <strong>Bitcoin</strong>, ogni transazione è immutabilmente
            registrata su una blockchain decentralizzata, garantendo un registro
            pubblico e accessibile a tutti. Questo significa maggiore sicurezza
            contro frodi e una tracciabilità senza precedenti, offrendo la
            tranquillità necessaria per le transazioni commerciali.
          </Paragraph.Center>
        </Card>
        <Card title={'Espansione Globale Senza Limiti'}>
          <Paragraph.Center>
            Le barriere tradizionali legate ai sistemi di pagamento
            convenzionali vengono superate, consentendo alle imprese di
            espandersi a livello internazionale senza preoccuparsi di
            conversioni complesse o costi eccessivi. La natura decentralizzata
            di <strong>Bitcoin</strong> rende le transazioni più efficienti,
            fornendo agli imprenditori l&apos;opportunità di creare connessioni
            commerciali in tutto il mondo.
          </Paragraph.Center>
        </Card>
        <Card title={'Innovazione e Futuro Finanziario Equo'}>
          <Paragraph.Center>
            La scelta di adottare <strong>Bitcoin</strong> non è solo un passo
            verso l&apos;innovazione, ma anche un impegno per un futuro
            finanziario più equo ed efficiente. Eliminando gli intermediari
            tradizionali, <strong>Bitcoin</strong> offre una soluzione
            peer-to-peer che mette il controllo direttamente nelle mani degli
            utenti.
          </Paragraph.Center>
        </Card>
      </Container.Container>
    </Container.FlexCols>
  </Container.FlexCols>
);

export default Intro;
