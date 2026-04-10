import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const profile = await getCurrentProfile();

  if (!profile || !profile.is_active || !["admin", "editor"].includes(profile.role)) {
    return NextResponse.json(
      { error: "Tu sesión no tiene permisos para subir imágenes." },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Archivo inválido." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Solo se permiten archivos de imagen." },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
  const fileName = `${crypto.randomUUID()}-${safeName}`;
  const filePath = `blog/${fileName}`;
  const adminClient = createSupabaseAdminClient();

  const { error } = await adminClient.storage
    .from("blog-media")
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = adminClient.storage.from("blog-media").getPublicUrl(filePath);

  return NextResponse.json({ publicUrl, path: filePath });
}
