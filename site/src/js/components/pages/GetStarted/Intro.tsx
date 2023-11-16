import * as React from 'react';

import Container from '../../reusable/Container';
import Heading from '../../reusable/Heading';
import Paragraph from '../../reusable/Paragraph';

const Intro = () => (
  <Container.FlexCols className="gap-8">
    <Container.FlexCols>
      <Heading.H1>
        Accettare pagamenti in <strong>Bitcoin</strong> non è mai stato così
        semplice
      </Heading.H1>
      <Paragraph.Center className="text-lg">
        Satoshispay è l&apos;app pensata per i commercianti Italiani che
        vogliono accettare pagamenti in Bitcoin nella propria attività.
      </Paragraph.Center>
      <Paragraph.Center>
        Quello che potrebbe sembrare un passo difficile da compiere, con
        SatoshisPay diventa un&apos;operazione semplice e veloce.
      </Paragraph.Center>
    </Container.FlexCols>
  </Container.FlexCols>
);

export default Intro;
