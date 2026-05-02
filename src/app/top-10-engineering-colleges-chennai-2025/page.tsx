import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/top-10-engineering-colleges-chennai-2025";
const H1 = "Top 10 Engineering Colleges in Chennai 2025 — Updated Rankings";
const BREADCRUMBS = [{ label: "2025 Rankings", href: "/top-10-engineering-colleges-chennai-2025" }];
const FAQ_ITEMS = [{ question: "Has the 2025 ranking changed from 2024?", answer: "Rankings may shift slightly year-to-year based on updated NIRF scores, but the top institutions (IIT Madras, CEG, SSN) consistently hold top positions." }, { question: "When are the 2025 NIRF rankings released?", answer: "NIRF rankings are typically released in June-July by the Ministry of Education. This page will be updated accordingly." }];

export const metadata: Metadata = {
  title: "Top 10 Engineering Colleges in Chennai 2025 — Latest Rankings | EduMadras",
  description: "Latest 2025 rankings of top 10 engineering colleges in Chennai. Updated NIRF data, fees & placements.",
  keywords: "top 10 engineering colleges in chennai 2024, top 10 engineering colleges chennai 2025",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Top 10 Engineering Colleges in Chennai 2025 — Latest Rankings | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", limit: 10 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top 10 Engineering Colleges in Chennai 2025 — Latest Rankings" h1={H1} subtitle="Latest 2025 rankings of top 10 engineering colleges in Chennai. Updated NIRF data, fees & placements." introText="This is the latest 2025 edition of the top 10 engineering colleges in Chennai, updated with the most recent NIRF rankings, placement data, and fee structures. Compare colleges using the most current verified information available." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="2025" />
    </>
  );
}
