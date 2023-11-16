import * as React from 'react';

const Jumbotron = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <section
      className={`${props.className} bg-white border sm:border-none border-gray-200 rounded-lg shadow-lg sm:shadow-none w-auto mx-auto`}
    >
      <div className="px-16 sm:px-4 py-4 lg:py-8">{props.children}</div>
    </section>
  );
};

export default Jumbotron;
