import { AdminShell } from "@/components/admin/AdminShell";
import { requireRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { profile } = await requireRole(["admin", "editor"]);

  return <AdminShell profile={profile}>{children}</AdminShell>;
}
