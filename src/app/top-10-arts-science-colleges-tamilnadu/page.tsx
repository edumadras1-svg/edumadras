import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/top-10-arts-science-colleges-tamilnadu";
const H1 = "Top 10 Arts and Science Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "Top 10 A&S TN", href: "/top-10-arts-science-colleges-tamilnadu" }];
const FAQ_ITEMS = [{ question: "What are the top 10 arts colleges in Tamil Nadu?", answer: "Loyola College, PSG CAS (Coimbatore), The American College (Madurai), Presidency College, Stella Maris, and others form the top 10." }, { question: "Which university affiliation is best for arts colleges in TN?", answer: "Madras University, Bharathiar University (Coimbatore), and Bharathidasan University (Trichy) are the top affiliating universities." }];

export const metadata: Metadata = {
  title: "Top 10 Arts and Science Colleges in Tamil Nadu 2025 | EduMadras",
  description: "Top 10 arts and science colleges in Tamil Nadu ranked by NAAC accreditation & academics.",
  keywords: "top 10 arts and science colleges in tamilnadu",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Top 10 Arts and Science Colleges in Tamil Nadu 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Arts & Science", state: "Tamil Nadu", limit: 10 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top 10 Arts and Science Colleges in Tamil Nadu 2025" h1={H1} subtitle="Top 10 arts and science colleges in Tamil Nadu ranked by NAAC accreditation & academics." introText="This definitive ranking of the top 10 arts and science colleges across Tamil Nadu covers institutions from Chennai, Coimbatore, Madurai, and beyond — ranked by NAAC scores, faculty quality, and student outcomes." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Top 10" />
    </>
  );
}
