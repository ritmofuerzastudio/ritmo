export type Role = "admin" | "editor";

export type AdminProfile = {
  id: string;
  email: string;
  name: string;
  role: Role;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type PostStatus = "draft" | "published";

export type PostRecord = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content_json: Record<string, unknown>;
  content_html: string;
  featured_image_url: string | null;
  status: PostStatus;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  robots_index: boolean;
  robots_follow: boolean;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author_id: string;
};
