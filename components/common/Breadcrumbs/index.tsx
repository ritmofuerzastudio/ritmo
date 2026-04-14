export function Breadcrumb({ title }: { title: string }) {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      <span className="text-black">{title}</span>
    </nav>
  );
}
