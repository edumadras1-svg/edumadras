import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/top-arts-science-colleges-tamilnadu";
const H1 = "Top Arts and Science Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "Top A&S TN", href: "/top-arts-science-colleges-tamilnadu" }];
const FAQ_ITEMS = [{ question: "Which is the best arts college in Tamil Nadu?", answer: "Loyola College (Chennai) is consistently ranked #1. PSG CAS (Coimbatore) and The American College (Madurai) are also top-tier." }, { question: "What are the fees in TN arts colleges?", answer: "Government: ₹500-5K/year. Aided: ₹5K-25K/year. Self-financing: ₹20K-1L/year." }];

export const metadata: Metadata = {
  title: "Top Arts and Science Colleges in Tamil Nadu 2025 | EduMadras",
  description: "Best arts and science colleges in Tamil Nadu with rankings, courses, fees & admissions.",
  keywords: "top arts and science colleges in tamilnadu",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Top Arts and Science Colleges in Tamil Nadu 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Arts & Science", state: "Tamil Nadu" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top Arts and Science Colleges in Tamil Nadu 2025" h1={H1} subtitle="Best arts and science colleges in Tamil Nadu with rankings, courses, fees & admissions." introText="Tamil Nadu's arts and science colleges span a rich spectrum from iconic government institutions to top private colleges. This comprehensive directory covers every notable institution across the state." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="" />
    </>
  );
}
