import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/engineering-colleges-trichy";
const H1 = "Engineering Colleges in Trichy 2025–2026";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/tamilnadu" }, { label: "Trichy", href: "/engineering-colleges-trichy" }];
const FAQ_ITEMS = [
  { question: "How many engineering colleges are in Trichy?", answer: "Trichy has approximately 20+ engineering colleges including the prestigious NIT Trichy (National Institute of Technology), one of India's top 10 engineering colleges by NIRF ranking." },
  { question: "Which is the best engineering college in Trichy?", answer: "NIT Trichy is the best engineering college in Trichy and one of India's top 10 (NIRF). It offers excellent placements with ₹12-18 LPA average packages. Other good colleges include SASTRA Deemed University and Bishop Heber College." },
  { question: "What is the placement record of NIT Trichy?", answer: "NIT Trichy has one of the best placement records in India with 95%+ placement rate. Average package is ₹12-18 LPA with highest packages exceeding ₹50 LPA. Top recruiters include Google, Microsoft, Amazon, Goldman Sachs, and JP Morgan." },
  { question: "How to get admission in NIT Trichy?", answer: "Admission to NIT Trichy is through JEE Main score and JoSAA counseling. The cutoff rank varies by branch: CSE requires top 3000-5000 JEE Main rank. Reserved category students get relaxation as per government norms." },
  { question: "Is Trichy a good city for engineering studies?", answer: "Yes! Trichy is a peaceful, affordable education hub with NIT Trichy as the crown jewel. The city has lower cost of living than Chennai, good hostel facilities, and a focused academic environment." },
];

export const metadata: Metadata = {
  title: "Engineering Colleges in Trichy 2025 — NIT Trichy, Fees & Rankings | EduMadras",
  description: "Complete list of engineering colleges in Trichy 2025. NIT Trichy, SASTRA & more. Compare fees, placements & cutoffs. Free counseling.",
  keywords: "engineering colleges in trichy, trichy engineering colleges, nit trichy, best engineering colleges trichy",
  alternates: { canonical: "https://www.edumadras.com/engineering-colleges-trichy" },
  openGraph: { title: "Engineering Colleges in Trichy 2025 | EduMadras", url: "https://www.edumadras.com/engineering-colleges-trichy", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Trichy", limit: 30 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Engineering Colleges in Trichy" h1={H1} subtitle="Home to NIT Trichy — one of India's top 10 engineering colleges — and other quality institutions." introText="Tiruchirappalli (Trichy) is home to NIT Trichy, one of India's top 10 engineering colleges by NIRF ranking. Beyond NIT, Trichy offers several quality engineering colleges at affordable fees with strong placement records. The city's peaceful environment and lower cost of living make it an excellent choice for focused engineering education." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/engineering-colleges-trichy" filterLabel="Trichy" />
    </>
  );
}
