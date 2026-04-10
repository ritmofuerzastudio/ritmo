import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { StatCard } from "@/components/admin/StatCard";
import { requireRole } from "@/lib/auth";
import { getAdminCategories, getAdminPosts, getAdminUsers } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { profile } = await requireRole(["admin", "editor"]);
  const [categories, posts, users] = await Promise.all([
    getAdminCategories(),
    getAdminPosts(),
    profile.role === "admin" ? getAdminUsers() : Promise.resolve([]),
  ]);

  const publishedPosts = posts.filter((post) => post.status === "published");

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-secondary">
          Panel
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-stone-900">
          Operación editorial
        </h1>
        <p className="mt-3 max-w-3xl text-stone-600">
          Desde aquí administras usuarios, taxonomías, publicaciones e imágenes
          del blog de Ritmo y Fuerza Studio.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Publicaciones"
          value={posts.length}
          hint={`${publishedPosts.length} publicadas y ${posts.length - publishedPosts.length} en borrador.`}
        />
        <StatCard
          label="Categorías"
          value={categories.length}
          hint="Se usan para construir el archivo y filtros del blog."
        />
        <StatCard
          label="Usuarios"
          value={profile.role === "admin" ? users.length : "Restringido"}
          hint={
            profile.role === "admin"
              ? "Alta, edición y baja desde el panel."
              : "La gestión de usuarios está reservada a administradores."
          }
        />
      </div>

      <AdminCard
        title="Accesos rápidos"
        description="Rutas principales para operar el CMS sin salir del panel."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/admin/posts/new"
            className="rounded-[1.5rem] bg-secondary px-5 py-4 font-semibold text-primary transition hover:bg-secondary/90"
          >
            Crear nueva publicación
          </Link>
          <Link
            href="/admin/categories"
            className="rounded-[1.5rem] border border-stone-200 px-5 py-4 font-semibold text-stone-800 transition hover:bg-stone-50"
          >
            Administrar categorías
          </Link>
          {profile.role === "admin" ? (
            <Link
              href="/admin/users"
              className="rounded-[1.5rem] border border-stone-200 px-5 py-4 font-semibold text-stone-800 transition hover:bg-stone-50"
            >
              Administrar usuarios
            </Link>
          ) : null}
        </div>
      </AdminCard>
    </div>
  );
}
