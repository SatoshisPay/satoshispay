import * as React from 'react';

const Hr = (props: React.HTMLProps<HTMLDivElement>) => (
  <div
    className={`${props.className} h-px my-4 bg-gray-200 border-bottom border-gray-500 w-full`}
  />
);

export default Hr;
