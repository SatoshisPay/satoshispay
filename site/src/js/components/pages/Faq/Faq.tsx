import * as React from 'react';
import * as Icon from 'react-feather';

import Container from '../../reusable/Container';
import Heading from '../../reusable/Heading';
import Paragraph from '../../reusable/Paragraph';
import Accordion from '../../reusable/Accordion';
import Jumbotron from '../../reusable/Jumbotron';

import WalletScreenshot from '@/src/assets/images/app-screen-wallet.webp';

import Device from '../../reusable/Device';

const Faq = () => (
  <Container.FlexCols className="gap-8">
    <Container.FlexCols>
      <Heading.H1>Domande frequenti</Heading.H1>
      <Paragraph.Center className="text-lg">
        Trova una risposta alle tue domande.
      </Paragraph.Center>
    </Container.FlexCols>
    <Container.FlexCols className="gap-4">
      <Jumbotron>
        <Accordion
          title={
            <Heading.H2>
              Quali sono le commissioni per il venditore su SatoshisPay?
            </Heading.H2>
          }
        >
          <Paragraph.Leading>
            SatoshisPay non applica <strong>nessuna commissione</strong> sulle
            transazioni.
            <br />
            Le uniche commissioni in cui il venditore può incorrere sono quelle
            legate alla creazione di un channel Lightning Network.
          </Paragraph.Leading>
          <Heading.H3>Quando viene creato un channel?</Heading.H3>
          <Paragraph.Default>
            Un channel viene creato ogni qualvolta che il ricevente del
            pagamento, sta richiedendo un pagamento di un importo superiore a
            quello presente sul suo wallet Lightning Network, ovvero il wallet
            in-app.
          </Paragraph.Default>
          <Heading.H3>
            Perché se viene creato un nuovo channel vengono applicate delle
            commissioni?
          </Heading.H3>
          <Paragraph.Default>
            Il protocollo <strong>Lightning Network</strong> prevede che tra due
            utenti che effettuano transazioni, ci dev&apos;essere da entrambe le
            parti la liquidità necessaria per effettuare il pagamento. Nel caso
            questa non sia presente sarà anticipata da <strong>Breez</strong>,
            il nostro partner per la gestione dei nodi Lightning Network, il
            quale si prenderà una commissione.
          </Paragraph.Default>
          <Heading.H3>
            A quanto ammonta la commissione in caso di creazione del channel?
          </Heading.H3>
          <Paragraph.Default>
            In caso sia necessaria la creazione di un canale, viene applicata
            una commissione del <strong>0.4%</strong> sull&apos;importo
            ricevuto, con un minimo di <strong>2500 sats</strong>.
          </Paragraph.Default>
          <Heading.H3>
            Come posso evitare il pagamento delle commissioni?
          </Heading.H3>
          <Paragraph.Default>
            Per evitare il pagamento di commissioni sarà sufficiente depositare
            tramite la pagina <strong>Wallet</strong> -{' '}
            <strong>Deposito</strong> una quantità di Bitcoin sufficienti a
            coprire gli importi che si vogliono ricevere.
          </Paragraph.Default>
        </Accordion>
      </Jumbotron>
      <Jumbotron>
        <Accordion
          title={<Heading.H2>Come prelevo i miei Bitcoin?</Heading.H2>}
        >
          <Container.Flex className="flex-row sm:flex-col-reverse">
            <Container.Container className="flex-1">
              <Device.IPhone alt="wallet screenshot" image={WalletScreenshot} />
            </Container.Container>
            <Container.Container className="flex-1">
              <Paragraph.Leading>
                Per prelevare i Bitcoin dall&apos;app satoshispay ad un
                portafogli bitcoin esterno, sarà sufficiente andare nella pagina{' '}
                <strong>Wallet</strong> - <strong>Prelievo</strong> e inserire
                l&apos;indirizzo del portafogli esterno e la quantità di Bitcoin
                che si vuole prelevare.
              </Paragraph.Leading>
              <Paragraph.Leading>
                È anche possibile scannerizzare un codice QR di un indirizzo{' '}
                <strong>Bitcoin</strong> cliccando sull&apos;icona{' '}
                <Icon.Camera size={24} className="inline" />
              </Paragraph.Leading>
              <Paragraph.Leading>
                Una volta inseriti tutti i dati necessari al prelievo, premi
                &quot;Preleva&quot; e successivamente inserisci{' '}
                <strong>il PIN segreto</strong>.
              </Paragraph.Leading>
              <Paragraph.Leading>
                Una volta inviata la richiesta di prelievo vedrai il tuo
                prelievo nella lista dei prelievi{' '}
                <strong>Storico prelievi</strong> visibile sotto al form con lo
                stato del prelievo, la data dell&apos;operazione e gli importi
                in Sats e Euro.
              </Paragraph.Leading>
            </Container.Container>
          </Container.Flex>
        </Accordion>
      </Jumbotron>
    </Container.FlexCols>
  </Container.FlexCols>
);

export default Faq;
