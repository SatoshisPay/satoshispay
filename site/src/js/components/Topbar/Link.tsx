import * as React from 'react';

import Link from '../reusable/Link';

interface RouterLinkProps {
  to: string;
  children: React.ReactNode;
}

const RouterLink = (props: RouterLinkProps) => (
  <Link.Next
    className="text-xl py-8 !font-bold hover:text-white block no-underline hover:underline"
    href={props.to}
  >
    {props.children}
  </Link.Next>
);

interface NavLinkProps {
  onClick?: () => void;
  href?: string;
  target?: string;
  children: React.ReactNode;
}

const NavLink = (props: NavLinkProps) => (
  <Link.Default
    className="text-xl hover:cursor-pointer !font-bold py-8 hover:text-white block no-underline hover:underline"
    onClick={props.onClick}
    href={props.href}
    target={props.target}
  >
    {props.children}
  </Link.Default>
);

export default {
  NavLink,
  RouterLink,
};
