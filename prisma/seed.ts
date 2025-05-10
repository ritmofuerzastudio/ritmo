import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { name: "ADMIN", description: "Control total del sistema" },
    { name: "EDITOR", description: "Revisa y publica contenido" },
    { name: "AUTHOR", description: "Crea y edita sus propios posts" },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }

  const adminRole = await prisma.role.findUnique({
    where: { name: "ADMIN" },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@blog.com" },
    update: {},
    create: {
      email: "admin@blog.com",
      name: "Admin User",
      password: await bcrypt.hash("admin123", 10),
      roleId: adminRole!.id,
    },
  });

  const editorRole = await prisma.role.findUnique({
    where: { name: "EDITOR" },
  });

  const editor = await prisma.user.upsert({
    where: { email: "editor@blog.com" },
    update: {},
    create: {
      email: "editor@blog.com",
      name: "Editor User",
      password: await bcrypt.hash("editor123", 10),
      roleId: editorRole!.id,
    },
  });

  const authorRole = await prisma.role.findUnique({
    where: { name: "AUTHOR" },
  });

  const author = await prisma.user.upsert({
    where: { email: "author@blog.com" },
    update: {},
    create: {
      email: "author@blog.com",
      name: "Author User",
      password: await bcrypt.hash("author123", 10),
      roleId: authorRole!.id,
    },
  });

  const category = await prisma.category.upsert({
    where: { name: "Tecnología" },
    update: {},
    create: {
      name: "Tecnología",
      slug: "tecnologia",
    },
  });

  await prisma.post.createMany({
    data: [
      {
        title: "Primer post",
        slug: "primer-post",
        content: "Este es el primer post",
        metaTitle: "Post de bienvenida",
        metaDesc: "Meta descripción del primer post",
        published: true,
        authorId: admin.id,
        categoryId: category.id,
      },
    ],
  });

  console.log("✅ Seed completado con modelo Role");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
