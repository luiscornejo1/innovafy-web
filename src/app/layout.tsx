import "./globals.css";

export const metadata = {
  title: "Innovafy",
  description: "Innovafy creative agency landing page",
};

import GlobalBackground from "../components/GlobalBackground";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-transparent text-neutral-900">
        <GlobalBackground />
        {children}
      </body>
    </html>
  );
}
