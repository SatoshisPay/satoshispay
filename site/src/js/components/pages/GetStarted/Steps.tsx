import * as React from 'react';
import * as Icon from 'react-feather';

import Container from '../../reusable/Container';
import Heading from '../../reusable/Heading';
import Paragraph from '../../reusable/Paragraph';
import Step from './Steps/Step';
import AppBadge from '../../reusable/AppBadge';
import Alerts from '../../reusable/Alerts';
import Device from '../../reusable/Device';
import Link from '../../reusable/Link';
import List from '../../reusable/List';

import DepositScreenshot from '@/src/assets/images/app-screen-deposit.webp';
import PosScreenshot from '@/src/assets/images/app-screen-home.webp';
import TxScreenshot from '@/src/assets/images/app-screen-tx.webp';
import HistoryScreenshot from '@/src/assets/images/app-screen-history.webp';
import Hr from '../../reusable/Hr';
import { Route } from '@/src/js/utils/routes';

const Steps = () => (
  <Container.FlexCols className="w-full gap-4">
    <Container.FlexCols className="items-center justify-center">
      <Heading.H2>
        Comincia ad accettare <strong>Bitcoin</strong> in 5 semplici passi
      </Heading.H2>
    </Container.FlexCols>
    <Container.FlexCols className="gap-8 w-full">
      <Step number={1} title={`Scarica l'App`}>
        <>
          <Paragraph.Leading>
            Scarica l&apos;app sul tuo telefono Android o sul tuo iPhone dagli
            store ufficiali.
          </Paragraph.Leading>
          <AppBadge containerClassName="flex flex-row gap-4" />
        </>
      </Step>
      <Step number={2} title={"Avvia l'app e deposita Bitcoin"}>
        <>
          <Alerts.Info>
            Questo passo non è obbligatorio, ma permette di evitare il pagamento
            di commissioni nell&apos;utilizzo di Satoshispay.
          </Alerts.Info>
          <Container.Flex className="flex-row sm:flex-col-reverse  items-center">
            <Container.Container className="flex-1">
              <Device.IPhone
                alt="Deposit app screenshot"
                image={DepositScreenshot}
              />
            </Container.Container>
            <Container.Container className="flex-1">
              <List.Unordered>
                <List.Item>
                  <Paragraph.Leading>
                    Dalla barra in alto recati nel <strong>Wallet</strong>{' '}
                    cliccando sull&apos;icona{' '}
                    <Icon.CreditCard className="inline" size={24} />
                  </Paragraph.Leading>
                </List.Item>
                <List.Item>
                  <Paragraph.Leading>
                    Clicca sul pulsante <strong>Deposito</strong>
                  </Paragraph.Leading>
                </List.Item>
                <List.Item>
                  <Paragraph.Leading>
                    Copia l&apos;indirizzo mostrato cliccando su{' '}
                    <Icon.Copy className="inline" size={24} /> oppure
                    scannerizza il codice QR visualizzato con la fotocamera.
                  </Paragraph.Leading>
                </List.Item>
                <List.Item>
                  <Paragraph.Leading>
                    Invia i <strong>Bitcoin</strong> all&apos;indirizzo. Puoi
                    inviare qualsiasi importo. Leggi la sezione sottostante
                    sulle commissioni per farti un&apos;idea di quanto inviare.
                  </Paragraph.Leading>
                </List.Item>
                <List.Item>
                  <Paragraph.Leading>
                    Ora aspetta che i <strong>Bitcoin</strong> arrivino sul tuo
                    wallet. Verranno mostrati nel{' '}
                    <strong>Bilancio attuale</strong>.
                  </Paragraph.Leading>
                </List.Item>
              </List.Unordered>
              <Container.Container>
                <Heading.H3>Perché devo fare un deposito?</Heading.H3>
                <Paragraph.Default>
                  Il dubbio è comprensibile, ma fare il deposito è necessario se
                  si vuole evitare il pagamento di commissioni. Per capirne il
                  motivo dobbiamo capire che per fare dei pagamenti su{' '}
                  <strong>Lightning Network</strong> è necessario che entrambe
                  le parti abbiano una liquidità{' '}
                  <strong>pari o superiore</strong> a quella che viene
                  trasferita nella transazione. Cioè se A deve traferire a B
                  50.000 sats, sia A, che B devono avere almeno 50.000 sats nel
                  loro wallet.
                </Paragraph.Default>
                <Container.Container>
                  <Heading.H4>
                    Ma quindi se non ho liquidità il pagamento non andrà a buon
                    fine?
                  </Heading.H4>
                  <Paragraph.Default>
                    No, dal momento che noi ci appoggiamo a un nodo fornito da{' '}
                    <Link.Paragraph
                      href={'https://breez.technology'}
                      target="_blank"
                    >
                      Breez
                    </Link.Paragraph>
                    , sarà Breez stesso a fare da intermediario e fornire la
                    liquidità necessaria per effettuare la transazione.
                    Tuttavia, poiché Breez ha dovuto pagare una commissione per
                    fornire la liquidità, Breez addebiterà al ricevente della
                    transazione (quindi all&apos;utente di Satoshispay) una
                    commissione del <strong>0.4%</strong> dell&apos;importo
                    ricevuto, con una commissione minima di{' '}
                    <strong>2500 sats</strong>.
                  </Paragraph.Default>
                </Container.Container>
                <Container.Container>
                  <Heading.H4>
                    Quindi, quanti <strong>Bitcoin</strong> depositare?
                  </Heading.H4>
                  <Paragraph.Default>
                    Idealisticamente, sarebbe meglio depositare un importo pari
                    al valore di un ordine medio che un cliente fa presso la
                    vostra attività. In questo modo, se un cliente dovesse
                    pagare con Bitcoin, non paghereste nessuna commissione. Ad
                    esempio un bar, depositando 50€ in Bitcoin, potrebbe coprire
                    qualsiasi ordine medio di un cliente e non preoccuparsi mai
                    più di pagare commissioni. Va anche considerato che una
                    volta che comincerete a ricevere pagamenti in{' '}
                    <strong>Bitcoin</strong> il vostro saldo aumenterà e quindi
                    potrete per sempre smettere di preoccuparvi delle
                    commissioni.
                  </Paragraph.Default>
                </Container.Container>
              </Container.Container>
            </Container.Container>
          </Container.Flex>
        </>
      </Step>
      <Step number={3} title="Fatti pagare in Bitcoin">
        <Container.Flex className="flex-row sm:flex-col-reverse items-center">
          <Container.Container className="flex-1">
            <Device.IPhone alt="Deposit app screenshot" image={PosScreenshot} />
          </Container.Container>
          <Container.Container className="flex-1">
            <List.Unordered>
              <List.Item>
                <Paragraph.Leading>
                  Dalla barra in alto recati nella <strong>Home</strong>{' '}
                  cliccando sull&apos;icona{' '}
                  <Icon.Home className="inline" size={24} />
                </Paragraph.Leading>
              </List.Item>
              <List.Item>
                <Paragraph.Leading>
                  Digita sul POS l&apos;importo da far pagare al cliente
                </Paragraph.Leading>
              </List.Item>
              <List.Item>
                <Paragraph.Leading>
                  Conferma l&apos;importo cliccando sull&apos;icona{' '}
                  <Icon.Check className="inline" size={24} />
                </Paragraph.Leading>
              </List.Item>
            </List.Unordered>
          </Container.Container>
        </Container.Flex>
      </Step>
      <Step number={4} title="Mostra al cliente il QR e attendi il pagamento">
        <Container.Flex className="flex-row sm:flex-col-reverse items-center">
          <Container.Container className="flex-1">
            <Device.IPhone alt="Deposit app screenshot" image={TxScreenshot} />
          </Container.Container>
          <Container.Container className="flex-1">
            <List.Unordered>
              <List.Item>
                <Paragraph.Leading>
                  Mostra il telefono al cliente in modo che possa scannerizzare
                  il codice QR visualizzato.
                </Paragraph.Leading>
              </List.Item>
              <List.Item>
                <Paragraph.Leading>
                  Il cliente verifica l&apos;importo in euro visualizzato e
                  invia l&apos;importo in satoshi mostrato sotto al codice QR.
                </Paragraph.Leading>
              </List.Item>
              <List.Item>
                <Paragraph.Leading>
                  Una volta che il cliente ha inviato la transazione, conferma
                  la transazione cliccando sull&apos;icona{' '}
                  <Icon.Check className="inline" size={24} />
                </Paragraph.Leading>
              </List.Item>
            </List.Unordered>
            <Container.Container>
              <Heading.H3>Il cliente ha cambiato idea?</Heading.H3>
              <Paragraph.Default>
                Clicca sull&apos;icona <Icon.X className="inline" size={24} />{' '}
                per annullare il pagamento.
              </Paragraph.Default>
            </Container.Container>
          </Container.Container>
        </Container.Flex>
      </Step>
      <Step number={5} title="Verifica la transazione">
        <Container.Flex className="flex-row sm:flex-col-reverse items-center">
          <Container.Container className="flex-1">
            <Device.IPhone
              alt="Deposit app screenshot"
              image={HistoryScreenshot}
            />
          </Container.Container>
          <Container.Container className="flex-1">
            <List.Unordered>
              <List.Item>
                <Paragraph.Leading>
                  Dalla barra in alto clicca sull&apos;icona{' '}
                  <Icon.Clock className="inline" size={24} />
                </Paragraph.Leading>
              </List.Item>
              <List.Item>
                <Paragraph.Leading>
                  Da qui potrai visualizzare tutte le transazioni registrate,
                  ognuna con il loro stato:
                </Paragraph.Leading>
                <List.Unordered>
                  <List.Item>
                    <Icon.Clock className="inline" size={24} /> In attesa di
                    ricevere il pagamento
                  </List.Item>
                  <List.Item>
                    <Icon.X className="inline" size={24} /> Hai cancellato la
                    transazione
                  </List.Item>
                  <List.Item>
                    <Icon.Check className="inline" size={24} /> I Bitcoin sono
                    stati ricevuti correttamente.
                  </List.Item>
                </List.Unordered>
              </List.Item>
              <List.Item>
                <Paragraph.Leading>
                  Verifica quindi che i soldi ricevuti corrispondono a quelli
                  che hai segnato sul POS.
                </Paragraph.Leading>
              </List.Item>
            </List.Unordered>
            <Alerts.Warning>
              Il valore in euro segnato nella pagina transazioni corrisponde a{' '}
              <span className="font-bold">
                quello registrato sul POS all&apos;emissione della transazione
              </span>{' '}
              e non al cambio odierno con i Satoshi inviati.
            </Alerts.Warning>
          </Container.Container>
        </Container.Flex>
      </Step>
    </Container.FlexCols>
    <Hr />
    <Container.FlexCols className="items-center justify-center">
      <Heading.H2 className="!text-center">
        Domande, dubbi, perplessità?
      </Heading.H2>
      <Paragraph.Center>
        Consula la nostra pagina <strong>&quot;Domande Frequenti&quot;</strong>{' '}
        e cerca una risposta alle tue domande.
      </Paragraph.Center>
      <Link.Button href={Route.url(Route.FAQ)}>
        Vai alle domande frequenti
      </Link.Button>
    </Container.FlexCols>
  </Container.FlexCols>
);

export default Steps;
