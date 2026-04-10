import { notFound } from "next/navigation";
import { AdminCard } from "@/components/admin/AdminCard";
import { requireRole } from "@/lib/auth";
import { getAdminUserById } from "@/lib/cms";
import {
  deleteUserAction,
  updateUserAction,
} from "@/app/admin/(dashboard)/users/actions";

export const dynamic = "force-dynamic";

export default async function UserDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  await requireRole(["admin"]);
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const user = await getAdminUserById(id);

  if (!user) {
    notFound();
  }

  const updateAction = updateUserAction.bind(null, user.id);
  const deleteAction = deleteUserAction.bind(null, user.id);

  return (
    <div className="space-y-6">
      <AdminCard
        title={`Editar usuario: ${user.name}`}
        description="Actualiza perfil, email, rol y estado operativo del usuario."
      >
        <form action={updateAction} className="space-y-4">
          <input
            name="name"
            defaultValue={user.name}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3"
            required
          />
          <input
            name="email"
            type="email"
            defaultValue={user.email}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3"
            required
          />
          <select
            name="role"
            defaultValue={user.role}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3"
          >
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
          <label className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
            <input type="checkbox" name="is_active" defaultChecked={user.is_active} />
            Usuario activo
          </label>
          {resolvedSearchParams.error ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {resolvedSearchParams.error}
            </p>
          ) : null}
          {resolvedSearchParams.success ? (
            <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Usuario actualizado.
            </p>
          ) : null}
          <button
            type="submit"
            className="rounded-2xl bg-secondary px-6 py-3 font-semibold text-primary"
          >
            Guardar cambios
          </button>
        </form>
      </AdminCard>

      <AdminCard
        title="Eliminar usuario"
        description="La eliminación se realiza directamente en Supabase Auth. Las publicaciones históricas conservarán sus datos editoriales por relación nullable."
      >
        <form action={deleteAction}>
          <button
            type="submit"
            className="rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white"
          >
            Eliminar usuario
          </button>
        </form>
      </AdminCard>
    </div>
  );
}
