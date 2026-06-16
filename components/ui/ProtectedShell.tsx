"use client";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/components/ui/Sidebar";
import { AppShell } from "@/components/ui/AppShell";
import { AuthGate } from "@/components/ui/AuthGate";

/** Shell protegido: la ruta /login se renderiza a pantalla completa (sin
 *  sidebar); el resto va dentro del AppShell, todo detrás del AuthGate. */
export function ProtectedShell({
  items,
  title = "Panel",
  children,
}: {
  items: NavItem[];
  title?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === "/login") return <AuthGate>{children}</AuthGate>;
  return (
    <AuthGate>
      <AppShell items={items} title={title}>
        <div className="flex flex-col p-4 md:p-6 lg:p-8 bg-white rounded-xl shadow-lg">
          {children}
        </div>
      </AppShell>
    </AuthGate>
  );
}

export default ProtectedShell;