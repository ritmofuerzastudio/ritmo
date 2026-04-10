import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FreeClassSection from "@/components/FreeClassSection";
import { HtmlContent } from "@/components/blog/HtmlContent";
import { getPublishedPostBySlug } from "@/lib/cms";
import { formatDate } from "@/lib/format";
import { getSiteUrl } from "@/lib/env";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
    };
  }

  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt || "Entrada del blog";
  const canonical = post.canonical_url || `${getSiteUrl()}/blog/${post.slug}`;
  const robots = `${post.robots_index ? "index" : "noindex"}, ${post.robots_follow ? "follow" : "nofollow"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots,
    openGraph: {
      title: post.og_title || title,
      description: post.og_description || description,
      url: canonical,
      images: post.og_image_url ? [{ url: post.og_image_url }] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.og_title || title,
      description: post.og_description || description,
      images: post.og_image_url ? [post.og_image_url] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-stone-50">
        <section className="bg-secondary px-4 py-20 text-primary">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm uppercase tracking-[0.3em]">
              {post.category_names?.join(" · ") || "Blog"}
            </p>
            <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-primary/85">
              {post.excerpt || "Contenido editorial sobre baile, fitness y comunidad."}
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-primary/70">
              Publicado el {formatDate(post.published_at)}
            </p>
          </div>
        </section>
        <section className="px-4 py-16">
          <article className="mx-auto max-w-4xl rounded-[2rem] bg-white p-8 shadow-sm md:p-12">
            <HtmlContent html={post.content_html} />
          </article>
        </section>
        <FreeClassSection />
      </main>
      <Footer />
    </>
  );
}
