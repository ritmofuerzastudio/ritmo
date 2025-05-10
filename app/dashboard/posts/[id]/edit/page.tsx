// /app/dashboard/posts/[id]/edit/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";

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

export default function EditPostPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const postId = params?.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

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

  useEffect(() => {
    fetch(`/api/posts/${postId}`)
      .then((res) => res.json())
      .then(setPost);
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, [postId]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!post) return;

    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    if (res.ok) {
      router.push("/dashboard/posts");
    }
  }

  if (!post) return <p className="p-6">Cargando...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Editar publicación</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <Input
          placeholder="Título"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />
        <Input
          placeholder="Slug"
          value={post.slug}
          onChange={(e) => setPost({ ...post, slug: e.target.value })}
          required
        />
        <Textarea
          placeholder="Contenido"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          required
        />
        <Select
          value={post.categoryId}
          onValueChange={(value) => setPost({ ...post, categoryId: value })}
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
          value={post.metaTitle || ""}
          onChange={(e) => setPost({ ...post, metaTitle: e.target.value })}
        />
        <Textarea
          placeholder="Meta description (SEO)"
          value={post.metaDesc || ""}
          onChange={(e) => setPost({ ...post, metaDesc: e.target.value })}
        />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={post.published}
            onChange={(e) => setPost({ ...post, published: e.target.checked })}
          />
          <label>Publicar</label>
        </div>
        <Button type="submit">Actualizar publicación</Button>
      </form>
    </div>
  );
}
