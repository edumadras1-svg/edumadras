import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/top-engineering-colleges-coimbatore";
const H1 = "Top Engineering Colleges in Coimbatore 2025–2026";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/tamilnadu" }, { label: "Coimbatore", href: "/engineering-colleges-coimbatore" }, { label: "Top Colleges", href: "/top-engineering-colleges-coimbatore" }];
const FAQ_ITEMS = [
  { question: "What are the top 10 engineering colleges in Coimbatore?", answer: "Top 10 include PSG College of Technology, Amrita Vishwa Vidyapeetham, Coimbatore Institute of Technology (CIT), Government College of Technology, Sri Krishna College of Engineering, Kumaraguru College of Technology, and Karpagam College of Engineering." },
  { question: "Which Coimbatore engineering college has the best placements?", answer: "PSG College of Technology leads with ₹8-12 LPA average and 95%+ placement rate. Amrita Vishwa Vidyapeetham follows with ₹6-9 LPA average. Kumaraguru and Sri Krishna College also report strong placements above ₹5 LPA average." },
  { question: "What are the entrance exams for Coimbatore engineering colleges?", answer: "TNEA counseling (based on 12th marks) for Anna University-affiliated colleges. Amrita conducts AEEE (Amrita Entrance Examination Engineering). Some colleges also accept JEE Main scores for direct admission." },
  { question: "Is Coimbatore good for engineering studies?", answer: "Absolutely. Coimbatore has a strong engineering ecosystem with top colleges, a growing IT sector (Zoho, Freshworks HQs), lower cost of living than Chennai, and excellent hostel facilities. It is known as the 'Manchester of South India' for its industrial strength." },
];

export const metadata: Metadata = {
  title: "Top Engineering Colleges in Coimbatore 2025 — Rankings & Placements | EduMadras",
  description: "Top engineering colleges in Coimbatore 2025 ranked by NIRF, placements & fees. PSG Tech, Amrita, CIT & more. Free counseling.",
  keywords: "top engineering colleges in coimbatore, best engineering colleges coimbatore, coimbatore top engineering colleges 2025",
  alternates: { canonical: "https://www.edumadras.com/top-engineering-colleges-coimbatore" },
  openGraph: { title: "Top Engineering Colleges in Coimbatore 2025 | EduMadras", url: "https://www.edumadras.com/top-engineering-colleges-coimbatore", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Coimbatore", limit: 20 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top Engineering Colleges in Coimbatore" h1={H1} subtitle="Coimbatore's finest engineering colleges — ranked by academic excellence, placements, and industry connections." introText="Coimbatore is home to some of Tamil Nadu's finest engineering colleges. Led by the legendary PSG College of Technology and Amrita Vishwa Vidyapeetham, these top institutions combine strong academics with excellent placement support from Coimbatore's thriving tech ecosystem featuring Zoho, Freshworks, and other major employers." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/top-engineering-colleges-coimbatore" filterLabel="Top Colleges" />
    </>
  );
}
