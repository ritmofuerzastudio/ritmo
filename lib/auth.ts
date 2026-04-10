import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminProfile, Role } from "@/lib/types";

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getCurrentProfile() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, email, name, role, is_active, created_at, updated_at")
    .eq("id", user.id)
    .maybeSingle();

  return (data as AdminProfile | null) ?? null;
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}

export async function requireRole(allowedRoles: Role[]) {
  const user = await requireUser();
  const profile = await getCurrentProfile();

  if (!profile || !profile.is_active || !allowedRoles.includes(profile.role)) {
    redirect("/admin/login?error=unauthorized");
  }

  return { user, profile };
}
