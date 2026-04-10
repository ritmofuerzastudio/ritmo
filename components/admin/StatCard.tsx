type StatCardProps = {
  label: string;
  value: string | number;
  hint: string;
};

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-sm">
      <p className="text-sm uppercase tracking-[0.2em] text-stone-500">{label}</p>
      <p className="mt-3 text-4xl font-semibold text-secondary">{value}</p>
      <p className="mt-2 text-sm text-stone-600">{hint}</p>
    </div>
  );
}
