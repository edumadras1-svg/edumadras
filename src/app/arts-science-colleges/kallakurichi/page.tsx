import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/arts-science-colleges/kallakurichi";
const H1 = "Top Arts & Science Colleges for Kallakurichi Students";
const BREADCRUMBS = [{ label: "Kallakurichi", href: "/arts-science-colleges/kallakurichi" }];
const FAQ_ITEMS = [{ question: "Are there good arts and science colleges near Kallakurichi?", answer: "Yes, while Kallakurichi has local arts colleges, students seeking top-tier MNC placements often choose premier colleges in Chennai, Salem, and Coimbatore." }, { question: "Do these top colleges offer hostel facilities for Kallakurichi students?", answer: "Absolutely. All the top recommended colleges listed here provide safe, secure, and fully equipped hostels specifically designed for out-of-town students." }];

export const metadata: Metadata = {
  title: "Arts and Science Colleges in Kallakurichi 2025 | EduMadras",
  description: "Find the best arts and science colleges in and around Kallakurichi. Compare courses, fees, and placements for top institutions.",
  keywords: "arts and science colleges in kallakurichi, colleges in kallakurichi",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Arts and Science Colleges in Kallakurichi 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  // Notice we do NOT filter by city="Kallakurichi" so we show our top colleges.
  // We filter by stream if provided to show relevant premium colleges.
  const colleges = await fetchCollegesByFilter({ stream: "Arts & Science", limit: 20 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing 
        colleges={colleges} 
        title="Arts and Science Colleges in Kallakurichi 2025" 
        h1={H1} 
        subtitle="Find the best arts and science colleges in and around Kallakurichi. Compare courses, fees, and placements for top institutions." 
        introText="Searching for arts and science colleges in Kallakurichi? While local institutions serve the immediate area, top colleges in major cities offer advanced specialized degrees in Data Science, AI, and Commerce with massive placement drives. Discover the top-ranked arts and science colleges that warmly welcome students from Kallakurichi." 
        breadcrumbs={BREADCRUMBS} 
        faqItems={FAQ_ITEMS} 
        pageUrl={PAGE_URL} 
        filterLabel="Top Choices" 
      />
    </>
  );
}
