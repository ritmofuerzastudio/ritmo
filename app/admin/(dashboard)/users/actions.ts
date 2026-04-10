"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { userCreateSchema, userUpdateSchema } from "@/lib/validators";

export async function createUserAction(formData: FormData) {
  await requireRole(["admin"]);
  const parsed = userCreateSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    role: formData.get("role"),
  });

  const adminClient = createSupabaseAdminClient();
  const { data, error } = await adminClient.auth.admin.createUser({
    email: parsed.email,
    password: parsed.password,
    email_confirm: true,
    user_metadata: {
      name: parsed.name,
      role: parsed.role,
    },
  });

  if (error || !data.user) {
    redirect(`/admin/users?error=${encodeURIComponent(error?.message ?? "No se pudo crear el usuario.")}`);
  }

  const supabase = await createSupabaseServerClient();
  await supabase
    .from("profiles")
    .update({
      name: parsed.name,
      email: parsed.email,
      role: parsed.role,
      is_active: true,
    })
    .eq("id", data.user.id);

  revalidatePath("/admin/users");
  redirect("/admin/users?success=created");
}

export async function updateUserAction(id: string, formData: FormData) {
  await requireRole(["admin"]);
  const parsed = userUpdateSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role"),
    is_active: formData.get("is_active") === "on",
  });

  const adminClient = createSupabaseAdminClient();
  const { error } = await adminClient.auth.admin.updateUserById(id, {
    email: parsed.email,
    user_metadata: {
      name: parsed.name,
      role: parsed.role,
    },
    ban_duration: parsed.is_active ? "none" : "876000h",
  });

  if (error) {
    redirect(`/admin/users/${id}?error=${encodeURIComponent(error.message)}`);
  }

  const supabase = await createSupabaseServerClient();
  await supabase
    .from("profiles")
    .update(parsed)
    .eq("id", id);

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${id}`);
  redirect(`/admin/users/${id}?success=updated`);
}

export async function deleteUserAction(id: string) {
  await requireRole(["admin"]);
  const adminClient = createSupabaseAdminClient();
  const { error } = await adminClient.auth.admin.deleteUser(id);

  if (error) {
    redirect(`/admin/users/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/users");
  redirect("/admin/users?success=deleted");
}
