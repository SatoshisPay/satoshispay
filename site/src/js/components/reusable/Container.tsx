import * as React from 'react';

const Container = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div id={props.id} {...props}>
      {props.children}
    </div>
  );
};

const Full = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      id={props.id}
      ref={props.ref}
      itemProp={props.itemProp}
      itemScope={props.itemScope}
      itemType={props.itemType}
      className={`${props.className} w-full`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

const Flex = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      id={props.id}
      ref={props.ref}
      itemProp={props.itemProp}
      itemScope={props.itemScope}
      itemType={props.itemType}
      className={`${props.className} flex`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

const FlexCols = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      id={props.id}
      ref={props.ref}
      itemProp={props.itemProp}
      itemScope={props.itemScope}
      itemType={props.itemType}
      className={`${props.className} flex flex-col`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

const FlexRow = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      id={props.id}
      ref={props.ref}
      itemProp={props.itemProp}
      itemScope={props.itemScope}
      itemType={props.itemType}
      className={`${props.className} flex flex-row`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

const FlexResponsiveRow = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <FlexRow
      id={props.id}
      ref={props.ref}
      itemProp={props.itemProp}
      itemScope={props.itemScope}
      itemType={props.itemType}
      className={`${props.className} sm:flex-col`}
      onClick={props.onClick}
    >
      {props.children}
    </FlexRow>
  );
};

const Card = (props: React.HTMLProps<HTMLDivElement>) => (
  <div
    ref={props.ref}
    itemProp={props.itemProp}
    itemScope={props.itemScope}
    itemType={props.itemType}
    className={`${props.className} p-6 border border-gray-200 rounded-lg shadow`}
    onClick={props.onClick}
  >
    {props.children}
  </div>
);

export default {
  Card,
  Container,
  Flex,
  FlexCols,
  FlexRow,
  Full,
  FlexResponsiveRow,
};
