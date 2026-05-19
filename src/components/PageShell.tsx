import Link from "next/link";

type PageShellProps = {
  title: string;
  description?: string;
};

export default function PageShell({ title, description }: PageShellProps) {
  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 lg:px-12 py-24">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          ← Volver al inicio
        </Link>
        <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
        <p className="mt-4 text-lg text-neutral-600">
          {description ?? "Pagina en construccion. Aqui vivira el contenido principal de esta seccion."}
        </p>
      </div>
    </main>
  );
}
