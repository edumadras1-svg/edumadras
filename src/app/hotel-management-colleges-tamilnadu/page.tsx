import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/hotel-management-colleges-tamilnadu";
const H1 = "Hotel Management Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "Hotel Management TN", href: "/hotel-management-colleges-tamilnadu" }];
const FAQ_ITEMS = [{ question: "Which are the best hotel management colleges in TN?", answer: "IHM Chennai, SRM Hotel Management, and Welcomgroup Graduate School of Hotel Administration (Manipal, with TN campus) are top choices." }, { question: "What is the career scope after hotel management?", answer: "Hotels, airlines, cruise ships, event management, food industry. Starting salary: ₹3-6 LPA with rapid growth potential." }];

export const metadata: Metadata = {
  title: "Hotel Management Colleges in Tamil Nadu 2025 | EduMadras",
  description: "Hotel management colleges in Tamil Nadu with courses, fees, placements & admission process.",
  keywords: "hotel management colleges in tamilnadu",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Hotel Management Colleges in Tamil Nadu 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Hotel Management", state: "Tamil Nadu" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Hotel Management Colleges in Tamil Nadu 2025" h1={H1} subtitle="Hotel management colleges in Tamil Nadu with courses, fees, placements & admission process." introText="Tamil Nadu's tourism and hospitality industry creates strong demand for hotel management graduates. Top institutions across Chennai, Ooty, and other cities offer BHM and related programs with excellent industry placements." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="" />
    </>
  );
}
