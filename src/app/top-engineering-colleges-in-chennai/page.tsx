import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/top-engineering-colleges-in-chennai";
const H1 = "Top Engineering Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Top Engineering Colleges", href: "/top-engineering-colleges-in-chennai" }, { label: "Chennai", href: "/top-engineering-colleges-in-chennai" }];
const FAQ_ITEMS = [{ question: "Which are the top engineering colleges in Chennai for CSE?", answer: "IIT Madras, SSN College, Anna University CEG, and SRM are the top choices for Computer Science Engineering in Chennai with excellent placement records in IT companies." }, { question: "Are there engineering colleges in Chennai without JEE?", answer: "Yes, most Chennai engineering colleges accept TNEA counseling based on +2 marks. Only IITs, NITs, and some deemed universities require JEE or other entrance exams." }];

export const metadata: Metadata = {
  title: "Top Engineering Colleges in Chennai 2025 — Rankings & Placements | EduMadras",
  description: "Discover top engineering colleges in Chennai. Compare NIRF rankings, placement records, fee structures & admission process. Get free expert counseling.",
  keywords: "top engineering colleges in chennai, top engineering colleges chennai 2025, best engineering institutions chennai",
  alternates: { canonical: "https://edumadras.com/top-engineering-colleges-in-chennai" },
  openGraph: { title: "Top Engineering Colleges in Chennai 2025 | EduMadras", url: "https://edumadras.com/top-engineering-colleges-in-chennai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top Engineering Colleges in Chennai" h1={H1} subtitle="Comprehensive guide to Chennai's finest engineering institutions — ranked by NIRF, placements & academic excellence." introText="Chennai, the engineering education hub of South India, houses some of the country's most prestigious technical institutions. From IIT Madras — India's #1 ranked engineering college — to top private universities like SRM and VIT Chennai, the city offers unmatched opportunities for aspiring engineers. This page provides a complete, data-driven comparison of all top engineering colleges in Chennai to help you make the best choice for your career." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://edumadras.com/top-engineering-colleges-in-chennai" />
    </>
  );
}
