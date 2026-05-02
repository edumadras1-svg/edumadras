// Helper to build JSON-LD structured data for SEO listing pages.
// Used in server components' generateMetadata to place JSON-LD in <head>.

interface College {
  id: string;
  name: string;
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export function buildListingJsonLd({
  h1,
  pageUrl,
  colleges,
  breadcrumbs,
  faqItems,
}: {
  h1: string;
  pageUrl: string;
  colleges: College[];
  breadcrumbs: BreadcrumbItem[];
  faqItems: FAQItem[];
}) {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: h1,
    url: pageUrl,
    numberOfItems: colleges.length,
    itemListElement: colleges.slice(0, 50).map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `https://edumadras.com/colleges/${c.id}`,
    })),
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://edumadras.com" },
      ...breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: b.label,
        item: `https://edumadras.com${b.href}`,
      })),
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  // Return array of JSON-LD objects to be serialized as script tags in <head>
  return [itemList, breadcrumbList, faqPage];
}
