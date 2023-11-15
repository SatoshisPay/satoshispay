import * as React from 'react';

const Default = (props: React.HTMLProps<HTMLParagraphElement>) => (
  <p
    itemProp={props.itemProp}
    itemScope={props.itemScope}
    itemType={props.itemType}
    className={`${props.className} w-full text-justify text-text`}
  >
    {props.children}
  </p>
);

const Leading = (props: React.HTMLProps<HTMLParagraphElement>) => (
  <p
    itemProp={props.itemProp}
    itemScope={props.itemScope}
    itemType={props.itemType}
    className={`${props.className} w-full mb-3 text-lg text-justify text-text`}
  >
    {props.children}
  </p>
);

const Center = (props: React.HTMLProps<HTMLParagraphElement>) => (
  <p
    itemProp={props.itemProp}
    itemScope={props.itemScope}
    itemType={props.itemType}
    className={`${props.className} w-full mb-3 text-center text-text`}
  >
    {props.children}
  </p>
);

export default {
  Center,
  Default,
  Leading,
};
