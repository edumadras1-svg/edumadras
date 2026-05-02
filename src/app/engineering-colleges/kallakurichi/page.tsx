import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/engineering-colleges/kallakurichi";
const H1 = "Top Engineering Colleges for Kallakurichi Students 2025";
const BREADCRUMBS = [{ label: "Kallakurichi", href: "/engineering-colleges/kallakurichi" }];
const FAQ_ITEMS = [{ question: "Why do Kallakurichi students prefer Chennai engineering colleges?", answer: "Chennai offers proximity to major IT parks (Tidel Park, SIPCOT), significantly higher average placement packages (₹5-12 LPA), and superior industry exposure compared to local district colleges." }, { question: "Which are the best engineering colleges near Kallakurichi?", answer: "Top institutions like Saveetha, SRM, and SSN are highly preferred by Kallakurichi students for their excellent hostel facilities and safe campus environments." }];

export const metadata: Metadata = {
  title: "Engineering Colleges in Kallakurichi 2025 — Admissions & Fees | EduMadras",
  description: "Looking for engineering colleges in Kallakurichi? Explore top recommended engineering colleges for Kallakurichi students with better placements and IT exposure.",
  keywords: "engineering colleges in kallakurichi, best engineering colleges in kallakurichi",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Engineering Colleges in Kallakurichi 2025 — Admissions & Fees | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  // Notice we do NOT filter by city="Kallakurichi" so we show our top colleges.
  // We filter by stream if provided to show relevant premium colleges.
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", limit: 20 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing 
        colleges={colleges} 
        title="Engineering Colleges in Kallakurichi 2025 — Admissions & Fees" 
        h1={H1} 
        subtitle="Looking for engineering colleges in Kallakurichi? Explore top recommended engineering colleges for Kallakurichi students with better placements and IT exposure." 
        introText="While Kallakurichi offers local engineering options like AKT Engineering College, thousands of ambitious students from the district move to Chennai and surrounding educational hubs every year. These top-tier institutions offer superior IT placements, world-class infrastructure, and global exposure. Explore the best recommended engineering colleges for Kallakurichi students below." 
        breadcrumbs={BREADCRUMBS} 
        faqItems={FAQ_ITEMS} 
        pageUrl={PAGE_URL} 
        filterLabel="Recommended for Kallakurichi" 
      />
    </>
  );
}
