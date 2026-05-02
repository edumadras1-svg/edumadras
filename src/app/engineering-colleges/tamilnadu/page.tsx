import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/engineering-colleges/tamilnadu";
const H1 = "Best Engineering Colleges in Tamil Nadu 2025 — Rank Wise";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/tamilnadu" }, { label: "Tamil Nadu", href: "/engineering-colleges/tamilnadu" }];
const FAQ_ITEMS = [
  { question: "Which is the best engineering college in Tamil Nadu?", answer: "IIT Madras is the #1 ranked engineering college in Tamil Nadu and India. NIT Trichy, Anna University CEG, PSG Tech, and SSN College are also top-tier institutions." },
  { question: "How many engineering colleges are there in Tamil Nadu?", answer: "Tamil Nadu has over 500 engineering colleges affiliated to Anna University, including government, government-aided, and self-financing institutions across all districts." },
  { question: "What is TNEA counseling for Tamil Nadu engineering admissions?", answer: "TNEA (Tamil Nadu Engineering Admissions) is the state-level counseling process for admission to B.E./B.Tech courses based on +2 marks. It is conducted online by Anna University every year." },
  { question: "What is the average placement package in Tamil Nadu engineering colleges?", answer: "Top colleges like IIT Madras offer ₹20+ LPA average. Tier-1 private colleges average ₹6–12 LPA. Government colleges average ₹4–8 LPA depending on the branch and location." },
];

export const metadata: Metadata = {
  title: "Best Engineering Colleges in Tamil Nadu 2025 — Rankings, Fees & Placements | EduMadras",
  description: "Explore the best engineering colleges in Tamil Nadu rank-wise. Compare NIRF rankings, Anna University affiliation, TNEA cutoffs, fees & placement records. Free admission counseling.",
  keywords: "best engineering colleges in tamilnadu, top engineering colleges in tamilnadu, engineering colleges tamilnadu rank wise, anna university affiliated colleges",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Best Engineering Colleges in Tamil Nadu 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", state: "Tamil Nadu" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Best Engineering Colleges in Tamil Nadu" h1={H1} subtitle="Complete rank-wise list of top engineering colleges in Tamil Nadu with TNEA cutoffs, fees & placement data." introText="Tamil Nadu is home to over 500 engineering colleges, including world-class institutions like IIT Madras, NIT Trichy, and Anna University. The state's engineering education ecosystem is anchored by the TNEA counseling process for admissions. Whether you're targeting government colleges with TNEA cutoffs below 150 or top private institutions with global placements, this guide covers every NIRF-ranked and AICTE-approved engineering college in Tamil Nadu with verified data for the 2026 admission cycle." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Tamil Nadu" />
    </>
  );
}
