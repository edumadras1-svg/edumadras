import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/private-engineering-colleges-chennai";
const H1 = "Private Engineering Colleges in Chennai 2025–2026";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "Private Colleges", href: "/private-engineering-colleges-chennai" }];
const FAQ_ITEMS = [
  { question: "How many private engineering colleges are there in Chennai?", answer: "Chennai has approximately 60+ private engineering colleges including self-financing colleges affiliated to Anna University, deemed universities like SRM and Sathyabama, and autonomous institutions like SSN and Rajalakshmi Engineering College." },
  { question: "Which is the best private engineering college in Chennai?", answer: "SRM Institute of Science and Technology (SRM IST), SSN College of Engineering, and Sathyabama Institute of Science and Technology are consistently ranked among the best private engineering colleges in Chennai based on NIRF rankings and placement records." },
  { question: "What is the fee range for private engineering colleges in Chennai?", answer: "Fee ranges from ₹1–1.5 LPA for self-financing colleges to ₹2.5–4 LPA for top deemed universities. SRM IST charges approximately ₹2.5–3.5 LPA, Sathyabama around ₹1.5–2.5 LPA, and SSN approximately ₹1.5–2 LPA depending on the branch." },
  { question: "Do private engineering colleges in Chennai accept TNEA scores?", answer: "Self-financing colleges affiliated to Anna University accept TNEA counseling scores. However, deemed universities like SRM, VIT, and Sathyabama conduct their own entrance exams (SRMJEEE, VITEEE, Sathyabama All India Entrance Exam respectively). Some also have management quota admissions." },
  { question: "Are private engineering colleges in Chennai good for placements?", answer: "Top private colleges like SRM IST (average ₹6–8 LPA), SSN (₹8–10 LPA), and Sathyabama (₹4–6 LPA) have strong placement records with 85–95% placement rates. Companies like TCS, Infosys, Cognizant, Wipro, Amazon, and Google recruit from these colleges." },
  { question: "Which private engineering colleges in Chennai have NBA accreditation?", answer: "Several private colleges have NBA-accredited programs including SRM IST, SSN College, Rajalakshmi Engineering College, Saveetha Engineering College, and Sri Sai Ram Engineering College. NBA accreditation ensures the program meets national quality standards." },
];

export const metadata: Metadata = {
  title: "Private Engineering Colleges in Chennai 2025 — Fees, Placements & Rankings | EduMadras",
  description: "Complete list of private engineering colleges in Chennai 2025 with fees, placements, rankings & admission process. Compare SRM, SSN, Sathyabama & more. Free counseling.",
  keywords: "private engineering colleges in chennai, self financing engineering colleges chennai, private btech colleges chennai, deemed university engineering chennai",
  alternates: { canonical: "https://www.edumadras.com/private-engineering-colleges-chennai" },
  openGraph: { title: "Private Engineering Colleges in Chennai 2025 | EduMadras", url: "https://www.edumadras.com/private-engineering-colleges-chennai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", type: "Private", limit: 50 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Private Engineering Colleges in Chennai" h1={H1} subtitle="Complete directory of private, self-financing & deemed university engineering colleges in Chennai — with fees, placements & admission details." introText="Private engineering colleges in Chennai offer a wide spectrum of choices — from affordable self-financing colleges affiliated to Anna University to premium deemed universities with world-class infrastructure. This comprehensive list covers all private engineering colleges in Chennai including SRM IST, Sathyabama, SSN, Saveetha, Hindustan, and Rajalakshmi with verified data on fees, placement records, NAAC ratings, and admission processes for 2025–2026." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/private-engineering-colleges-chennai" filterLabel="Private Colleges" />
    </>
  );
}
