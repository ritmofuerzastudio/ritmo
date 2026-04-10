import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { postSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const { user } = await requireRole(["admin", "editor"]);
  const supabase = await createSupabaseServerClient();
  const body = await request.json();
  const parsed = postSchema.parse(body);

  const payload = {
    ...parsed,
    published_at: parsed.status === "published" ? new Date().toISOString() : null,
    author_id: user.id,
  };

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: payload.title,
      slug: payload.slug,
      excerpt: payload.excerpt || null,
      content_json: payload.content_json,
      content_html: payload.content_html,
      featured_image_url: payload.featured_image_url || null,
      status: payload.status,
      seo_title: payload.seo_title || null,
      seo_description: payload.seo_description || null,
      canonical_url: payload.canonical_url || null,
      robots_index: payload.robots_index,
      robots_follow: payload.robots_follow,
      og_title: payload.og_title || null,
      og_description: payload.og_description || null,
      og_image_url: payload.og_image_url || null,
      published_at: payload.published_at,
      author_id: payload.author_id,
    })
    .select("id, slug")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "No se pudo crear la publicación." },
      { status: 400 }
    );
  }

  if (parsed.category_ids.length) {
    const { error: relationError } = await supabase.from("post_categories").insert(
      parsed.category_ids.map((categoryId) => ({
        post_id: data.id,
        category_id: categoryId,
      }))
    );

    if (relationError) {
      return NextResponse.json({ error: relationError.message }, { status: 400 });
    }
  }

  return NextResponse.json({ id: data.id, slug: data.slug });
}
