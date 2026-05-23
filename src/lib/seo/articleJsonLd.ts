// Helper to build JSON-LD structured data for SEO blog/guide pages.
// Generates Article + FAQPage + BreadcrumbList schemas.

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface HowToStep {
  name: string;
  text: string;
}

export function buildArticleJsonLd({
  title,
  description,
  pageUrl,
  datePublished,
  dateModified,
  breadcrumbs,
  faqItems,
  howToSteps,
}: {
  title: string;
  description: string;
  pageUrl: string;
  datePublished: string;
  dateModified: string;
  breadcrumbs: BreadcrumbItem[];
  faqItems: FAQItem[];
  howToSteps?: HowToStep[];
}) {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: pageUrl,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: "EduMadras",
      url: "https://www.edumadras.com",
    },
    publisher: {
      "@type": "Organization",
      name: "EduMadras",
      url: "https://www.edumadras.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.edumadras.com/icon-192.png",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.edumadras.com" },
      ...breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: b.label,
        item: `https://www.edumadras.com${b.href}`,
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

  const schemas: Record<string, any>[] = [article, breadcrumbList, faqPage];

  // Optional HowTo schema for step-by-step guides
  if (howToSteps && howToSteps.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo" as string,
      name: title,
      step: howToSteps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    } as Record<string, unknown>);
  }

  return schemas;
}
