export const dynamic = "force-dynamic";
import "./globals.css";
import { ProtectedShell } from "@/components/ui/ProtectedShell";

const NAV = [{ href: "/", label: "Inicio" }, { href: "/categor-a", label: "Categorías" }, { href: "/categoria", label: "Categorías" }, { href: "/nota", label: "Nota" }, { href: "/usuario", label: "Usuarios" }, { href: "/usuarios", label: "Usuarios" }];

export const metadata = { title: "Nota 1", description: "Generado con ScrumDev AI" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ProtectedShell items={NAV} title="Nota 1">{children}</ProtectedShell>
      </body>
    </html>
  );
}
