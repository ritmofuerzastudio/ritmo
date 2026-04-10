export function HtmlContent({ html }: { html: string }) {
  return (
    <div
      className="blog-html"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
