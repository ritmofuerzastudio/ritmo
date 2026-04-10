import Link from "next/link";
import { redirect } from "next/navigation";
import { signInAction } from "@/app/admin/login/actions";
import { getCurrentProfile } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const profile = await getCurrentProfile();

  if (profile?.is_active && ["admin", "editor"].includes(profile.role)) {
    redirect("/admin");
  }

  const resolvedSearchParams = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-lg">
        <p className="text-sm uppercase tracking-[0.25em] text-secondary">
          Administración
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-900">
          Acceso al panel
        </h1>
        <p className="mt-3 text-stone-600">
          Inicia sesión con un usuario autorizado para administrar el blog.
        </p>
        <form action={signInAction} className="mt-8 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-stone-700">Email</span>
            <input
              name="email"
              type="email"
              className="w-full rounded-2xl border border-stone-200 px-4 py-3"
              required
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-stone-700">Contraseña</span>
            <input
              name="password"
              type="password"
              className="w-full rounded-2xl border border-stone-200 px-4 py-3"
              required
            />
          </label>
          {resolvedSearchParams.error ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {resolvedSearchParams.error}
            </p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-2xl bg-secondary px-4 py-3 font-semibold text-primary transition hover:bg-secondary/90"
          >
            Entrar al panel
          </button>
        </form>
        <Link
          href="/admin/forgot-password"
          className="mt-6 inline-block text-sm font-medium text-secondary underline"
        >
          Olvidé mi contraseña
        </Link>
      </div>
    </main>
  );
}
