import { Playfair_Display, DM_Sans, Inter } from 'next/font/google';
// @ts-ignore: Allow side-effect import of global CSS without type declarations
import "./globals.css";

export const metadata = {
  title: "Innovafy",
  description: "Innovafy creative agency landing page",
};

import GlobalBackground from "../components/GlobalBackground";
import Header from "../components/Header";

// Configuramos Playfair Display
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

// Configuramos DM Sans
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '700', '900'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable} ${inter.variable}`}>
      {/* Mantener clases base y componentes intactos */}
      <body className="bg-transparent text-neutral-900">
        <GlobalBackground />
        <Header />
        {children}
      </body>
    </html>
  );
}
