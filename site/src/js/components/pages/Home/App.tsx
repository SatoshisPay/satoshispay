import * as React from 'react';

import Screenshot1 from '@/src/assets/images/app-screen-home.webp';
import Screenshot2 from '@/src/assets/images/app-screen-tx.webp';
import Screenshot3 from '@/src/assets/images/app-screen-wallet.webp';
import GooglePlayBadge from '@/src/assets/images/it_badge_web_generic.webp';
import AppStoreBadge from '@/src/assets/images/appstore.webp';

import Container from '../../reusable/Container';
import Heading from '../../reusable/Heading';
import Device from '../../reusable/Device';
import Paragraph from '../../reusable/Paragraph';
import Image from 'next/image';

const App = () => (
  <Container.FlexCols className="items-center justify-center w-full gap-8">
    <Heading.H2 className="py-8">Scopri la nostra App</Heading.H2>
    <Container.FlexCols className="gap-4 w-full">
      <Container.FlexRow className="sm:flex-col-reverse sm:gap-8 justify-between w-full items-center">
        <Container.FlexCols className="justify-center items-center flex-1">
          <Device.IPhone alt="App screenshot" image={Screenshot1} />
        </Container.FlexCols>
        <Container.Container className="flex-1">
          <Heading.H3 className="!text-xl">
            Seleziona l'importo in euro, ricevi in <strong>Bitcoin</strong>
          </Heading.H3>
          <Paragraph.Leading>
            Con Satoshispay puoi selezionare l'importo in euro da ricevere e
            ricevere il pagamento in Bitcoin tramite la tecnologia di Lightning
            Network. Il cambio viene fatto con il tasso di mercato in tempo
            reale.
          </Paragraph.Leading>
        </Container.Container>
      </Container.FlexRow>
      <Container.Flex className="flex-row-reverse sm:flex-col-reverse sm:gap-8 justify-between w-full items-center">
        <Container.FlexCols className="justify-center items-center flex-1">
          <Device.IPhone alt="App screenshot" image={Screenshot2} />
        </Container.FlexCols>
        <Container.Container className="flex-1">
          <Heading.H3 className="!text-xl">
            Mostra il QR e ricevi i <strong>Bitcoin</strong> in pochi secondi
          </Heading.H3>
          <Paragraph.Leading>
            Una volta confermato l'importo, l'app genererà un QR code che il
            cliente potrà scannerizzare con il suo wallet Bitcoin preferito. In
            pochi secondi riceverai i Bitcoin sul tuo wallet. In pochi secondi
            riceverai i Bitcoin sul tuo wallet.
          </Paragraph.Leading>
        </Container.Container>
      </Container.Flex>
      <Container.FlexRow className="sm:flex-col-reverse sm:gap-8 justify-between w-full items-center">
        <Container.FlexCols className="justify-center items-center flex-1">
          <Device.IPhone alt="App screenshot" image={Screenshot3} />
        </Container.FlexCols>
        <Container.Container className="flex-1">
          <Heading.H3 className="!text-xl">
            Preleva i tuoi <strong>Bitcoin</strong> sul tuo cold wallet
          </Heading.H3>
          <Paragraph.Leading>
            Una volta ricevuti i Bitcoin, puoi trasferirli sul tuo cold wallet
            per una maggiore sicurezza. Inoltre puoi decidere di tenere i
            Bitcoin ricevuti e aspettare che il loro valore aumenti.
          </Paragraph.Leading>
        </Container.Container>
      </Container.FlexRow>
    </Container.FlexCols>
    <Container.FlexCols className="items-center justify-center">
      <span className="block text-brandAlt font-bold text-xl">
        Entra a far parte della rivoluzione ORA!
      </span>
      <Container.FlexResponsiveRow className="justify-center items-center gap-8">
        <a className="block hover:underline text-xl" href="" target="_blank">
          <Image
            src={GooglePlayBadge}
            alt="google play badge"
            width={200}
            height={100}
          />
        </a>
        <a className="block hover:underline text-xl" href="" target="_blank">
          <Image
            src={AppStoreBadge}
            alt="appstore badge"
            width={200}
            height={100}
          />
        </a>
      </Container.FlexResponsiveRow>
    </Container.FlexCols>
  </Container.FlexCols>
);

export default App;
