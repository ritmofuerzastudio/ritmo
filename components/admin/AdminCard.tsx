type AdminCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

export function AdminCard({
  title,
  description,
  children,
  action,
}: AdminCardProps) {
  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-stone-200 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-stone-900">{title}</h2>
          {description ? (
            <p className="mt-1 max-w-2xl text-sm text-stone-600">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      <div className="pt-6">{children}</div>
    </section>
  );
}
