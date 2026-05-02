import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/top-10-engineering-colleges-chennai";
const H1 = "Top 10 Engineering Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "Top 10 Chennai", href: "/top-10-engineering-colleges-chennai" }];
const FAQ_ITEMS = [{ question: "What are the top 10 engineering colleges in Chennai?", answer: "The top 10 include IIT Madras, Anna University CEG, SSN College of Engineering, SRM Institute, Sairam Engineering College, and other NIRF-ranked institutions. See the complete list above." }, { question: "Which Chennai engineering college has the best placement?", answer: "IIT Madras leads with ₹20+ LPA average package. SSN College and Anna University CEG also have excellent placement records with ₹8-15 LPA average packages." }];

export const metadata: Metadata = {
  title: "Top 10 Engineering Colleges in Chennai 2025 — Rank Wise | EduMadras",
  description: "Top 10 engineering colleges in Chennai ranked by NIRF, placements & fees. Compare IIT Madras, Anna University CEG, SSN, SRM & more. Free admission counseling.",
  keywords: "top 10 engineering colleges in chennai, top 10 engg colleges chennai, best 10 engineering colleges chennai",
  alternates: { canonical: "https://edumadras.com/top-10-engineering-colleges-chennai" },
  openGraph: { title: "Top 10 Engineering Colleges in Chennai 2025 | EduMadras", url: "https://edumadras.com/top-10-engineering-colleges-chennai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", limit: 10 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top 10 Engineering Colleges in Chennai" h1={H1} subtitle="The definitive rank-wise list of Chennai's 10 best engineering colleges based on NIRF, placements & academic excellence." introText="Choosing the right engineering college in Chennai can shape your entire career. This curated list of the top 10 engineering colleges in Chennai is based on NIRF rankings, placement records, faculty quality, and industry connections. From the world-renowned IIT Madras to emerging institutions with excellent ROI, these are the colleges that consistently produce top engineering talent." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://edumadras.com/top-10-engineering-colleges-chennai" filterLabel="Top 10" />
    </>
  );
}
