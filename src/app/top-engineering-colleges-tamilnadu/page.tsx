import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/top-engineering-colleges-tamilnadu";
const H1 = "Top Engineering Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "Top Engineering Colleges", href: "/top-engineering-colleges-tamilnadu" }, { label: "Tamil Nadu", href: "/top-engineering-colleges-tamilnadu" }];
const FAQ_ITEMS = [{ question: "How is TNEA counseling conducted?", answer: "TNEA counseling is conducted online by Anna University based on +2 marks. Students select colleges and branches in order of preference during multiple rounds." }, { question: "What is the fee structure for engineering in Tamil Nadu?", answer: "Government colleges: ₹25K-50K/year. Aided colleges: ₹50K-1L/year. Self-financing colleges: ₹1-4L/year depending on the institution." }];

export const metadata: Metadata = {
  title: "Top Engineering Colleges in Tamil Nadu 2025 — Rankings & Fees | EduMadras",
  description: "Explore top engineering colleges in Tamil Nadu. NIRF rankings, TNEA cutoffs, fees, placements & courses. Get free admission counseling.",
  keywords: "top engineering colleges in tamilnadu, top engineering colleges tamilnadu, best engineering colleges tamilnadu 2025",
  alternates: { canonical: "https://edumadras.com/top-engineering-colleges-tamilnadu" },
  openGraph: { title: "Top Engineering Colleges in Tamil Nadu 2025 | EduMadras", url: "https://edumadras.com/top-engineering-colleges-tamilnadu", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", state: "Tamil Nadu" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top Engineering Colleges in Tamil Nadu" h1={H1} subtitle="Complete rank-wise directory of Tamil Nadu's best engineering colleges with NIRF rankings, fees & placement data." introText="Tamil Nadu is one of India's strongest states for technical education, with IIT Madras, NIT Trichy, and Anna University leading the way. The state's TNEA counseling process makes engineering admissions transparent and merit-based. This comprehensive guide covers all top engineering colleges across Tamil Nadu — from Chennai to Coimbatore, Madurai to Trichy — with verified data to help you choose the right institution." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://edumadras.com/top-engineering-colleges-tamilnadu" />
    </>
  );
}
