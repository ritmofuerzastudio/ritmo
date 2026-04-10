"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Code2,
  Eye,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  SeparatorHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category, PostStatus } from "@/lib/types";
import { slugify } from "@/lib/format";

type PostEditorProps = {
  mode: "create" | "edit";
  postId?: string;
  initialSlug?: string;
  initialValues?: {
    title: string;
    slug: string;
    excerpt: string;
    featuredImageUrl: string;
    status: PostStatus;
    seoTitle: string;
    seoDescription: string;
    canonicalUrl: string;
    robotsIndex: boolean;
    robotsFollow: boolean;
    ogTitle: string;
    ogDescription: string;
    ogImageUrl: string;
    contentJson: Record<string, unknown>;
    contentHtml: string;
    categoryIds: string[];
  };
  categories: Category[];
};

type EditorMode = "visual" | "html";

type ToolbarButtonProps = {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const defaultContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [{ type: "text", text: "Escribe aquí el contenido del artículo." }],
    },
  ],
};

function ToolbarButton({
  label,
  active = false,
  disabled = false,
  onClick,
  icon: Icon,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-2xl border transition",
        "hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0",
        active
          ? "border-secondary bg-secondary text-primary shadow-sm"
          : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50",
        disabled && "cursor-not-allowed opacity-50 hover:translate-y-0"
      )}
    >
      <Icon size={18} />
    </button>
  );
}

export function PostEditor({
  mode,
  postId,
  initialSlug,
  initialValues,
  categories,
}: PostEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [slug, setSlug] = useState(initialValues?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initialValues?.excerpt ?? "");
  const [featuredImageUrl, setFeaturedImageUrl] = useState(
    initialValues?.featuredImageUrl ?? ""
  );
  const [status, setStatus] = useState<PostStatus>(
    initialValues?.status ?? "draft"
  );
  const [seoTitle, setSeoTitle] = useState(initialValues?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(
    initialValues?.seoDescription ?? ""
  );
  const [canonicalUrl, setCanonicalUrl] = useState(
    initialValues?.canonicalUrl ?? ""
  );
  const [robotsIndex, setRobotsIndex] = useState(
    initialValues?.robotsIndex ?? true
  );
  const [robotsFollow, setRobotsFollow] = useState(
    initialValues?.robotsFollow ?? true
  );
  const [ogTitle, setOgTitle] = useState(initialValues?.ogTitle ?? "");
  const [ogDescription, setOgDescription] = useState(
    initialValues?.ogDescription ?? ""
  );
  const [ogImageUrl, setOgImageUrl] = useState(initialValues?.ogImageUrl ?? "");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    initialValues?.categoryIds ?? []
  );
  const [editorMode, setEditorMode] = useState<EditorMode>("visual");
  const [htmlContent, setHtmlContent] = useState(
    initialValues?.contentHtml ?? "<p></p>"
  );
  const [featuredImagePreview, setFeaturedImagePreview] = useState(
    initialValues?.featuredImageUrl ?? ""
  );
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [featuredImageNotice, setFeaturedImageNotice] = useState("");
  const [pendingInlineImages, setPendingInlineImages] = useState<
    Record<string, File>
  >({});
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      LinkExtension.configure({
        openOnClick: false,
      }),
      Image,
      Placeholder.configure({
        placeholder: "Desarrolla la publicación con estilo editorial.",
      }),
    ],
    content: initialValues?.contentJson ?? defaultContent,
    editorProps: {
      attributes: {
        class:
          "tiptap-editor min-h-[360px] rounded-[1.75rem] bg-white px-6 py-5 focus:outline-none",
      },
    },
    onUpdate({ editor: currentEditor }) {
      setHtmlContent(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (title && !initialValues?.slug) {
      setSlug(slugify(title));
    }
  }, [initialValues?.slug, title]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (initialValues?.contentHtml) {
      setHtmlContent(initialValues.contentHtml);
    } else {
      setHtmlContent(editor.getHTML());
    }
  }, [editor, initialValues?.contentHtml]);

  useEffect(() => {
    return () => {
      Object.keys(pendingInlineImages).forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });

      if (featuredImagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(featuredImagePreview);
      }
    };
  }, [featuredImagePreview, pendingInlineImages]);

  async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const payload = await response.json().catch(() => ({
      error: "La respuesta del servidor no fue válida.",
    }));

    if (!response.ok) {
      throw new Error(payload.error ?? "No se pudo subir la imagen.");
    }

    return payload.publicUrl as string;
  }

  function syncHtmlToEditor(nextHtml: string) {
    setHtmlContent(nextHtml);
    editor?.commands.setContent(nextHtml, { emitUpdate: false });
  }

  function replaceSourcesInJson(
    value: unknown,
    replacements: Record<string, string>
  ): unknown {
    if (Array.isArray(value)) {
      return value.map((item) => replaceSourcesInJson(item, replacements));
    }

    if (value && typeof value === "object") {
      const nextObject: Record<string, unknown> = {};

      for (const [key, nestedValue] of Object.entries(value)) {
        if (key === "src" && typeof nestedValue === "string" && replacements[nestedValue]) {
          nextObject[key] = replacements[nestedValue];
        } else {
          nextObject[key] = replaceSourcesInJson(
            nestedValue as
              | Record<string, unknown>
              | unknown[]
              | string
              | number
              | boolean
              | null,
            replacements
          );
        }
      }

      return nextObject;
    }

    return value;
  }

  async function uploadPendingAssets() {
    const replacements: Record<string, string> = {};

    for (const [previewUrl, file] of Object.entries(pendingInlineImages)) {
      const publicUrl = await uploadFile(file);
      replacements[previewUrl] = publicUrl;
    }

    let nextFeaturedImageUrl = featuredImageUrl;

    if (featuredImageFile) {
      nextFeaturedImageUrl = await uploadFile(featuredImageFile);
      setFeaturedImageUrl(nextFeaturedImageUrl);
      setFeaturedImagePreview(nextFeaturedImageUrl);
      setFeaturedImageNotice("Imagen destacada subida correctamente a Supabase Storage.");
    }

    const currentHtml =
      editorMode === "html" ? htmlContent : editor?.getHTML() ?? "<p></p>";
    const currentJson = editor?.getJSON() ?? defaultContent;

    const normalizedHtml = Object.entries(replacements).reduce(
      (accumulator, [from, to]) => accumulator.split(from).join(to),
      currentHtml
    );

    const normalizedJson = replaceSourcesInJson(
      currentJson as Record<string, unknown>,
      replacements
    ) as Record<string, unknown>;

    if (editor) {
      editor.commands.setContent(normalizedHtml, { emitUpdate: false });
    }

    setHtmlContent(normalizedHtml);
    setPendingInlineImages({});
    setFeaturedImageFile(null);

    return {
      contentHtml: normalizedHtml,
      contentJson: normalizedJson,
      featuredImageUrl: nextFeaturedImageUrl,
    };
  }

  function handleModeChange(nextMode: EditorMode) {
    if (nextMode === "visual" && editor) {
      editor.commands.setContent(htmlContent, { emitUpdate: false });
    }

    setEditorMode(nextMode);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    startTransition(async () => {
      try {
        if (editorMode === "html" && editor) {
          editor.commands.setContent(htmlContent, { emitUpdate: false });
        }

        const assets = await uploadPendingAssets();
        const response = await fetch(
          mode === "create" ? "/api/admin/posts" : `/api/admin/posts/${postId}`,
          {
            method: mode === "create" ? "POST" : "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              slug,
              excerpt,
              status,
              seo_title: seoTitle,
              seo_description: seoDescription,
              canonical_url: canonicalUrl,
              robots_index: robotsIndex,
              robots_follow: robotsFollow,
              og_title: ogTitle,
              og_description: ogDescription,
              og_image_url: ogImageUrl,
              content_json: assets.contentJson,
              content_html: assets.contentHtml,
              category_ids: selectedCategoryIds,
              featured_image_url: assets.featuredImageUrl,
            }),
          }
        );

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error ?? "No se pudo guardar la publicación.");
        }

        router.push(`/admin/posts/edit/${payload.slug ?? slug ?? initialSlug ?? ""}`);
        router.refresh();
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : "No se pudo guardar la publicación."
        );
      }
    });
  }

  async function handleFeaturedImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setFeaturedImageNotice("La imagen destacada está lista para subirse al guardar.");
      setFeaturedImageFile(file);

      if (featuredImagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(featuredImagePreview);
      }

      const previewUrl = URL.createObjectURL(file);
      setFeaturedImagePreview(previewUrl);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "No se pudo subir la imagen destacada."
      );
    }
  }

  async function handleInsertImage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];

      if (!file) {
        return;
      }

      try {
        const previewUrl = URL.createObjectURL(file);
        setPendingInlineImages((current) => ({
          ...current,
          [previewUrl]: file,
        }));

        const inserted = editor
          ?.chain()
          .focus()
          .setImage({ src: previewUrl, alt: file.name })
          .createParagraphNear()
          .run();

        if (!inserted) {
          throw new Error("No se pudo insertar la imagen en el editor.");
        }
      } catch (uploadError) {
        setError(
          uploadError instanceof Error
            ? uploadError.message
            : "No se pudo subir la imagen."
        );
      }
    };
    input.click();
  }

  function handleInsertLink() {
    const existingUrl = editor?.getAttributes("link").href as string | undefined;
    const url = window.prompt("Ingresa la URL del enlace", existingUrl ?? "");

    if (url === null) {
      return;
    }

    if (url.trim() === "") {
      editor?.chain().focus().unsetLink().run();
      return;
    }

    editor?.chain().focus().setLink({ href: url }).run();
  }

  const toolbarButtons = [
    {
      label: "Párrafo",
      icon: Pilcrow,
      active: editor?.isActive("paragraph") ?? false,
      onClick: () => editor?.chain().focus().setParagraph().run(),
    },
    {
      label: "Negritas",
      icon: Bold,
      active: editor?.isActive("bold") ?? false,
      onClick: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      label: "Cursivas",
      icon: Italic,
      active: editor?.isActive("italic") ?? false,
      onClick: () => editor?.chain().focus().toggleItalic().run(),
    },
    {
      label: "Lista",
      icon: List,
      active: editor?.isActive("bulletList") ?? false,
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Lista numerada",
      icon: ListOrdered,
      active: editor?.isActive("orderedList") ?? false,
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
    {
      label: "H2",
      icon: Heading2,
      active: editor?.isActive("heading", { level: 2 }) ?? false,
      onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "H3",
      icon: Heading3,
      active: editor?.isActive("heading", { level: 3 }) ?? false,
      onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      label: "Cita",
      icon: Quote,
      active: editor?.isActive("blockquote") ?? false,
      onClick: () => editor?.chain().focus().toggleBlockquote().run(),
    },
    {
      label: "Separador",
      icon: SeparatorHorizontal,
      active: false,
      onClick: () => editor?.chain().focus().setHorizontalRule().run(),
    },
    {
      label: "Enlace",
      icon: Link2,
      active: editor?.isActive("link") ?? false,
      onClick: handleInsertLink,
    },
    {
      label:
        Object.keys(pendingInlineImages).length > 0
          ? "Imagen pendiente"
          : "Insertar imagen",
      icon: ImagePlus,
      active: Object.keys(pendingInlineImages).length > 0,
      onClick: handleInsertImage,
    },
    {
      label: "HTML",
      icon: Code2,
      active: editorMode === "html",
      onClick: () => handleModeChange("html"),
    },
    {
      label: "Visual",
      icon: Eye,
      active: editorMode === "visual",
      onClick: () => handleModeChange("visual"),
    },
  ];

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="grid gap-6 lg:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Título</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3"
            required
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Slug</span>
          <input
            value={slug}
            onChange={(event) => setSlug(slugify(event.target.value))}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3"
            required
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium text-stone-700">Extracto</span>
        <textarea
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          rows={3}
          className="w-full rounded-2xl border border-stone-200 px-4 py-3"
        />
      </label>

      <div className="space-y-4 rounded-[2rem] border border-stone-200 bg-stone-50 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {toolbarButtons.map((button) => (
            <ToolbarButton key={button.label} {...button} />
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-stone-500">
          <span className="rounded-full bg-white px-3 py-1">H2</span>
          <span className="rounded-full bg-white px-3 py-1">H3</span>
          <span className="rounded-full bg-white px-3 py-1">Lista</span>
          <span className="rounded-full bg-white px-3 py-1">Lista numerada</span>
          <span className="rounded-full bg-white px-3 py-1">Cita</span>
          <span className="rounded-full bg-white px-3 py-1">HTML</span>
        </div>
        {editorMode === "visual" ? (
          <div className="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm">
            <EditorContent editor={editor} />
          </div>
        ) : (
          <textarea
            value={htmlContent}
            onChange={(event) => syncHtmlToEditor(event.target.value)}
            rows={18}
            className="min-h-[360px] w-full rounded-[1.75rem] border border-stone-200 bg-white px-5 py-4 font-mono text-sm text-stone-700 outline-none"
          />
        )}
        <p className="text-sm text-stone-500">
          El modo visual es el predeterminado. Puedes cambiar a HTML para revisar
          o editar el marcado directamente.
        </p>
        {Object.keys(pendingInlineImages).length > 0 ? (
          <p className="text-sm text-amber-700">
            Hay {Object.keys(pendingInlineImages).length} imagen(es) dentro del
            texto listas para subirse cuando guardes la publicación.
          </p>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Estado</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as PostStatus)}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3"
          >
            <option value="draft">Borrador</option>
            <option value="published">Publicada</option>
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">
            Imagen destacada
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFeaturedImageChange}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3"
          />
          {featuredImagePreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={featuredImagePreview}
              alt="Preview de imagen destacada"
              className="mt-3 h-48 w-full rounded-[1.5rem] object-cover"
            />
          ) : null}
          {featuredImageUrl ? (
            <input
              value={featuredImageUrl}
              onChange={(event) => setFeaturedImageUrl(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm"
            />
          ) : null}
          {featuredImageNotice ? (
            <p className="text-sm text-stone-500">{featuredImageNotice}</p>
          ) : null}
        </label>
      </div>

      <div>
        <p className="text-sm font-medium text-stone-700">Categorías</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {categories.map((category) => {
            const isSelected = selectedCategoryIds.includes(category.id);

            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  setSelectedCategoryIds((current) =>
                    isSelected
                      ? current.filter((id) => id !== category.id)
                      : [...current, category.id]
                  )
                }
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5",
                  isSelected
                    ? "bg-secondary text-primary shadow-sm"
                    : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                )}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">SEO title</span>
          <input
            value={seoTitle}
            onChange={(event) => setSeoTitle(event.target.value)}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">
            Canonical URL
          </span>
          <input
            value={canonicalUrl}
            onChange={(event) => setCanonicalUrl(event.target.value)}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3"
          />
        </label>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">
            SEO description
          </span>
          <textarea
            value={seoDescription}
            onChange={(event) => setSeoDescription(event.target.value)}
            rows={3}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3"
          />
        </label>
        <div className="grid gap-4">
          <label className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
            <input
              type="checkbox"
              checked={robotsIndex}
              onChange={(event) => setRobotsIndex(event.target.checked)}
            />
            Indexar en buscadores
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
            <input
              type="checkbox"
              checked={robotsFollow}
              onChange={(event) => setRobotsFollow(event.target.checked)}
            />
            Permitir follow
          </label>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">OG title</span>
          <input
            value={ogTitle}
            onChange={(event) => setOgTitle(event.target.value)}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">
            OG description
          </span>
          <input
            value={ogDescription}
            onChange={(event) => setOgDescription(event.target.value)}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">OG image</span>
          <input
            value={ogImageUrl}
            onChange={(event) => setOgImageUrl(event.target.value)}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3"
          />
        </label>
      </div>

      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-2xl bg-secondary px-6 py-3 font-semibold text-primary transition hover:bg-secondary/90 disabled:opacity-60"
        >
          {isPending
            ? "Guardando..."
            : mode === "create"
              ? "Crear publicación"
              : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}
