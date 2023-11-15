import './globals.css';

import Footer from '@/src/js/components/Footer';
import Topbar from '@/src/js/components/Topbar';
import Head from 'next/head';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={'it'}>
      <Script
        async
        src="https://analytics.veeso.dev/script.js"
        data-website-id="b4343ca0-5b4d-425b-984a-3aad3b411a02"
      />
      <body>
        <Topbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
