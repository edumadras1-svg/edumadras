import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/biomedical-engineering-colleges-tamilnadu";
const H1 = "Biomedical Engineering Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "Biomedical TN", href: "/biomedical-engineering-colleges-tamilnadu" }];
const FAQ_ITEMS = [{ question: "Which TN colleges offer biomedical engineering?", answer: "SSN College, PSG Tech, SRM, Rajalakshmi, and several Anna University-affiliated colleges offer B.E Biomedical Engineering." }, { question: "What is the job scope for BME graduates in Tamil Nadu?", answer: "Chennai's medical device corridor offers strong employment. GE Healthcare, Siemens, Philips, and local medtech companies actively recruit from TN colleges." }];

export const metadata: Metadata = {
  title: "Biomedical Engineering Colleges in Tamil Nadu 2025 | EduMadras",
  description: "Biomedical engineering colleges across Tamil Nadu with fees, placements & course details.",
  keywords: "biomedical engineering colleges in tamilnadu",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Biomedical Engineering Colleges in Tamil Nadu 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", state: "Tamil Nadu" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Biomedical Engineering Colleges in Tamil Nadu 2025" h1={H1} subtitle="Biomedical engineering colleges across Tamil Nadu with fees, placements & course details." introText="Tamil Nadu is a leader in biomedical engineering education with its strong healthcare ecosystem and medical device manufacturing clusters. Colleges across Chennai, Coimbatore, and other cities offer comprehensive BME programs." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Biomedical" />
    </>
  );
}
