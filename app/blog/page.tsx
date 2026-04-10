import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FreeClassSection from "@/components/FreeClassSection";
import Section from "@/components/Section";
import StudioImg from "@/img/studio.png";
import Link from "next/link";
import { getAllCategories, getPublishedPosts } from "@/lib/cms";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.q?.trim() ?? "";
  const categorySlug = resolvedSearchParams.category?.trim() ?? "";
  const [categories, posts] = await Promise.all([
    getAllCategories(),
    getPublishedPosts(search, categorySlug),
  ]);

  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Section
          bgImage={StudioImg.src}
          overlayColor="bg-secondary/30"
          contentClassName="flex flex-col items-center justify-center"
        >
          <h1 className="text-4xl md:text-6xl font-semibold text-white text-center uppercase">
            Blog
          </h1>
          <p className="mt-2 text-center text-lg md:text-2xl text-white">
            Artículos y noticias sobre baile y kickboxing
          </p>
        </Section>
        <section className="bg-stone-50 px-4 py-16 text-stone-900">
          <div className="mx-auto max-w-6xl">
            <form className="rounded-[2rem] bg-white p-6 shadow-sm">
              <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_auto]">
                <input
                  type="search"
                  name="q"
                  defaultValue={search}
                  placeholder="Buscar por nombre de publicación"
                  className="rounded-2xl border border-stone-200 px-4 py-3"
                />
                <select
                  name="category"
                  defaultValue={categorySlug}
                  className="rounded-2xl border border-stone-200 px-4 py-3"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="rounded-2xl bg-secondary px-6 py-3 font-semibold text-primary"
                >
                  Filtrar
                </button>
              </div>
            </form>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  !categorySlug
                    ? "bg-secondary text-primary"
                    : "border border-stone-200 bg-white text-stone-700"
                }`}
              >
                Todas
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog?category=${category.slug}`}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    categorySlug === category.slug
                      ? "bg-secondary text-primary"
                      : "border border-stone-200 bg-white text-stone-700"
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-[2rem] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-secondary">
                    {post.category_names?.join(" · ") || "Blog"}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold text-stone-900">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-stone-600">
                    {post.excerpt || "Explora nuevas ideas, rutinas y técnica para mejorar tu práctica."}
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <p className="text-sm text-stone-500">
                      {formatDate(post.published_at)}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-semibold text-secondary underline"
                    >
                      Leer artículo
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {!posts.length ? (
              <div className="mt-10 rounded-[2rem] border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
                <p className="text-lg text-stone-600">
                  No encontramos publicaciones con los filtros actuales.
                </p>
              </div>
            ) : null}
          </div>
        </section>
        <FreeClassSection />
      </main>
      <Footer />
    </>
  );
}
