"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "Esta acción eliminará la publicación y sus relaciones. ¿Deseas continuar?"
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const payload = await response.json();
        setError(payload.error ?? "No se pudo eliminar la publicación.");
        return;
      }

      router.push("/admin/posts");
      router.refresh();
    });
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white disabled:opacity-60"
      >
        {isPending ? "Eliminando..." : "Eliminar publicación"}
      </button>
      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
