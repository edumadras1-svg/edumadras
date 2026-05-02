import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/government-engineering-colleges-tamilnadu";
const H1 = "Government Engineering Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "Govt. Engg TN", href: "/government-engineering-colleges-tamilnadu" }];
const FAQ_ITEMS = [{ question: "How many government engineering colleges are in TN?", answer: "Tamil Nadu has approximately 20+ government and government-aided engineering colleges including Anna University campuses and regional institutions." }, { question: "What are the fees in TN government engineering colleges?", answer: "Government engineering college fees range from ₹25,000-50,000/year — significantly lower than private colleges." }];

export const metadata: Metadata = {
  title: "Government Engineering Colleges in Tamil Nadu 2025 | EduMadras",
  description: "Complete list of government engineering colleges in Tamil Nadu. Low fees, TNEA cutoffs & placements.",
  keywords: "government engineering colleges in tamilnadu",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Government Engineering Colleges in Tamil Nadu 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", state: "Tamil Nadu", type: "Government" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Government Engineering Colleges in Tamil Nadu 2025" h1={H1} subtitle="Complete list of government engineering colleges in Tamil Nadu. Low fees, TNEA cutoffs & placements." introText="Tamil Nadu's government engineering colleges offer excellent education at highly subsidized fees. From Anna University campuses to district-level government colleges, these institutions provide quality technical education accessible to all students through TNEA counseling." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Government" />
    </>
  );
}
