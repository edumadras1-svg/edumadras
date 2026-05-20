import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/best-engineering-colleges-chennai";
const H1 = "Best Engineering Colleges in Chennai 2025–2026";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "Best in Chennai", href: "/best-engineering-colleges-chennai" }];
const FAQ_ITEMS = [
  { question: "Which is the No.1 engineering college in Chennai?", answer: "IIT Madras is the No.1 engineering college in Chennai and consistently ranks #1 in India's NIRF engineering rankings. Among private colleges, SSN College of Engineering and SRM IST are considered the best." },
  { question: "What are the best private engineering colleges in Chennai?", answer: "The best private engineering colleges in Chennai include SRM Institute of Science and Technology (SRM IST), Sathyabama Institute of Science and Technology, SSN College of Engineering, Saveetha Engineering College, Hindustan Institute of Technology & Science, and Sri Sivasubramaniya Nadar College." },
  { question: "How do I choose the best engineering college in Chennai?", answer: "Consider these factors: 1) NIRF ranking and NAAC accreditation, 2) Placement record — average and highest packages, 3) Faculty quality and student-to-faculty ratio, 4) Infrastructure and lab facilities, 5) Fee structure and scholarship availability, 6) Industry partnerships and internship opportunities." },
  { question: "What is the average fee for the best engineering colleges in Chennai?", answer: "Fees vary significantly: Government colleges (₹25K–50K/year), Government-aided (₹1–2 LPA), Top private colleges like SRM/VIT (₹2.5–4 LPA), and Deemed universities (₹1.5–3 LPA). Scholarships can reduce costs by 25–100%." },
  { question: "Which Chennai engineering colleges offer the best placements?", answer: "IIT Madras leads with ₹20+ LPA average. SSN College averages ₹8–10 LPA. SRM IST and Sathyabama average ₹5–8 LPA with 85%+ placement rates. Top recruiters include Google, Amazon, Microsoft, TCS, Infosys, and Wipro." },
  { question: "Are deemed universities in Chennai good for engineering?", answer: "Yes — top deemed universities like SRM IST, Sathyabama, Hindustan Institute of Technology, and Saveetha Engineering College offer excellent infrastructure, industry connections, and placement support. They have the flexibility to update curriculum faster than affiliated colleges." },
];

export const metadata: Metadata = {
  title: "Best Engineering Colleges in Chennai 2025–2026 — Rankings, Fees & Placements | EduMadras",
  description: "Discover the best engineering colleges in Chennai 2025 ranked by NIRF, placements & fees. Compare IIT Madras, SRM, SSN, Sathyabama & more. Free admission counseling.",
  keywords: "best engineering colleges in chennai, top engineering colleges chennai, best btech colleges chennai, best private engineering colleges chennai 2025",
  alternates: { canonical: "https://www.edumadras.com/best-engineering-colleges-chennai" },
  openGraph: { title: "Best Engineering Colleges in Chennai 2025 | EduMadras", url: "https://www.edumadras.com/best-engineering-colleges-chennai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", limit: 30 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Best Engineering Colleges in Chennai" h1={H1} subtitle="Expert-curated list of Chennai's finest engineering colleges — ranked by NIRF, placements, infrastructure & academic excellence." introText="Choosing the best engineering college in Chennai can shape your entire career. This carefully curated list ranks Chennai's engineering colleges based on a holistic score combining NIRF ranking, placement performance, faculty quality, infrastructure, and industry partnerships. From the globally renowned IIT Madras to top private institutions like SRM, Sathyabama, and SSN — we've analyzed every aspect so you can make an informed decision. All data is verified from official sources and updated for the 2025–2026 academic year." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/best-engineering-colleges-chennai" filterLabel="Best Colleges" />
    </>
  );
}
