"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { LayoutDashboard, Tags, FileText, Users, LogOut } from "lucide-react";
import type { AdminProfile } from "@/lib/types";

type AdminShellProps = {
  profile: AdminProfile;
  children: React.ReactNode;
};

const baseNavItems = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboard },
  { href: "/admin/categories", label: "Categorías", icon: Tags },
  { href: "/admin/posts", label: "Publicaciones", icon: FileText },
];

export function AdminShell({ profile, children }: AdminShellProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const navItems =
    profile.role === "admin"
      ? [...baseNavItems, { href: "/admin/users", label: "Usuarios", icon: Users }]
      : baseNavItems;

  function handleSignOut() {
    setError("");

    startTransition(async () => {
      const response = await fetch("/auth/sign-out", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        setError("No se pudo cerrar la sesión. Intenta de nuevo.");
        return;
      }

      router.replace("/admin/login");
      router.refresh();
    });
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[2rem] bg-secondary p-6 text-primary shadow-lg">
          <Link href="/admin" className="block text-2xl font-semibold">
            Ritmo y Fuerza CMS
          </Link>
          <div className="mt-6 rounded-3xl bg-white/10 p-4">
            <p className="text-sm uppercase tracking-[0.25em] text-primary/70">
              Sesión activa
            </p>
            <p className="mt-2 text-lg font-semibold">{profile.name}</p>
            <p className="text-sm text-primary/80">{profile.email}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.25em]">
              {profile.role}
            </p>
          </div>
          <nav className="mt-8 space-y-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium transition hover:bg-white/10"
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isPending}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-semibold text-secondary transition hover:bg-primary/80 disabled:opacity-60"
          >
            <LogOut size={18} />
            {isPending ? "Cerrando..." : "Cerrar sesión"}
          </button>
          {error ? <p className="mt-3 text-sm text-red-100">{error}</p> : null}
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
