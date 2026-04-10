import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { freeClassRequestSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const payload = freeClassRequestSchema.parse(await request.json());
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("free_class_requests")
      .insert({
        name: payload.name,
        email: payload.email,
        phone: payload.phone || null,
        interest: payload.interest,
      })
      .select("id, name, email, phone, interest, created_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
