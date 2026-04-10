import Link from "next/link";
import { forgotPasswordAction } from "@/app/admin/forgot-password/actions";

export const dynamic = "force-dynamic";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-lg">
        <p className="text-sm uppercase tracking-[0.25em] text-secondary">
          Recuperación
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-900">
          Restablecer contraseña
        </h1>
        <p className="mt-3 text-stone-600">
          Enviaremos un enlace para actualizar tu contraseña de acceso.
        </p>
        <form action={forgotPasswordAction} className="mt-8 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-stone-700">Email</span>
            <input
              name="email"
              type="email"
              className="w-full rounded-2xl border border-stone-200 px-4 py-3"
              required
            />
          </label>
          {resolvedSearchParams.error ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {resolvedSearchParams.error}
            </p>
          ) : null}
          {resolvedSearchParams.sent ? (
            <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Revisa tu email para continuar con la recuperación.
            </p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-2xl bg-secondary px-4 py-3 font-semibold text-primary transition hover:bg-secondary/90"
          >
            Enviar enlace
          </button>
        </form>
        <Link
          href="/admin/login"
          className="mt-6 inline-block text-sm font-medium text-secondary underline"
        >
          Volver al login
        </Link>
      </div>
    </main>
  );
}
