import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminProfile, Category, PostRecord } from "@/lib/types";

export const getAllCategories = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, created_at, updated_at")
    .order("name");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Category[];
});

export const getPublishedPosts = cache(
  async (search?: string, categorySlug?: string) => {
    const supabase = await createSupabaseServerClient();
    let query = supabase
      .from("published_posts_view")
      .select("*")
      .order("published_at", { ascending: false });

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    if (categorySlug) {
      query = query.contains("category_slugs", [categorySlug]);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }
);

export const getPublishedPostBySlug = cache(async (slug: string) => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("published_posts_view")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
});

export const getAdminCategories = cache(async () => {
  return getAllCategories();
});

export const getAdminPosts = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
        id,
        title,
        slug,
        excerpt,
        content_json,
        content_html,
        featured_image_url,
        status,
        seo_title,
        seo_description,
        canonical_url,
        robots_index,
        robots_follow,
        og_title,
        og_description,
        og_image_url,
        published_at,
        created_at,
        updated_at,
        author_id
      `
    )
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as PostRecord[];
});

export const getAdminPostById = cache(async (id: string) => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
        id,
        title,
        slug,
        excerpt,
        content_json,
        content_html,
        featured_image_url,
        status,
        seo_title,
        seo_description,
        canonical_url,
        robots_index,
        robots_follow,
        og_title,
        og_description,
        og_image_url,
        published_at,
        created_at,
        updated_at,
        author_id,
        post_categories(category_id)
      `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
});

export const getAdminPostBySlug = cache(async (slug: string) => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
        id,
        title,
        slug,
        excerpt,
        content_json,
        content_html,
        featured_image_url,
        status,
        seo_title,
        seo_description,
        canonical_url,
        robots_index,
        robots_follow,
        og_title,
        og_description,
        og_image_url,
        published_at,
        created_at,
        updated_at,
        author_id,
        post_categories(category_id)
      `
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
});

export const getAdminUsers = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, name, role, is_active, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdminProfile[];
});

export const getAdminUserById = cache(async (id: string) => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, name, role, is_active, created_at, updated_at")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as AdminProfile | null) ?? null;
});
