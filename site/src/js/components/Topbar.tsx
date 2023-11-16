'use client';

import * as React from 'react';

import Desktop from './Topbar/Desktop';
import Mobile from './Topbar/Mobile';
import { Route } from '../utils/routes';

export const MENU_ENTRIES = [
  {
    name: 'Satoshispay',
    route: Route.HOME,
  },
  {
    name: 'Inizia da qui',
    route: Route.GET_STARTED,
  },
  {
    name: 'Guida',
    route: Route.FAQ,
  },
  {
    name: 'Bitcoin Monfalcone',
    url: 'https://bitcoinmonfalcone.it',
  },
];

const Topbar = () => (
  <header>
    <Desktop />
    <Mobile />
  </header>
);

export default Topbar;
