import { notFound } from "next/navigation";
import { AdminCard } from "@/components/admin/AdminCard";
import { DeletePostButton } from "@/components/admin/DeletePostButton";
import { PostEditor } from "@/components/admin/PostEditor";
import { requireRole } from "@/lib/auth";
import { getAdminCategories, getAdminPostBySlug } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireRole(["admin", "editor"]);
  const { slug } = await params;
  const [post, categories] = await Promise.all([
    getAdminPostBySlug(slug),
    getAdminCategories(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminCard
        title={`Editar publicación: ${post.title}`}
        description="Actualiza contenido, taxonomía y metadatos de la entrada."
      >
        <PostEditor
          mode="edit"
          postId={post.id}
          initialSlug={post.slug}
          categories={categories}
          initialValues={{
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt ?? "",
            featuredImageUrl: post.featured_image_url ?? "",
            status: post.status,
            seoTitle: post.seo_title ?? "",
            seoDescription: post.seo_description ?? "",
            canonicalUrl: post.canonical_url ?? "",
            robotsIndex: post.robots_index,
            robotsFollow: post.robots_follow,
            ogTitle: post.og_title ?? "",
            ogDescription: post.og_description ?? "",
            ogImageUrl: post.og_image_url ?? "",
            contentJson: (post.content_json as Record<string, unknown>) ?? {},
            contentHtml: post.content_html ?? "",
            categoryIds:
              post.post_categories?.map(
                (item: { category_id: string }) => item.category_id
              ) ?? [],
          }}
        />
      </AdminCard>
      <AdminCard
        title="Eliminar publicación"
        description="Se borrará la publicación junto con sus categorías asociadas."
      >
        <DeletePostButton postId={post.id} />
      </AdminCard>
    </div>
  );
}
