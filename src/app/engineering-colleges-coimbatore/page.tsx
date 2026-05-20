import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/engineering-colleges-coimbatore";
const H1 = "Engineering Colleges in Coimbatore 2025–2026";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/tamilnadu" }, { label: "Coimbatore", href: "/engineering-colleges-coimbatore" }];
const FAQ_ITEMS = [
  { question: "How many engineering colleges are in Coimbatore?", answer: "Coimbatore has approximately 50+ engineering colleges including the prestigious PSG College of Technology, Amrita Vishwa Vidyapeetham, Coimbatore Institute of Technology (CIT), and multiple Anna University-affiliated colleges." },
  { question: "Which is the best engineering college in Coimbatore?", answer: "PSG College of Technology is the best engineering college in Coimbatore with NIRF top-50 ranking and ₹8-12 LPA average packages. Amrita Vishwa Vidyapeetham and CIT are also top-ranked." },
  { question: "What is the average placement package in Coimbatore engineering colleges?", answer: "Top-tier colleges like PSG Tech average ₹8-12 LPA. Mid-tier colleges average ₹4-6 LPA. Overall average is ₹4-5 LPA. Top recruiters include TCS, Cognizant, Wipro, and Zoho." },
  { question: "Is Coimbatore better than Chennai for engineering?", answer: "Both cities have strong options. Chennai has more colleges and diverse opportunities. Coimbatore offers a focused tech ecosystem with companies like Zoho, Freshworks, and Kovai.co. PSG Tech rivals top Chennai colleges in placement quality." },
  { question: "What is the fee for engineering colleges in Coimbatore?", answer: "Government colleges: ₹25K-50K/year. Government-aided like CIT: ₹50K-1 LPA. PSG Tech: ₹1-2 LPA. Private colleges: ₹1-3 LPA. Amrita: ₹2.5-3.5 LPA." },
];

export const metadata: Metadata = {
  title: "Engineering Colleges in Coimbatore 2025 — Fees, Rankings & Placements | EduMadras",
  description: "Complete list of engineering colleges in Coimbatore 2025. PSG Tech, Amrita, CIT & more. Compare fees, placements & cutoffs. Free admission counseling.",
  keywords: "engineering colleges in coimbatore, coimbatore engineering colleges, best engineering colleges coimbatore, btech colleges coimbatore",
  alternates: { canonical: "https://www.edumadras.com/engineering-colleges-coimbatore" },
  openGraph: { title: "Engineering Colleges in Coimbatore 2025 | EduMadras", url: "https://www.edumadras.com/engineering-colleges-coimbatore", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Coimbatore", limit: 50 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Engineering Colleges in Coimbatore" h1={H1} subtitle="Complete directory of engineering colleges in Coimbatore — the Manchester of South India — with fees, placements & rankings." introText="Coimbatore is Tamil Nadu's second-largest educational hub with 50+ engineering colleges and a thriving tech ecosystem featuring companies like Zoho, Freshworks, and Kovai.co. From the elite PSG College of Technology to quality government-aided colleges, Coimbatore offers excellent engineering education at competitive fees with strong local and national placements." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/engineering-colleges-coimbatore" filterLabel="Coimbatore" />
    </>
  );
}
