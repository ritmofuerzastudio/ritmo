"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function validatePassword() {
    if (password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      return "La contraseña debe incluir mayúscula, minúscula y número.";
    }

    if (password !== confirmPassword) {
      return "Las contraseñas no coinciden.";
    }

    return "";
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validatePassword();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    startTransition(async () => {
      const supabase = createSupabaseBrowserClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      router.push("/admin");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <label className="block space-y-2">
        <span className="text-sm font-medium text-stone-700">Nueva contraseña</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-2xl border border-stone-200 px-4 py-3"
          required
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-stone-700">
          Confirmar contraseña
        </span>
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="w-full rounded-2xl border border-stone-200 px-4 py-3"
          required
        />
      </label>
      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-secondary px-4 py-3 font-semibold text-primary transition hover:bg-secondary/90 disabled:opacity-60"
      >
        {isPending ? "Guardando..." : "Actualizar contraseña"}
      </button>
    </form>
  );
}
