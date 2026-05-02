import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/top-50-engineering-colleges-tamilnadu-rank-wise";
const H1 = "Top 50 Engineering Colleges in Tamil Nadu — Rank Wise 2025";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/tamilnadu" }, { label: "Rank Wise", href: "/top-50-engineering-colleges-tamilnadu-rank-wise" }];
const FAQ_ITEMS = [{ question: "How are engineering colleges ranked in Tamil Nadu?", answer: "Engineering colleges in Tamil Nadu are ranked by NIRF based on Teaching, Research, Graduation Outcomes, Outreach, and Perception. TNEA counseling also has its own ranking based on cutoff scores." }, { question: "What rank college should I target for TNEA?", answer: "Top 20 colleges offer the best ROI. However, Tier-2 colleges (rank 20-50) often have good placements in specific branches like CSE and IT at much lower cutoffs." }];

export const metadata: Metadata = {
  title: "Top 50 Engineering Colleges in Tamil Nadu Rank Wise 2025 | EduMadras",
  description: "Top 50 engineering colleges in Tamil Nadu ranked by NIRF 2025. Complete rank-wise list with fees, TNEA cutoffs, placements. Free counseling.",
  keywords: "top 50 engineering colleges in tamilnadu rank wise, engineering colleges tamilnadu rank wise, nirf ranking engineering colleges tamilnadu",
  alternates: { canonical: "https://edumadras.com/top-50-engineering-colleges-tamilnadu-rank-wise" },
  openGraph: { title: "Top 50 Engineering Colleges TN Rank Wise 2025 | EduMadras", url: "https://edumadras.com/top-50-engineering-colleges-tamilnadu-rank-wise", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", state: "Tamil Nadu", limit: 50 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top 50 Engineering Colleges TN Rank Wise" h1={H1} subtitle="NIRF rank-wise list of Tamil Nadu's top 50 engineering colleges with detailed comparison data." introText="This rank-wise directory of 50 engineering colleges in Tamil Nadu is sorted by NIRF rankings, making it easy to compare institutions at every level. Whether you're targeting Tier-1 colleges like IIT Madras and NIT Trichy or solid Tier-2 institutions with excellent ROI, this comprehensive ranking helps you understand exactly where each college stands in Tamil Nadu's engineering education landscape." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://edumadras.com/top-50-engineering-colleges-tamilnadu-rank-wise" filterLabel="Rank Wise" />
    </>
  );
}
