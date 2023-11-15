import * as React from 'react';
import Container from '../../reusable/Container';
import Heading from '../../reusable/Heading';
import Paragraph from '../../reusable/Paragraph';
import Link from '../../reusable/Link';

const ChiSiamo = () => (
  <Container.FlexCols className="items-center justify-center">
    <Heading.H2>Chi Siamo</Heading.H2>
    <Paragraph.Leading>
      Satoshispay è un&apos;applicazione gratuita e open-source sviluppata da{' '}
      <strong>Bitcoin</strong> Monfalcone, un&apos;organizzazione no-profit che
      promuove l&apos;adozione di <strong>Bitcoin</strong> nella nostra comunità
      locale. L&apos;applicazione è stata sviluppata con l&apos;obiettivo di
      fornire un&apos;alternativa semplice e sicura per accettare pagamenti in
      <strong>Bitcoin</strong> nella nostra attività.
    </Paragraph.Leading>
    <Heading.H3>La nostra mission</Heading.H3>
    <Paragraph.Leading>
      La nostra missione è promuovere l&apos;adozione diffusa di{' '}
      <strong>Bitcoin</strong> nella nostra comunità locale. Vogliamo facilitare
      l&apos;accesso e l&apos;utilizzo di <strong>Bitcoin</strong> per utenti e
      commercianti, rendendo le transazioni semplici, intuitive ed immediate
      attraverso l&apos;uso del wallet <strong>Bitcoin</strong>. In questo modo,
      aspiriamo a creare un ecosistema finanziario più inclusivo e
      decentralizzato, consentendo a tutti di sperimentare i vantaggi della
      criptovaluta e contribuendo così a plasmare il futuro delle transazioni
      digitali nella nostra comunità.
    </Paragraph.Leading>
    <Link.Button
      className="py-2.5 px-4 mx-2 !text-white !font-bold text-lg"
      href="https://bitcoinmonfalcone.it/"
      target="_blank"
    >
      Scopri di più
    </Link.Button>
  </Container.FlexCols>
);

export default ChiSiamo;
