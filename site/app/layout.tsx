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
      <body>
        <Topbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
