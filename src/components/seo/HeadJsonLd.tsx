// Server Component: Renders JSON-LD structured data in the HTML head.
// Per 2026 Google crawling rules, JSON-LD must be in <head> to avoid
// truncation at the 2MB HTML limit.

export function HeadJsonLd({ schemas }: { schemas: Record<string, unknown>[] }) {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
