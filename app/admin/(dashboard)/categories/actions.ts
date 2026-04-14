"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { slugify } from "@/lib/format";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { categorySchema } from "@/lib/validators";

export async function createCategoryAction(formData: FormData) {
  await requireRole(["admin", "editor"]);
  const supabase = await createSupabaseServerClient();
  const parsed = categorySchema.parse({
    name: formData.get("name"),
    slug: slugify(String(formData.get("slug") || formData.get("name") || "")),
    description: formData.get("description"),
  });

  const { error } = await supabase.from("categories").insert(parsed);

  if (error) {
    redirect(`/admin/categories?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories?success=created");
}

export async function updateCategoryAction(id: string, formData: FormData) {
  await requireRole(["admin", "editor"]);
  const supabase = await createSupabaseServerClient();
  const parsed = categorySchema.parse({
    name: formData.get("name"),
    slug: slugify(String(formData.get("slug") || formData.get("name") || "")),
    description: formData.get("description"),
  });

  const { error } = await supabase.from("categories").update(parsed).eq("id", id);

  if (error) {
    redirect(`/admin/categories/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/categories");
  revalidatePath(`/admin/categories/${id}`);
  redirect(`/admin/categories/${id}?success=updated`);
}

export async function deleteCategoryAction(id: string) {
  await requireRole(["admin", "editor"]);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    redirect(`/admin/categories/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories?success=deleted");
}
