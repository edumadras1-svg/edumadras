import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/engineering-colleges-tamilnadu-cutoff";
const H1 = "Engineering Colleges in Tamil Nadu — TNEA Cutoff 2025";
const BREADCRUMBS = [{ label: "TNEA Cutoff", href: "/engineering-colleges-tamilnadu-cutoff" }];
const FAQ_ITEMS = [{ question: "What was the TNEA cutoff for top colleges in 2024?", answer: "CEG Anna University CSE: ~197/200 cutoff. SSN CSE: ~195. MIT Anna University: ~194. Cutoffs vary by branch and category." }, { question: "How are TNEA cutoffs calculated?", answer: "TNEA cutoff is based on +2 marks: (Maths + Physics + Chemistry) / 3 * 200/300. Total is normalized to 200." }];

export const metadata: Metadata = {
  title: "Engineering Colleges Tamil Nadu Cutoff 2025 — TNEA Marks | EduMadras",
  description: "Last year TNEA cutoff marks for all engineering colleges in Tamil Nadu. Branch-wise cutoffs for 2025 admissions.",
  keywords: "last year cutoff engineering colleges tamilnadu, tnea cutoff 2025",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Engineering Colleges Tamil Nadu Cutoff 2025 — TNEA Marks | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", state: "Tamil Nadu" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Engineering Colleges Tamil Nadu Cutoff 2025 — TNEA Marks" h1={H1} subtitle="Last year TNEA cutoff marks for all engineering colleges in Tamil Nadu. Branch-wise cutoffs for 2025 admissions." introText="Understanding TNEA cutoff marks is essential for choosing the right engineering college in Tamil Nadu. This comprehensive guide provides last year's cutoff data for all major colleges and branches, helping you predict your admission chances for the 2025 counseling session." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Cutoff" />
    </>
  );
}
