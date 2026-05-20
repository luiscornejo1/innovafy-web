import "./globals.css";

export const metadata = {
  title: "Innovafy",
  description: "Innovafy creative agency landing page",
};

import GlobalBackground from "../components/GlobalBackground";
import Header from "../components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-transparent text-neutral-900">
        <GlobalBackground />
        <Header />
        {children}
      </body>
    </html>
  );
}
