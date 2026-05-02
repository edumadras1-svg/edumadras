import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/colleges-in-kallakurichi";
const H1 = "Top Colleges in Kallakurichi & Premium Alternatives";
const BREADCRUMBS = [{ label: "Kallakurichi Colleges", href: "/colleges-in-kallakurichi" }];
const FAQ_ITEMS = [{ question: "Which is the best college in Kallakurichi?", answer: "Government Medical College and AKT Engineering College are the most prominent local institutions in Kallakurichi district." }, { question: "Why should Kallakurichi students consider studying outside the district?", answer: "Studying in established educational hubs like Chennai provides exposure to multinational companies, diverse peer groups, better internships, and significantly higher starting salaries." }];

export const metadata: Metadata = {
  title: "Colleges in Kallakurichi 2025 — Top Degree & Engineering Colleges | EduMadras",
  description: "Comprehensive guide to colleges in Kallakurichi. Discover the best local institutions and top premium alternatives for Kallakurichi students.",
  keywords: "colleges in kallakurichi, best colleges in kallakurichi",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Colleges in Kallakurichi 2025 — Top Degree & Engineering Colleges | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  // Notice we do NOT filter by city="Kallakurichi" so we show our top colleges.
  // We filter by stream if provided to show relevant premium colleges.
  const colleges = await fetchCollegesByFilter({ limit: 20 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing 
        colleges={colleges} 
        title="Colleges in Kallakurichi 2025 — Top Degree & Engineering Colleges" 
        h1={H1} 
        subtitle="Comprehensive guide to colleges in Kallakurichi. Discover the best local institutions and top premium alternatives for Kallakurichi students." 
        introText="Finding the right college in Kallakurichi can be challenging as a newly formed district. While local institutions like Govt Medical College and AKT Engineering are growing, the best career opportunities often lie in established educational hubs. We've curated a list of premium colleges that offer the highest ROI and actively recruit students from Kallakurichi." 
        breadcrumbs={BREADCRUMBS} 
        faqItems={FAQ_ITEMS} 
        pageUrl={PAGE_URL} 
        filterLabel="Premium Options" 
      />
    </>
  );
}
