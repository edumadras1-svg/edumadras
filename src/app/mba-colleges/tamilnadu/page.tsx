import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/mba-colleges/tamilnadu";
const H1 = "MBA Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "MBA Colleges TN", href: "/mba-colleges/tamilnadu" }];
const FAQ_ITEMS = [{ question: "Which are the best MBA colleges in Tamil Nadu?", answer: "IIM Trichy, Great Lakes (Chennai), LIBA (Chennai), Anna University DoMS, and PSG IM (Coimbatore) are top MBA institutions." }, { question: "What is the average MBA package in TN?", answer: "Top B-schools: ₹12-20 LPA. Mid-tier colleges: ₹5-10 LPA. Average across all colleges: ₹4-8 LPA." }];

export const metadata: Metadata = {
  title: "MBA Colleges in Tamil Nadu 2025 — Fees, Rankings & Placements | EduMadras",
  description: "Complete list of MBA colleges in Tamil Nadu with fees, rankings, entrance exams & placement data.",
  keywords: "mba colleges in tamilnadu",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "MBA Colleges in Tamil Nadu 2025 — Fees, Rankings & Placements | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Management", state: "Tamil Nadu" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="MBA Colleges in Tamil Nadu 2025 — Fees, Rankings & Placements" h1={H1} subtitle="Complete list of MBA colleges in Tamil Nadu with fees, rankings, entrance exams & placement data." introText="Tamil Nadu is a growing hub for management education with top B-schools like IIM Trichy, Great Lakes, LIBA, and Anna University Department of Management Studies. This guide covers all MBA/PGDM colleges across the state." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="" />
    </>
  );
}
