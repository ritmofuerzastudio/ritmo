import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { requireRole } from "@/lib/auth";
import { getAdminUsers } from "@/lib/cms";
import { createUserAction } from "@/app/admin/(dashboard)/users/actions";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  await requireRole(["admin"]);
  const users = await getAdminUsers();
  const resolvedSearchParams = await searchParams;

  return (
    <div className="space-y-6">
      <AdminCard
        title="Usuarios"
        description="Crea y administra usuarios internos del panel con roles admin y editor."
      >
        <form
          action={createUserAction}
          className="grid gap-4 lg:grid-cols-[1fr_1fr_180px_1fr_1fr_auto]"
        >
          <input
            name="name"
            placeholder="Nombre"
            className="rounded-2xl border border-stone-200 px-4 py-3"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="rounded-2xl border border-stone-200 px-4 py-3"
            required
          />
          <select
            name="role"
            className="rounded-2xl border border-stone-200 px-4 py-3"
            defaultValue="editor"
          >
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            className="rounded-2xl border border-stone-200 px-4 py-3"
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            className="rounded-2xl border border-stone-200 px-4 py-3"
            required
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

      <AdminCard title="Equipo del panel">
        <div className="overflow-hidden rounded-[1.5rem] border border-stone-200">
          <table className="min-w-full divide-y divide-stone-200 text-left">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold">Nombre</th>
                <th className="px-4 py-3 text-sm font-semibold">Email</th>
                <th className="px-4 py-3 text-sm font-semibold">Rol</th>
                <th className="px-4 py-3 text-sm font-semibold">Estado</th>
                <th className="px-4 py-3 text-sm font-semibold">Alta</th>
                <th className="px-4 py-3 text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3 text-stone-600">{user.email}</td>
                  <td className="px-4 py-3 uppercase text-stone-600">{user.role}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.is_active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.is_active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-600">
                    {formatDate(user.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/users/${user.id}`}
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
