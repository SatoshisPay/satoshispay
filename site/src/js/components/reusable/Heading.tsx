import * as React from 'react';

const H1 = (props: React.HTMLProps<HTMLHeadingElement>) => (
  <h1
    itemProp={props.itemProp}
    itemScope={props.itemScope}
    itemType={props.itemType}
    className={`${props.className} py-4 text-3xl text-center text-brandAlt tracking-wide font-bold`}
    onClick={props.onClick}
  >
    {props.children}
  </h1>
);

const H1L = (props: React.HTMLProps<HTMLHeadingElement>) => (
  <h1
    itemProp={props.itemProp}
    itemScope={props.itemScope}
    itemType={props.itemType}
    className={`${props.className} py-4 text-3xl text-left text-brandAlt tracking-wide font-bold`}
    onClick={props.onClick}
  >
    {props.children}
  </h1>
);

const H2 = (props: React.HTMLProps<HTMLHeadingElement>) => (
  <h2
    itemProp={props.itemProp}
    itemScope={props.itemScope}
    itemType={props.itemType}
    className={`${props.className} text-2xl mb-0 text-left text-brandAlt font-normal`}
    onClick={props.onClick}
  >
    {props.children}
  </h2>
);

const H3 = (props: React.HTMLProps<HTMLHeadingElement>) => (
  <h3
    itemProp={props.itemProp}
    itemScope={props.itemScope}
    itemType={props.itemType}
    className={`${props.className} text-xl py-2 text-left text-brandAlt font-normal`}
    onClick={props.onClick}
  >
    {props.children}
  </h3>
);

const H4 = (props: React.HTMLProps<HTMLHeadingElement>) => (
  <h4
    itemProp={props.itemProp}
    itemScope={props.itemScope}
    itemType={props.itemType}
    className={`${props.className} text-lg text-left text-brandAlt font-normal`}
    onClick={props.onClick}
  >
    {props.children}
  </h4>
);

const Jumbo = (props: React.HTMLProps<HTMLHeadingElement>) => (
  <h1
    itemProp={props.itemProp}
    itemScope={props.itemScope}
    itemType={props.itemType}
    className={`${props.className} text-3xl text-left font-bold`}
    onClick={props.onClick}
  >
    {props.children}
  </h1>
);

export default {
  H1,
  H1L,
  H2,
  H3,
  H4,
  Jumbo,
};
