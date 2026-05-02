import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/tier-1-engineering-colleges-chennai";
const H1 = "Tier 1 Engineering Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Tier 1", href: "/tier-1-engineering-colleges-chennai" }];
const FAQ_ITEMS = [{ question: "What makes a college Tier 1?", answer: "Tier 1 colleges have NIRF rankings in the top 100, average placement packages above ₹10 LPA, strong research output, and NAAC A+ accreditation." }, { question: "Which Chennai colleges are Tier 1?", answer: "IIT Madras, Anna University CEG, SSN College, and SRM (main campus) are widely considered Tier 1 engineering colleges in Chennai." }];

export const metadata: Metadata = {
  title: "Tier 1 Engineering Colleges in Chennai 2025 | EduMadras",
  description: "List of Tier 1 engineering colleges in Chennai with NIRF rankings, placements & fees.",
  keywords: "tier 1 engineering colleges in chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Tier 1 Engineering Colleges in Chennai 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", limit: 10 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Tier 1 Engineering Colleges in Chennai 2025" h1={H1} subtitle="List of Tier 1 engineering colleges in Chennai with NIRF rankings, placements & fees." introText="Tier 1 engineering colleges in Chennai represent the absolute elite — institutions with NIRF rankings, ₹10+ LPA average packages, and global recruiter presence. This curated list identifies the true Tier 1 colleges based on objective metrics." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Tier 1" />
    </>
  );
}
