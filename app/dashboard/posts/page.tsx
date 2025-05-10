"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//import { useSession } from "next-auth/react";
//import { useRouter } from "next/navigation";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  categoryId: string;
  metaTitle?: string;
  metaDesc?: string;
  published: boolean;
  createdAt: string;
}

export default function DashboardPosts() {
  //const { data: session } = useSession();
  //const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<Omit<Post, "id" | "createdAt">>({
    title: "",
    slug: "",
    content: "",
    categoryId: "",
    metaTitle: "",
    metaDesc: "",
    published: false,
  });
  /*
  useEffect(() => {
    if (
      !session ||
      (session.user.role !== "ADMIN" &&
        session.user.role !== "EDITOR" &&
        session.user.role !== "AUTHOR")
    ) {
      router.push("/api/auth/signin");
    }
  }, [session]);
  */

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(setPosts);
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newPost = await res.json();
      setPosts((prev) => [newPost, ...prev]);
      setForm({
        title: "",
        slug: "",
        content: "",
        categoryId: "",
        metaTitle: "",
        metaDesc: "",
        published: false,
      });
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Estás seguro de eliminar este post?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setPosts(posts.filter((p) => p.id !== id));
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Gestión de Publicaciones</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <Input
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          required
        />
        <Textarea
          placeholder="Contenido"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <Select
          value={form.categoryId}
          onValueChange={(value) => setForm({ ...form, categoryId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Meta title (SEO)"
          value={form.metaTitle}
          onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
        />
        <Textarea
          placeholder="Meta description (SEO)"
          value={form.metaDesc}
          onChange={(e) => setForm({ ...form, metaDesc: e.target.value })}
        />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          <label>Publicar</label>
        </div>
        <Button type="submit">Crear publicación</Button>
      </form>

      <hr className="my-6" />

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-500">
                  Slug: {post.slug} | Publicado: {post.published ? "Sí" : "No"}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/posts/${post.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
