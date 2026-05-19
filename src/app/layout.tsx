import "./globals.css";

export const metadata = {
  title: "Innovafy",
  description: "Innovafy creative agency landing page",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-neutral-900">{children}</body>
    </html>
  );
}
