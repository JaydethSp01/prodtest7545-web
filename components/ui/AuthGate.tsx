"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { currentUser, seedAuth } from "@/lib/auth";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const isPublic = pathname === "/login";

  useEffect(() => {
    seedAuth();
    const u = currentUser();
    if (!u && !isPublic) {
      router.replace("/login");
      return;
    }
    if (u && isPublic) {
      router.replace("/");
      return;
    }
    setReady(true);
  }, [pathname, isPublic, router]);

  if (isPublic) return <>{children}</>;

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" aria-label="Loading" />
      </div>
    );
  }

  return <>{children}</>;
}

export default AuthGate;