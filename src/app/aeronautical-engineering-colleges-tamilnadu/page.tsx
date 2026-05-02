import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/aeronautical-engineering-colleges-tamilnadu";
const H1 = "Aeronautical Engineering Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/tamilnadu" }, { label: "Aeronautical", href: "/aeronautical-engineering-colleges-tamilnadu" }];
const FAQ_ITEMS = [{ question: "Which colleges offer aeronautical engineering in Tamil Nadu?", answer: "MIT Anna University, Hindusthan College of Engineering, Kumaraguru College of Technology, and several other institutions in Chennai, Coimbatore, and other cities offer B.E Aeronautical Engineering." }, { question: "What is the scope of aeronautical engineering in Tamil Nadu?", answer: "Excellent — with ISRO, HAL, Boeing, Airbus, and defense organizations actively recruiting. Average packages range from ₹5-12 LPA in core aero companies." }, { question: "What is the eligibility for aeronautical engineering?", answer: "+2 with Physics, Chemistry & Maths. Admission through TNEA counseling (state level) or JEE Main (central level). Minimum 50% aggregate in PCM." }];

export const metadata: Metadata = {
  title: "Aeronautical Engineering Colleges in Tamil Nadu 2025 — Fees & Admissions | EduMadras",
  description: "Complete list of aeronautical engineering colleges in Tamil Nadu. Compare fees, placements, eligibility & courses for B.E/B.Tech Aeronautical Engineering. Free counseling.",
  keywords: "aeronautical engineering colleges in tamilnadu, aeronautical engineering colleges tamilnadu fees, best aeronautical engineering colleges tamilnadu",
  alternates: { canonical: "https://edumadras.com/aeronautical-engineering-colleges-tamilnadu" },
  openGraph: { title: "Aeronautical Engineering Colleges in Tamil Nadu | EduMadras", url: "https://edumadras.com/aeronautical-engineering-colleges-tamilnadu", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", state: "Tamil Nadu" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Aeronautical Engineering Colleges in Tamil Nadu" h1={H1} subtitle="Top colleges offering B.E/B.Tech in Aeronautical & Aerospace Engineering across Tamil Nadu." introText="Tamil Nadu is a leading hub for aeronautical engineering education in India, with colleges like MIT Anna University, Hindusthan College of Engineering, and Kumaraguru College offering specialized programs in aeronautical and aerospace engineering. With ISRO, HAL, and major aerospace companies actively recruiting from TN colleges, pursuing aeronautical engineering in Tamil Nadu offers strong career prospects. Below is the complete list of colleges offering aeronautical engineering with verified fee structures and placement data." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://edumadras.com/aeronautical-engineering-colleges-tamilnadu" filterLabel="Aeronautical" />
    </>
  );
}
