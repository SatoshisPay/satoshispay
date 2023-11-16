import NextLink from 'next/link';
import * as React from 'react';

const Default = (props: React.HTMLProps<HTMLAnchorElement>) => (
  <a
    href={props.href}
    className={`${props.className} text-inherit cursor-pointer hover:underline`}
    itemScope={props.itemScope}
    itemType={props.itemType}
    itemProp={props.itemProp}
    target={props.target}
    onClick={props.onClick}
  >
    {props.children}
  </a>
);

const Next = (props: React.HTMLProps<HTMLAnchorElement>) => (
  <NextLink
    href={props.href ?? ''}
    className={`${props.className} w-fit font-medium text-inherit cursor-pointer hover:underline`}
    itemScope={props.itemScope}
    itemType={props.itemType}
    itemProp={props.itemProp}
    target={props.target}
    onClick={props.onClick}
  >
    {props.children}
  </NextLink>
);

const Button = (props: React.HTMLProps<HTMLAnchorElement>) => (
  <a
    href={props.href}
    className={`${props.className} py-2.5 px-4 mx-4 font-bold text-brandLight bg-brand hover:bg-brandAlt focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-xl`}
    itemScope={props.itemScope}
    itemType={props.itemType}
    itemProp={props.itemProp}
    target={props.target}
    onClick={props.onClick}
  >
    {props.children}
  </a>
);

const ButtonAlt = (props: React.HTMLProps<HTMLAnchorElement>) => (
  <a
    href={props.href}
    className={`${props.className} border border-gray-200 hover:bg-gray-100 font-medium text-brand bg-brandLight focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-xl`}
    itemScope={props.itemScope}
    itemType={props.itemType}
    itemProp={props.itemProp}
    target={props.target}
    onClick={props.onClick}
  >
    {props.children}
  </a>
);

const Paragraph = (props: React.HTMLProps<HTMLAnchorElement>) => (
  <a
    href={props.href}
    className={`${props.className} !text-brand font-medium text-inherit cursor-pointer underline hover:no-underline`}
    itemScope={props.itemScope}
    itemType={props.itemType}
    itemProp={props.itemProp}
    target={props.target}
    onClick={props.onClick}
  >
    {props.children}
  </a>
);

const IconLink = (props: React.HTMLProps<HTMLAnchorElement>) => (
  <a
    href={props.href}
    className={`${props.className} inline-flex items-center font-medium text-inherit hover:underline`}
    itemScope={props.itemScope}
    itemType={props.itemType}
    itemProp={props.itemProp}
    target={props.target}
    onClick={props.onClick}
  >
    {props.children}
  </a>
);

export default {
  Button,
  ButtonAlt,
  Default,
  IconLink,
  Next,
  Paragraph,
};
