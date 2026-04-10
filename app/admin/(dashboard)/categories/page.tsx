import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { requireRole } from "@/lib/auth";
import { getAdminCategories } from "@/lib/cms";
import { createCategoryAction } from "@/app/admin/(dashboard)/categories/actions";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  await requireRole(["admin", "editor"]);
  const categories = await getAdminCategories();
  const resolvedSearchParams = await searchParams;

  return (
    <div className="space-y-6">
      <AdminCard
        title="Categorías"
        description="Mantén el archivo del blog organizado con categorías reutilizables."
      >
        <form action={createCategoryAction} className="grid gap-4 lg:grid-cols-[1fr_1fr_1.2fr_auto]">
          <input
            name="name"
            placeholder="Nombre"
            className="rounded-2xl border border-stone-200 px-4 py-3"
            required
          />
          <input
            name="slug"
            placeholder="slug-opcional"
            className="rounded-2xl border border-stone-200 px-4 py-3"
          />
          <input
            name="description"
            placeholder="Descripción breve"
            className="rounded-2xl border border-stone-200 px-4 py-3"
          />
          <button
            type="submit"
            className="rounded-2xl bg-secondary px-6 py-3 font-semibold text-primary"
          >
            Crear
          </button>
        </form>
        {resolvedSearchParams.error ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {resolvedSearchParams.error}
          </p>
        ) : null}
        {resolvedSearchParams.success ? (
          <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Operación completada.
          </p>
        ) : null}
      </AdminCard>

      <AdminCard title="Listado actual">
        <div className="overflow-hidden rounded-[1.5rem] border border-stone-200">
          <table className="min-w-full divide-y divide-stone-200 text-left">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold">Nombre</th>
                <th className="px-4 py-3 text-sm font-semibold">Slug</th>
                <th className="px-4 py-3 text-sm font-semibold">Actualizada</th>
                <th className="px-4 py-3 text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-3">{category.name}</td>
                  <td className="px-4 py-3 text-stone-600">{category.slug}</td>
                  <td className="px-4 py-3 text-stone-600">
                    {formatDate(category.updated_at)}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/categories/${category.id}`}
                      className="font-semibold text-secondary underline"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
