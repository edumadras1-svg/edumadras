import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/nursing-colleges-tamilnadu";
const H1 = "Nursing Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "Nursing TN", href: "/nursing-colleges-tamilnadu" }];
const FAQ_ITEMS = [{ question: "How many nursing colleges are in Tamil Nadu?", answer: "Tamil Nadu has over 200 nursing colleges including government and private institutions across all districts." }, { question: "What is B.Sc Nursing fee in TN?", answer: "Government: ₹10-20K/year. Private: ₹50K-2L/year. Admission based on +2 marks in science stream." }];

export const metadata: Metadata = {
  title: "Nursing Colleges in Tamil Nadu 2025 | EduMadras",
  description: "Complete list of nursing colleges in Tamil Nadu with B.Sc Nursing fees, eligibility & admissions.",
  keywords: "nursing colleges in tamilnadu",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Nursing Colleges in Tamil Nadu 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Nursing", state: "Tamil Nadu" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Nursing Colleges in Tamil Nadu 2025" h1={H1} subtitle="Complete list of nursing colleges in Tamil Nadu with B.Sc Nursing fees, eligibility & admissions." introText="Tamil Nadu is a major hub for nursing education with colleges affiliated to The Tamil Nadu Dr. MGR Medical University. The state offers B.Sc Nursing, GNM, and ANM programs across government and private institutions with strong hospital affiliations." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="" />
    </>
  );
}
