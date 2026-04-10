import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { requireRole } from "@/lib/auth";
import { getAdminPosts } from "@/lib/cms";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  await requireRole(["admin", "editor"]);
  const posts = await getAdminPosts();

  return (
    <div className="space-y-6">
      <AdminCard
        title="Publicaciones"
        description="Gestiona borradores, publicaciones activas y el SEO editorial de cada entrada."
        action={
          <Link
            href="/admin/posts/new"
            className="rounded-2xl bg-secondary px-5 py-3 font-semibold text-primary"
          >
            Nueva publicación
          </Link>
        }
      >
        <div className="overflow-hidden rounded-[1.5rem] border border-stone-200">
          <table className="min-w-full divide-y divide-stone-200 text-left">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold">Título</th>
                <th className="px-4 py-3 text-sm font-semibold">Slug</th>
                <th className="px-4 py-3 text-sm font-semibold">Estado</th>
                <th className="px-4 py-3 text-sm font-semibold">Actualización</th>
                <th className="px-4 py-3 text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-4 py-3">{post.title}</td>
                  <td className="px-4 py-3 text-stone-600">{post.slug}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        post.status === "published"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {post.status === "published" ? "Publicada" : "Borrador"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-600">
                    {formatDate(post.updated_at)}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/posts/edit/${post.slug}`}
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
