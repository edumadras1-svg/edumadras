import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/top-10-eamcet-engineering-colleges-ap";
const H1 = "Top 10 EAMCET Engineering Colleges in Andhra Pradesh — Placements & Cutoffs";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/best-engineering-colleges-andhra-pradesh" }, { label: "Top 10 EAMCET", href: "/top-10-eamcet-engineering-colleges-ap" }];
const FAQ_ITEMS = [
  { question: "Which is the top-ranked EAMCET college in Andhra Pradesh?", answer: "Andhra University College of Engineering (AUCE - Visakhapatnam) is consistently ranked as the top EAMCET participating institution. It is followed closely by JNTU Kakinada and JNTU Anantapur campus colleges." },
  { question: "What is the EAMCET cutoff for the top 10 colleges in AP?", answer: "To secure a CSE seat in the top 5 EAMCET colleges (like Andhra University or JNTUK), EAMCET ranks should generally be under 3,000. In other top 10 colleges, cutoff ranks for general categories range from 5,000 to 12,000." },
  { question: "Are placements good at the top 10 EAMCET participating colleges?", answer: "Yes, the top 10 EAMCET colleges offer the strongest placement records in the state. Graduates bag average packages of ₹5.5 LPA to ₹10+ LPA, with core MNCs and tech product companies actively visiting these campuses." },
];

export const metadata: Metadata = {
  title: "Top 10 EAMCET Engineering Colleges in Andhra Pradesh 2025 | EduMadras",
  description: "Ranked list of the top 10 EAMCET participating engineering colleges in Andhra Pradesh (AP) 2025. Compare packages, tuition fees & EAMCET rank cutoffs.",
  keywords: "top 10 eamcet engineering colleges in ap, best eamcet colleges andhra pradesh, top 10 colleges ap eamcet, eamcet participating colleges ranking",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Top 10 EAMCET Engineering Colleges AP 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", state: "Andhra Pradesh", limit: 10 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top 10 EAMCET Colleges in AP" h1={H1} subtitle="The 10 absolute best engineering colleges in AP participating in EAMCET state counseling — ranked by placements, cutoffs, and ROI." introText="Andhra Pradesh EAMCET (EAPCET) counseling is highly competitive. This guide outlines the top 10 EAMCET-participating engineering colleges in AP, complete with verified data on EAMCET ranks, placement averages, and fee structures from Andhra University, JNTU, VRSEC, and more." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Top 10 EAMCET" />
    </>
  );
}
