import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/engineering-colleges-madurai";
const H1 = "Engineering Colleges in Madurai 2025–2026";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/tamilnadu" }, { label: "Madurai", href: "/engineering-colleges-madurai" }];
const FAQ_ITEMS = [
  { question: "How many engineering colleges are in Madurai?", answer: "Madurai has approximately 20+ engineering colleges including the prestigious Thiagarajar College of Engineering (TCE), Madurai Kamaraj University, Kalasalingam Academy, and several Anna University-affiliated private colleges." },
  { question: "Which is the best engineering college in Madurai?", answer: "Thiagarajar College of Engineering (TCE) is the best engineering college in Madurai with NIRF ranking, strong placements (₹6-10 LPA average), and a legacy spanning 60+ years. It is one of the top government-aided colleges in Tamil Nadu." },
  { question: "What is the average placement in Madurai engineering colleges?", answer: "TCE averages ₹6-10 LPA. Mepco Schlenk averages ₹4-6 LPA. Other colleges average ₹3-5 LPA. Top recruiters include TCS, Cognizant, Wipro, L&T, and Ashok Leyland." },
  { question: "Is Madurai good for engineering education?", answer: "Yes. Madurai offers quality engineering education at lower costs than Chennai. TCE is one of Tamil Nadu's best colleges. The city has a lower cost of living and strong manufacturing/IT sector for internships and jobs." },
  { question: "What are the fees for engineering in Madurai?", answer: "Government colleges: ₹25K-50K/year. Government-aided like TCE: ₹50K-1 LPA. Private colleges: ₹80K-2 LPA. Total 4-year cost is significantly lower than Chennai colleges." },
];

export const metadata: Metadata = {
  title: "Engineering Colleges in Madurai 2025 — Fees, Rankings & Placements | EduMadras",
  description: "Complete list of engineering colleges in Madurai 2025. TCE, Mepco & more. Compare fees, placements & cutoffs. Free admission counseling.",
  keywords: "engineering colleges in madurai, madurai engineering colleges, best engineering colleges madurai, btech colleges madurai",
  alternates: { canonical: "https://www.edumadras.com/engineering-colleges-madurai" },
  openGraph: { title: "Engineering Colleges in Madurai 2025 | EduMadras", url: "https://www.edumadras.com/engineering-colleges-madurai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Madurai", limit: 30 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Engineering Colleges in Madurai" h1={H1} subtitle="Complete directory of engineering colleges in the Temple City of Tamil Nadu — with fees, placements & admission details." introText="Madurai, the cultural capital of Tamil Nadu, is home to some of the state's finest engineering institutions. Led by the legendary Thiagarajar College of Engineering (TCE), Madurai's engineering colleges offer strong academics, quality placements, and significantly lower costs compared to Chennai. Whether you're looking for government-aided excellence or affordable private options, this guide covers all engineering colleges in Madurai." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/engineering-colleges-madurai" filterLabel="Madurai" />
    </>
  );
}
