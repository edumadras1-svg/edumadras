import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/chemical-engineering-colleges-tamilnadu";
const H1 = "Chemical Engineering Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "Chemical TN", href: "/chemical-engineering-colleges-tamilnadu" }];
const FAQ_ITEMS = [{ question: "Which TN colleges offer chemical engineering?", answer: "ACT Anna University, NIT Trichy, PSG Tech (Coimbatore), and Coimbatore Institute of Technology are top choices for chemical engineering." }, { question: "What are the career options after chemical engineering?", answer: "Petrochemicals, pharmaceuticals, food processing, environmental engineering, and process industries. Average packages: ₹5-10 LPA." }];

export const metadata: Metadata = {
  title: "Chemical Engineering Colleges in Tamil Nadu 2025 | EduMadras",
  description: "Chemical engineering colleges in Tamil Nadu with fees, placements, eligibility & admissions.",
  keywords: "chemical engineering colleges in tamilnadu",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Chemical Engineering Colleges in Tamil Nadu 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", state: "Tamil Nadu" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Chemical Engineering Colleges in Tamil Nadu 2025" h1={H1} subtitle="Chemical engineering colleges in Tamil Nadu with fees, placements, eligibility & admissions." introText="Tamil Nadu's petrochemical, pharmaceutical, and manufacturing industries create strong demand for chemical engineers. Top institutions like ACT (Anna University), NIT Trichy, and PSG Tech offer excellent chemical engineering programs." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Chemical" />
    </>
  );
}
