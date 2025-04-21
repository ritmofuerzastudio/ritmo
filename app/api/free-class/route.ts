import { prisma } from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validar datos
    if (!data.name || !data.email || !data.interest) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Crear registro en la base de datos
    const newRequest = await prisma.freeClassRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        interest: data.interest,
      },
    });

    return NextResponse.json(newRequest);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
