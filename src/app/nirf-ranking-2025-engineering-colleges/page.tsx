import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/nirf-ranking-2025-engineering-colleges";
const H1 = "NIRF Ranking 2025 — Top Engineering Colleges in India";
const BREADCRUMBS = [{ label: "NIRF Rankings", href: "/nirf-ranking-2025-engineering-colleges" }];
const FAQ_ITEMS = [
  { question: "What is the NIRF Ranking 2025 for engineering colleges?", answer: "NIRF (National Institutional Ranking Framework) 2025 is the official government ranking of engineering colleges in India based on teaching quality, research output, graduation outcomes, outreach, and perception." },
  { question: "Which engineering college is ranked #1 in NIRF 2025?", answer: "IIT Madras has consistently held the #1 position in NIRF Engineering rankings. Check the complete list above for the latest 2025 rankings." },
  { question: "How are NIRF rankings calculated?", answer: "NIRF uses 5 parameters: Teaching, Learning & Resources (30%), Research & Professional Practice (30%), Graduation Outcomes (20%), Outreach & Inclusivity (10%), and Perception (10%)." },
  { question: "Should I choose a college based only on NIRF ranking?", answer: "While NIRF is an important indicator, also consider placement records, fees, location, campus infrastructure, and the specific branch you want to study. Contact our free counselors for personalized guidance." },
];

export const metadata: Metadata = {
  title: "NIRF Ranking 2025 Engineering Colleges — Complete List | EduMadras",
  description: "Official NIRF Ranking 2025 for Engineering Colleges in India. Compare top-ranked institutions by placement, fees, research output & faculty quality. Get free admission counseling on EduMadras.",
  keywords: "nirf ranking 2025 engineering colleges, nirf ranking 2024 engineering colleges, nirf engineering ranking, best engineering colleges india nirf, top engineering colleges nirf ranking",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "NIRF Ranking 2025 Engineering Colleges | EduMadras",
    description: "Complete NIRF 2025 Engineering Rankings — fees, placements, cutoffs for every ranked college.",
    url: PAGE_URL,
    siteName: "EduMadras",
    type: "website",
    locale: "en_IN",
  },
};

export default async function NIRFRankingPage() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", orderBy: "rank" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });

  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing
        colleges={colleges}
        title="NIRF Ranking 2025 Engineering Colleges"
        h1={H1}
        subtitle="Complete NIRF 2025 rankings for engineering institutions. Compare placements, fees, research scores & more."
        introText="The National Institutional Ranking Framework (NIRF) 2025 rankings are the most authoritative benchmark for engineering colleges in India. Published annually by the Ministry of Education, NIRF evaluates institutions on Teaching, Learning & Resources (TLR), Research & Professional Practice (RP), Graduation Outcomes (GO), Outreach & Inclusivity (OI), and Perception. Below is the complete list of NIRF-ranked engineering colleges with detailed placement statistics, fee structures, and admission information to help you make an informed decision."
        breadcrumbs={BREADCRUMBS}
        faqItems={FAQ_ITEMS}
        pageUrl={PAGE_URL}
        filterLabel="NIRF Ranked"
        showRankColumn={true}
        showPlacementColumn={true}
      />
    </>
  );
}
