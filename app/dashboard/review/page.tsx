// /app/dashboard/review/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

interface Post {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
  scheduledFor: string | null;
}

export default function ReviewPostsPage() {
  //const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  /*
  useEffect(() => {
    if (
      !session ||
      (session.user.role !== "ADMIN" && session.user.role !== "EDITOR")
    ) {
      router.push("/api/auth/signin");
    }
  }, [session]);
  */

  useEffect(() => {
    fetch("/api/posts/pending")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const schedulePost = async (id: string, date: string) => {
    await fetch(`/api/posts/${id}/schedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date }),
    });
    const updated = await fetch("/api/posts/pending").then((res) => res.json());
    setPosts(updated);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">
        Revisión y programación de publicaciones
      </h1>
      {posts.length === 0 && <p>No hay publicaciones pendientes.</p>}
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-sm text-muted-foreground">
            Creado: {format(new Date(post.createdAt), "dd/MM/yyyy HH:mm")}
          </p>
          <div className="mt-2 flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/dashboard/posts/${post.id}/edit`)}
            >
              Editar
            </Button>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const date = formData.get("schedule") as string;
                await schedulePost(post.id, date);
              }}
              className="flex items-center gap-2"
            >
              <Input name="schedule" type="datetime-local" required />
              <Button type="submit">Programar publicación</Button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
