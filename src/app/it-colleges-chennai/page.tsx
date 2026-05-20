import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/it-colleges-chennai";
const H1 = "IT Colleges in Chennai 2025 — Information Technology Engineering";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "IT Colleges", href: "/it-colleges-chennai" }];
const FAQ_ITEMS = [
  { question: "Which is the best IT college in Chennai?", answer: "Anna University CEG, SSN College, and SRM IST have the strongest Information Technology departments. IIT Madras offers CSE which covers IT. MIT Anna University also has an excellent IT program." },
  { question: "What is the difference between IT and CSE?", answer: "CSE focuses more on computer science theory, algorithms, and systems. IT focuses on practical application of technology in business — networking, databases, web development, and enterprise systems. Both lead to similar career paths in software development." },
  { question: "What is the placement for IT branch in Chennai?", answer: "IT branch placements are comparable to CSE. Top colleges average ₹5-10 LPA. Major recruiters include TCS, Infosys, Cognizant, Wipro, Zoho, and Freshworks. IT graduates also get placed at product companies at ₹8-15 LPA." },
  { question: "Is IT a good branch in 2025?", answer: "Yes! IT is one of the top 3 branches by placement. With Chennai being India's IT hub (home to TCS, Cognizant, Infosys offices), IT graduates have excellent local opportunities. The branch also covers trending areas like cloud computing and cybersecurity." },
  { question: "What is the TNEA cutoff for IT in Chennai?", answer: "IT cutoffs are close to CSE: Anna University CEG (188-193), MIT Anna University (183-188), SSN College (180-185). IT is typically 3-5 marks lower than CSE at the same college." },
];

export const metadata: Metadata = {
  title: "IT Colleges in Chennai 2025 — Information Technology Engineering | EduMadras",
  description: "Best Information Technology (IT) colleges in Chennai 2025. Compare fees, placements, cutoffs. India's IT capital. Free admission counseling.",
  keywords: "it colleges in chennai, information technology colleges chennai, best it colleges chennai, btech it colleges chennai",
  alternates: { canonical: "https://www.edumadras.com/it-colleges-chennai" },
  openGraph: { title: "IT Colleges in Chennai 2025 | EduMadras", url: "https://www.edumadras.com/it-colleges-chennai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", limit: 40 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="IT Colleges in Chennai" h1={H1} subtitle="All Information Technology colleges in Chennai — India's IT capital with TCS, Cognizant & Infosys headquarters." introText="Chennai is India's IT capital — headquarters of TCS (India's largest IT company), Cognizant, and major offices of Infosys, Wipro, HCL, and Zoho. This makes it the ideal city for Information Technology education. From Anna University's strong IT department to private colleges with direct industry connections, this guide covers every IT college in Chennai with verified placement data and fee details." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/it-colleges-chennai" filterLabel="Information Technology" />
    </>
  );
}
