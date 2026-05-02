import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/top-10-engineering-colleges-tamilnadu";
const H1 = "Top 10 Engineering Colleges in Tamil Nadu 2025 — Rank Wise";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/tamilnadu" }, { label: "Top 10 TN", href: "/top-10-engineering-colleges-tamilnadu" }];
const FAQ_ITEMS = [{ question: "What are the top 10 engineering colleges in Tamil Nadu?", answer: "IIT Madras, NIT Trichy, Anna University CEG, PSG Tech (Coimbatore), SSN College (Chennai), Thiagarajar College (Madurai), and other NIRF-ranked institutions form the top 10." }, { question: "Which TN engineering college has the highest placement package?", answer: "IIT Madras holds the highest placement record with packages exceeding ₹1 Cr. NIT Trichy and PSG Tech also have strong placement records with ₹15-30 LPA highest packages." }];

export const metadata: Metadata = {
  title: "Top 10 Engineering Colleges in Tamil Nadu 2025 — Rank Wise | EduMadras",
  description: "Top 10 engineering colleges in Tamil Nadu ranked by NIRF 2025. Compare fees, placements, TNEA cutoffs & courses. Free admission counseling on EduMadras.",
  keywords: "top 10 engineering colleges in tamilnadu, best 10 engineering colleges tamilnadu, top engineering colleges tamilnadu rank wise",
  alternates: { canonical: "https://edumadras.com/top-10-engineering-colleges-tamilnadu" },
  openGraph: { title: "Top 10 Engineering Colleges in Tamil Nadu 2025 | EduMadras", url: "https://edumadras.com/top-10-engineering-colleges-tamilnadu", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", state: "Tamil Nadu", limit: 10 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top 10 Engineering Colleges in Tamil Nadu" h1={H1} subtitle="The definitive list of Tamil Nadu's 10 best engineering institutions based on NIRF rankings, placements & research." introText="Tamil Nadu's engineering education is among the best in India. This curated list of the top 10 engineering colleges in Tamil Nadu includes IIT Madras, NIT Trichy, PSG Tech, and other elite institutions that consistently deliver outstanding academic and placement outcomes. Each college is ranked based on NIRF scores, placement statistics, and overall academic excellence." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://edumadras.com/top-10-engineering-colleges-tamilnadu" filterLabel="Top 10" />
    </>
  );
}
