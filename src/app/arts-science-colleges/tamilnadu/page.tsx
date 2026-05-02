import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/arts-science-colleges/tamilnadu";
const H1 = "Best Arts and Science Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "Arts & Science Colleges", href: "/arts-science-colleges/tamilnadu" }, { label: "Tamil Nadu", href: "/arts-science-colleges/tamilnadu" }];
const FAQ_ITEMS = [
  { question: "How many arts and science colleges are in Tamil Nadu?", answer: "Tamil Nadu has over 700 arts and science colleges, including government, government-aided, and self-financing institutions affiliated to universities like Madras University, Bharathiar University, and Bharathidasan University." },
  { question: "Which are the top arts and science colleges in Tamil Nadu?", answer: "Loyola College (Chennai), PSG College of Arts & Science (Coimbatore), The American College (Madurai), and Presidency College (Chennai) are among the top-ranked institutions." },
];

export const metadata: Metadata = {
  title: "Best Arts and Science Colleges in Tamil Nadu 2025 — Rankings & Fees | EduMadras",
  description: "Top arts and science colleges in Tamil Nadu — government, aided & private. Compare courses, fees, rankings & campus facilities. Free admission counseling.",
  keywords: "best arts and science colleges in tamilnadu, arts science colleges tamilnadu, top arts science colleges tamilnadu",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Best Arts & Science Colleges in Tamil Nadu 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Arts & Science", state: "Tamil Nadu" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Arts and Science Colleges in Tamil Nadu" h1={H1} subtitle="Complete guide to arts and science colleges across Tamil Nadu with courses, fees & admission details." introText="Tamil Nadu has a robust arts and science education ecosystem with over 700 colleges affiliated to various state universities. From iconic institutions like Loyola College and The American College to government colleges in every district, the state offers diverse options for undergraduate and postgraduate studies in sciences, humanities, and commerce. This comprehensive directory covers verified information for the 2026 admission cycle." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Tamil Nadu" />
    </>
  );
}
