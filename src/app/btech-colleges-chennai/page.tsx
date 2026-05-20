import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/btech-colleges-chennai";
const H1 = "B.Tech Colleges in Chennai 2025–2026";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "B.Tech Colleges", href: "/btech-colleges-chennai" }];
const FAQ_ITEMS = [
  { question: "How many B.Tech colleges are there in Chennai?", answer: "Chennai has over 100 colleges offering B.Tech programs, including IIT Madras, Anna University, SRM IST, Sathyabama, and numerous self-financing colleges affiliated to Anna University." },
  { question: "What is the difference between B.Tech and B.E. in Chennai colleges?", answer: "B.Tech (Bachelor of Technology) is offered by deemed/autonomous universities (SRM, Sathyabama, VIT) while B.E. (Bachelor of Engineering) is offered by Anna University-affiliated colleges. Both are 4-year undergraduate engineering degrees with equal recognition by employers and for higher studies." },
  { question: "What are the B.Tech admission requirements in Chennai?", answer: "For Anna University-affiliated colleges: TNEA counseling based on 12th marks (Physics, Chemistry, Maths). For deemed universities: Own entrance exams (SRMJEEE, VITEEE, Sathyabama AIEEE). For IIT Madras: JEE Advanced. Minimum eligibility is 50% in PCM for most colleges." },
  { question: "Which B.Tech branches have the best placements in Chennai?", answer: "Computer Science Engineering (CSE), Artificial Intelligence & Data Science (AI/DS), Information Technology (IT), and Electronics & Communication Engineering (ECE) consistently have the best placement records in Chennai with average packages of ₹5–15 LPA." },
  { question: "What is the fee for B.Tech in Chennai?", answer: "B.Tech fees in Chennai range from ₹25,000/year (government colleges) to ₹4 LPA/year (top deemed universities). Average fee for private colleges is ₹1.5–2.5 LPA/year. Total 4-year cost ranges from ₹1 Lakh to ₹16 Lakhs depending on the institution." },
  { question: "Can I do B.Tech in Chennai without entrance exam?", answer: "Yes! Many private B.Tech colleges in Chennai accept admissions through TNEA counseling (based on 12th marks only, no entrance exam). Some colleges also offer direct admission through management quota. Only IIT Madras and NITs require entrance exams like JEE." },
];

export const metadata: Metadata = {
  title: "B.Tech Colleges in Chennai 2025 — Fees, Admission & Placements | EduMadras",
  description: "Complete list of B.Tech colleges in Chennai 2025 with fees, admission process, entrance exams & placements. Compare IIT Madras, SRM, Sathyabama & more. Free counseling.",
  keywords: "btech colleges in chennai, b.tech colleges chennai, btech admission chennai 2025, btech fees chennai, best btech colleges chennai",
  alternates: { canonical: "https://www.edumadras.com/btech-colleges-chennai" },
  openGraph: { title: "B.Tech Colleges in Chennai 2025 | EduMadras", url: "https://www.edumadras.com/btech-colleges-chennai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", limit: 50 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="B.Tech Colleges in Chennai" h1={H1} subtitle="Complete directory of all B.Tech and B.E. colleges in Chennai with fees, admission requirements, and placement statistics for 2025–2026." introText="Looking for B.Tech colleges in Chennai? Whether you prefer B.Tech from deemed universities like SRM IST and Sathyabama or B.E. from Anna University-affiliated colleges, Chennai offers 100+ options across all engineering branches. This comprehensive guide covers every B.Tech college in Chennai — from the prestigious IIT Madras to affordable self-financing colleges — with verified fee structures, entrance exam requirements (JEE, SRMJEEE, VITEEE, TNEA), placement records, and admission timelines for the 2025–2026 academic year." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/btech-colleges-chennai" filterLabel="B.Tech Colleges" />
    </>
  );
}
