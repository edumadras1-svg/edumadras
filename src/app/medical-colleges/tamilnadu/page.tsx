import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/medical-colleges/tamilnadu";
const H1 = "Medical Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "Medical TN", href: "/medical-colleges/tamilnadu" }];
const FAQ_ITEMS = [{ question: "How many medical colleges are in Tamil Nadu?", answer: "Tamil Nadu has approximately 50+ medical colleges including government, private, and deemed university institutions across all districts." }, { question: "What is the MBBS admission process in TN?", answer: "Admission is through state counseling based on NEET scores conducted by the TN Medical Admissions Committee." }];

export const metadata: Metadata = {
  title: "Medical Colleges in Tamil Nadu 2025 — Complete List | EduMadras",
  description: "All medical colleges in Tamil Nadu — government & private. NEET cutoffs, MBBS fees & admissions.",
  keywords: "medical colleges in tamilnadu",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Medical Colleges in Tamil Nadu 2025 — Complete List | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Medical", state: "Tamil Nadu" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Medical Colleges in Tamil Nadu 2025 — Complete List" h1={H1} subtitle="All medical colleges in Tamil Nadu — government & private. NEET cutoffs, MBBS fees & admissions." introText="Tamil Nadu has one of India's strongest medical education ecosystems with over 50 medical colleges across government and private sectors. This comprehensive guide covers every medical institution in the state." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="" />
    </>
  );
}
