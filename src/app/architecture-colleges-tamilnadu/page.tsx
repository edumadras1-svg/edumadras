import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/architecture-colleges-tamilnadu";
const H1 = "Architecture Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "Architecture TN", href: "/architecture-colleges-tamilnadu" }];
const FAQ_ITEMS = [{ question: "Which are the best architecture colleges in TN?", answer: "SAP (School of Architecture and Planning) Anna University, Measi Academy, and SRM School of Architecture are top choices." }, { question: "What is the eligibility for B.Arch?", answer: "+2 with Maths and qualifying NATA (National Aptitude Test in Architecture) or JEE Main Paper 2 score." }];

export const metadata: Metadata = {
  title: "Architecture Colleges in Tamil Nadu 2025 | EduMadras",
  description: "Complete list of architecture colleges in Tamil Nadu with fees, entrance exams & placements.",
  keywords: "architecture colleges in tamilnadu",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Architecture Colleges in Tamil Nadu 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Architecture", state: "Tamil Nadu" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Architecture Colleges in Tamil Nadu 2025" h1={H1} subtitle="Complete list of architecture colleges in Tamil Nadu with fees, entrance exams & placements." introText="Tamil Nadu offers excellent architecture education through institutions affiliated to Anna University and other universities. From B.Arch programs at SAP Guindy to private colleges across the state, explore all options for architecture studies." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="" />
    </>
  );
}
