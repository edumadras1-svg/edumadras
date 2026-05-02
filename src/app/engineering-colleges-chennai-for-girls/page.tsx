import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/engineering-colleges-chennai-for-girls";
const H1 = "Best Engineering Colleges in Chennai for Girls 2025";
const BREADCRUMBS = [{ label: "For Girls", href: "/engineering-colleges-chennai-for-girls" }];
const FAQ_ITEMS = [{ question: "Which Chennai engineering college is best for girls?", answer: "SSN College, SRM, Rajalakshmi, and Anna University CEG are known for excellent safety, hostel facilities, and support systems for women students." }, { question: "Are there women-only engineering colleges in Chennai?", answer: "While most engineering colleges are co-educational, some colleges have dedicated women's hostels with enhanced security and mentoring programs." }];

export const metadata: Metadata = {
  title: "Best Engineering Colleges in Chennai for Girls 2025 | EduMadras",
  description: "Top engineering colleges in Chennai for women students. Safe campus, hostels & placement support.",
  keywords: "best engineering colleges in chennai for girls",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Best Engineering Colleges in Chennai for Girls 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Best Engineering Colleges in Chennai for Girls 2025" h1={H1} subtitle="Top engineering colleges in Chennai for women students. Safe campus, hostels & placement support." introText="Chennai offers several engineering colleges with excellent facilities for women students including dedicated hostels, safe campuses, women empowerment cells, and strong placement support. This guide highlights colleges with the best track record for female students." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="For Girls" />
    </>
  );
}
