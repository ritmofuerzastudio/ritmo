import { AdminCard } from "@/components/admin/AdminCard";
import { PostEditor } from "@/components/admin/PostEditor";
import { requireRole } from "@/lib/auth";
import { getAdminCategories } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  await requireRole(["admin", "editor"]);
  const categories = await getAdminCategories();

  return (
    <div className="space-y-6">
      <AdminCard
        title="Nueva publicación"
        description="Crea una entrada, añade categorías, controla su estado y completa el SEO."
      >
        <PostEditor mode="create" categories={categories} />
      </AdminCard>
    </div>
  );
}
