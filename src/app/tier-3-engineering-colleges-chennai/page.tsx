import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/tier-3-engineering-colleges-chennai";
const H1 = "Tier 3 Engineering Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Tier 3", href: "/tier-3-engineering-colleges-chennai" }];
const FAQ_ITEMS = [{ question: "Are Tier 3 colleges worth it?", answer: "Yes, if you choose the right branch (CSE/IT) and actively participate in skill development. Many Tier 3 college CSE graduates earn ₹4-6 LPA." }, { question: "How to succeed in a Tier 3 college?", answer: "Focus on coding skills, certifications, internships, and competitive programming. Your skills matter more than your college tier in the IT industry." }];

export const metadata: Metadata = {
  title: "Tier 3 Engineering Colleges in Chennai 2025 | EduMadras",
  description: "Tier 3 engineering colleges in Chennai — fees, placements & admission process.",
  keywords: "tier 3 engineering colleges in chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Tier 3 Engineering Colleges in Chennai 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Tier 3 Engineering Colleges in Chennai 2025" h1={H1} subtitle="Tier 3 engineering colleges in Chennai — fees, placements & admission process." introText="Tier 3 engineering colleges in Chennai offer affordable education with decent placement support. While they may not have top NIRF rankings, many provide practical training, industry connections, and placement assistance that deliver good career outcomes for students." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Tier 3" />
    </>
  );
}
