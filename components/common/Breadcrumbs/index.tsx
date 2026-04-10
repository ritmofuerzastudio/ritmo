import Link from "next/link";

export function Breadcrumb({
  category,
  title,
}: {
  category: string;
  title: string;
}) {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      <Link href="/blog" className="hover:underline">
        Blog
      </Link>{" "}
      /{" "}
      <Link href={`/blog?category=${category}`} className="hover:underline">
        {category}
      </Link>{" "}
      / <span className="text-black">{title}</span>
    </nav>
  );
}
