import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/private-medical-colleges-chennai-fees";
const H1 = "Private Medical Colleges in Chennai — Complete Fee Structure 2025";
const BREADCRUMBS = [{ label: "Private Medical Fees", href: "/private-medical-colleges-chennai-fees" }];
const FAQ_ITEMS = [{ question: "What is the MBBS fee in private medical colleges in Chennai?", answer: "Private MBBS fees range from ₹10-25 lakhs/year depending on the institution. Total course cost: ₹50 lakhs to ₹1.5 crores." }, { question: "Are there scholarships for private medical colleges?", answer: "Yes, many private colleges offer merit scholarships for high NEET scorers. Some offer up to 50-100% fee waivers for top rankers." }];

export const metadata: Metadata = {
  title: "Private Medical Colleges in Chennai with Fees 2025 | EduMadras",
  description: "List of private medical colleges in Chennai with detailed MBBS fee structure, NEET cutoffs & admissions.",
  keywords: "list of private medical colleges with fees, private medical colleges chennai fees",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Private Medical Colleges in Chennai with Fees 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Medical", city: "Chennai", type: "Private" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Private Medical Colleges in Chennai with Fees 2025" h1={H1} subtitle="List of private medical colleges in Chennai with detailed MBBS fee structure, NEET cutoffs & admissions." introText="Understanding the fee structure of private medical colleges in Chennai is crucial for financial planning. This guide provides verified, detailed MBBS fee breakdowns for every private medical institution in Chennai, including tuition, hostel, and other charges." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Private" />
    </>
  );
}
