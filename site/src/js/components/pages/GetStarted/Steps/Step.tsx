import * as React from 'react';
import Container from '../../../reusable/Container';
import Jumbotron from '../../../reusable/Jumbotron';
import Heading from '../../../reusable/Heading';

interface Props {
  number: number;
  title: string;
  children: React.ReactNode;
}

const Step = ({ number, title, children }: Props) => (
  <Jumbotron className="!w-full">
    <Container.FlexCols>
      <Heading.H3>
        <span className="text-8xl text-brand mr-2">{number}.</span>
        <span className="text-2xl">{title}</span>
      </Heading.H3>
      {children}
    </Container.FlexCols>
  </Jumbotron>
);

export default Step;
