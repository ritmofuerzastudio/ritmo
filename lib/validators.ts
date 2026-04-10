import { z } from "zod";

export const freeClassRequestSchema = z.object({
  name: z.string().trim().min(2, "El nombre es obligatorio."),
  email: z.string().trim().email("Ingresa un email válido."),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  interest: z.string().trim().min(2, "Selecciona un interés."),
});

export const categorySchema = z.object({
  name: z.string().trim().min(2, "El nombre es obligatorio."),
  slug: z.string().trim().min(2, "El slug es obligatorio."),
  description: z.string().trim().optional().or(z.literal("")),
});

export const postSchema = z.object({
  title: z.string().trim().min(3, "El título es obligatorio."),
  slug: z.string().trim().min(3, "El slug es obligatorio."),
  excerpt: z.string().trim().max(260).optional().or(z.literal("")),
  content_json: z.record(z.string(), z.any()).or(z.array(z.any())).or(z.object({})),
  content_html: z.string().trim().min(1, "El contenido HTML es obligatorio."),
  featured_image_url: z.string().url().optional().or(z.literal("")).or(z.null()),
  status: z.enum(["draft", "published"]),
  seo_title: z.string().trim().max(70).optional().or(z.literal("")),
  seo_description: z.string().trim().max(170).optional().or(z.literal("")),
  canonical_url: z.string().url().optional().or(z.literal("")),
  robots_index: z.boolean(),
  robots_follow: z.boolean(),
  og_title: z.string().trim().max(70).optional().or(z.literal("")),
  og_description: z.string().trim().max(170).optional().or(z.literal("")),
  og_image_url: z.string().url().optional().or(z.literal("")).or(z.null()),
  category_ids: z.array(z.string().uuid()).default([]),
});

export const userCreateSchema = z
  .object({
    name: z.string().trim().min(2, "El nombre es obligatorio."),
    email: z.string().trim().email("Ingresa un email válido."),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres.")
      .regex(/[A-Z]/, "La contraseña debe incluir una mayúscula.")
      .regex(/[a-z]/, "La contraseña debe incluir una minúscula.")
      .regex(/[0-9]/, "La contraseña debe incluir un número."),
    confirmPassword: z.string().min(8, "Confirma la contraseña."),
    role: z.enum(["admin", "editor"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export const userUpdateSchema = z.object({
  name: z.string().trim().min(2, "El nombre es obligatorio."),
  email: z.string().trim().email("Ingresa un email válido."),
  role: z.enum(["admin", "editor"]),
  is_active: z.boolean(),
});
