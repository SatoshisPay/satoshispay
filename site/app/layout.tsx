import './globals.css';

import Footer from '@/src/js/components/Footer';
import Topbar from '@/src/js/components/Topbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={'it'}>
      <head>
        <script
          async
          src="https://analytics.veeso.dev/script.js"
          data-website-id="b4343ca0-5b4d-425b-984a-3aad3b411a02"
        ></script>
      </head>
      <body>
        <Topbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
