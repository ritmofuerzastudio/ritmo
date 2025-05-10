export function Breadcrumb({
  category,
  title,
}: {
  category: string;
  title: string;
}) {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      <a href="/blog" className="hover:underline">
        Blog
      </a>{" "}
      /{" "}
      <a href={`/blog/${category}`} className="hover:underline">
        {category}
      </a>{" "}
      / <span className="text-black">{title}</span>
    </nav>
  );
}
