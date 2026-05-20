import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/engineering-colleges-salem";
const H1 = "Engineering Colleges in Salem 2025–2026";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/tamilnadu" }, { label: "Salem", href: "/engineering-colleges-salem" }];
const FAQ_ITEMS = [
  { question: "How many engineering colleges are in Salem?", answer: "Salem has approximately 15+ engineering colleges including Government College of Engineering Salem (one of Tamil Nadu's oldest government colleges), Sona College of Technology, and Paavai Engineering College." },
  { question: "Which is the best engineering college in Salem?", answer: "Government College of Engineering (GCE) Salem is the best engineering college in Salem with affordable government fees and strong alumni network. Sona College of Technology is the best private option with good placements." },
  { question: "What are the fees for engineering in Salem?", answer: "GCE Salem charges ₹25K-50K/year (government fees). Sona College charges ₹1-1.5 LPA. Other private colleges range from ₹80K-1.5 LPA. Overall, Salem is one of the most affordable cities for engineering in Tamil Nadu." },
  { question: "Is Salem good for engineering studies?", answer: "Salem offers quality engineering education at very affordable costs. GCE Salem has a strong reputation and alumni network. The city has low cost of living and a growing industrial base in steel and textiles." },
  { question: "What is the placement record in Salem engineering colleges?", answer: "GCE Salem averages ₹4-6 LPA. Sona College averages ₹3-5 LPA. Top recruiters include TCS, Infosys, Cognizant, Wipro, and Salem Steel Plant. Many students also pursue higher studies at IITs and NITs." },
];

export const metadata: Metadata = {
  title: "Engineering Colleges in Salem 2025 — Fees, Rankings & Placements | EduMadras",
  description: "Complete list of engineering colleges in Salem 2025. GCE Salem, Sona College & more. Compare fees, placements & cutoffs. Free counseling.",
  keywords: "engineering colleges in salem, salem engineering colleges, best engineering colleges salem, gce salem",
  alternates: { canonical: "https://www.edumadras.com/engineering-colleges-salem" },
  openGraph: { title: "Engineering Colleges in Salem 2025 | EduMadras", url: "https://www.edumadras.com/engineering-colleges-salem", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Salem", limit: 20 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Engineering Colleges in Salem" h1={H1} subtitle="Complete directory of engineering colleges in Salem — affordable education with strong government college options." introText="Salem is one of Tamil Nadu's most affordable cities for engineering education, anchored by the prestigious Government College of Engineering (GCE) Salem. With quality private options like Sona College of Technology and a growing industrial base, Salem offers excellent value for engineering students. This guide covers all engineering colleges in Salem with verified fee and placement data." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/engineering-colleges-salem" filterLabel="Salem" />
    </>
  );
}
