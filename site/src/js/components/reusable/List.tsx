import * as React from 'react';

import Container from './Container';
import Paragraph from './Paragraph';

const Unordered = (props: React.HTMLProps<HTMLUListElement>) => (
  <ul className={`px-8 list-disc sm:px-0 ${props.className}`}>
    {props.children}
  </ul>
);

const UnorderedStyledNone = (props: React.HTMLProps<HTMLUListElement>) => (
  <ul className={`px-0 list-none ${props.className}`}>{props.children}</ul>
);

const Item = (props: React.HTMLProps<HTMLDivElement>) => (
  <li className="text-lg py-2 text-text">{props.children}</li>
);

interface ItemIconProps extends React.HTMLProps<HTMLDivElement> {
  icon: JSX.Element;
}

const ItemIcon = (props: ItemIconProps) => (
  <li className="text-lg py-2">
    <Container.FlexRow className="items-center gap-4">
      {props.icon}
      <Paragraph.Default>{props.children}</Paragraph.Default>
    </Container.FlexRow>
  </li>
);

export default {
  Item,
  ItemIcon,
  Unordered,
  UnorderedStyledNone,
};
