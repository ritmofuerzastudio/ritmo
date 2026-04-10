import { notFound } from "next/navigation";
import { AdminCard } from "@/components/admin/AdminCard";
import { requireRole } from "@/lib/auth";
import { getAdminCategories } from "@/lib/cms";
import {
  deleteCategoryAction,
  updateCategoryAction,
} from "@/app/admin/(dashboard)/categories/actions";

export const dynamic = "force-dynamic";

export default async function CategoryDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  await requireRole(["admin", "editor"]);
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const categories = await getAdminCategories();
  const category = categories.find((item) => item.id === id);

  if (!category) {
    notFound();
  }

  const updateAction = updateCategoryAction.bind(null, category.id);
  const deleteAction = deleteCategoryAction.bind(null, category.id);

  return (
    <div className="space-y-6">
      <AdminCard
        title={`Editar categoría: ${category.name}`}
        description="Actualiza la taxonomía usada en el archivo del blog."
      >
        <form action={updateAction} className="space-y-4">
          <input
            name="name"
            defaultValue={category.name}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3"
            required
          />
          <input
            name="slug"
            defaultValue={category.slug}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3"
            required
          />
          <textarea
            name="description"
            defaultValue={category.description ?? ""}
            rows={4}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3"
          />
          {resolvedSearchParams.error ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {resolvedSearchParams.error}
            </p>
          ) : null}
          {resolvedSearchParams.success ? (
            <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Categoría actualizada.
            </p>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-2xl bg-secondary px-6 py-3 font-semibold text-primary"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </AdminCard>

      <AdminCard
        title="Eliminar categoría"
        description="Si la categoría está asociada a publicaciones, la base de datos impedirá eliminarla hasta liberar las relaciones."
      >
        <form action={deleteAction}>
          <button
            type="submit"
            className="rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white"
          >
            Eliminar categoría
          </button>
        </form>
      </AdminCard>
    </div>
  );
}
