import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/government-pharmacy-colleges-tamilnadu";
const H1 = "Government Pharmacy Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "Govt Pharmacy TN", href: "/government-pharmacy-colleges-tamilnadu" }];
const FAQ_ITEMS = [{ question: "Which government pharmacy colleges are in TN?", answer: "Madras Medical College (Pharmacy), Govt. College of Pharmacy (Ramanathapuram), and other district-level government pharmacy institutions." }, { question: "What is the fee for government pharmacy colleges?", answer: "Government pharmacy college fees are approximately ₹5,000-15,000 per year — highly affordable compared to private institutions." }];

export const metadata: Metadata = {
  title: "Government Pharmacy Colleges in Tamil Nadu 2025 | EduMadras",
  description: "Government pharmacy colleges in Tamil Nadu with B.Pharm/D.Pharm fees, eligibility & admissions.",
  keywords: "pharmacy colleges in tamilnadu government",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Government Pharmacy Colleges in Tamil Nadu 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Pharmacy", state: "Tamil Nadu", type: "Government" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Government Pharmacy Colleges in Tamil Nadu 2025" h1={H1} subtitle="Government pharmacy colleges in Tamil Nadu with B.Pharm/D.Pharm fees, eligibility & admissions." introText="Tamil Nadu's government pharmacy colleges offer affordable B.Pharm and D.Pharm programs with excellent clinical training and industry exposure. These colleges are affiliated to The Tamil Nadu Dr. MGR Medical University." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Government" />
    </>
  );
}
