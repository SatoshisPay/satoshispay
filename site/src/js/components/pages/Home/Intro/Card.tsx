import * as React from 'react';
import Container from '../../../reusable/Container';
import Heading from '../../../reusable/Heading';

interface Props {
  title: string;
  children: React.ReactNode;
}

const Card = ({ title, children }: Props) => (
  <Container.Card className="bg-white sm:bg-transparent">
    <Container.FlexCols className="items-center justify-center">
      <Container.Container>
        <Heading.H2 className="!text-xl text-brandAlt text-center">
          {title}
        </Heading.H2>
      </Container.Container>
      <Container.Container>{children}</Container.Container>
    </Container.FlexCols>
  </Container.Card>
);

export default Card;
