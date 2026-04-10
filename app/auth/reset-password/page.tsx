import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-lg">
        <p className="text-sm uppercase tracking-[0.25em] text-secondary">
          Seguridad
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-900">
          Actualizar contraseña
        </h1>
        <p className="mt-3 text-stone-600">
          Define una nueva contraseña para continuar usando el panel.
        </p>
        <ResetPasswordForm />
      </div>
    </main>
  );
}
