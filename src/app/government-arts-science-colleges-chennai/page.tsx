import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/government-arts-science-colleges-chennai";
const H1 = "Government Arts & Science Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Govt. A&S Colleges", href: "/government-arts-science-colleges-chennai" }];
const FAQ_ITEMS = [{ question: "Which are the best government arts and science colleges in Chennai?", answer: "Presidency College, Queen Mary's College, Pachaiyappa's College, and Nandanam Government Arts College are among the top government institutions in Chennai." }, { question: "What are the fees for government arts colleges in Chennai?", answer: "Government arts and science college fees range from ₹500–₹5,000 per year, making them the most affordable higher education option." }];

export const metadata: Metadata = {
  title: "Government Arts and Science Colleges in Chennai 2025 | EduMadras",
  description: "Complete list of government arts and science colleges in Chennai with courses, fees & admission details.",
  keywords: "government arts and science colleges in chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Government Arts and Science Colleges in Chennai 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Arts & Science", city: "Chennai", type: "Government" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Government Arts and Science Colleges in Chennai 2025" h1={H1} subtitle="Complete list of government arts and science colleges in Chennai with courses, fees & admission details." introText="Chennai's government arts and science colleges offer world-class education at minimal fees. Institutions like Presidency College, Queen Mary's College, and Pachaiyappa's College provide affordable UG and PG programs in sciences, humanities, and commerce with strong academic traditions." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Government" />
    </>
  );
}
