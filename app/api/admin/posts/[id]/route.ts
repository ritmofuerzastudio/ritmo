import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { postSchema } from "@/lib/validators";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireRole(["admin", "editor"]);
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const body = await request.json();
  const parsed = postSchema.parse(body);

  const { error } = await supabase
    .from("posts")
    .update({
      title: parsed.title,
      slug: parsed.slug,
      excerpt: parsed.excerpt || null,
      content_json: parsed.content_json,
      content_html: parsed.content_html,
      featured_image_url: parsed.featured_image_url || null,
      status: parsed.status,
      seo_title: parsed.seo_title || null,
      seo_description: parsed.seo_description || null,
      canonical_url: parsed.canonical_url || null,
      robots_index: parsed.robots_index,
      robots_follow: parsed.robots_follow,
      og_title: parsed.og_title || null,
      og_description: parsed.og_description || null,
      og_image_url: parsed.og_image_url || null,
      published_at: parsed.status === "published" ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { error: deleteRelationsError } = await supabase
    .from("post_categories")
    .delete()
    .eq("post_id", id);

  if (deleteRelationsError) {
    return NextResponse.json(
      { error: deleteRelationsError.message },
      { status: 400 }
    );
  }

  if (parsed.category_ids.length) {
    const { error: relationError } = await supabase.from("post_categories").insert(
      parsed.category_ids.map((categoryId) => ({
        post_id: id,
        category_id: categoryId,
      }))
    );

    if (relationError) {
      return NextResponse.json({ error: relationError.message }, { status: 400 });
    }
  }

  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${id}`);

  const { data } = await supabase
    .from("posts")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  return NextResponse.json({ id, slug: data?.slug ?? null });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireRole(["admin", "editor"]);
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  await supabase.from("post_categories").delete().eq("post_id", id);

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
