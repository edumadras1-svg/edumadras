import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/mechanical-engineering-colleges-chennai";
const H1 = "Mechanical Engineering Colleges in Chennai 2025–2026";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "Mechanical Engineering", href: "/mechanical-engineering-colleges-chennai" }];
const FAQ_ITEMS = [
  { question: "Which is the best college for Mechanical Engineering in Chennai?", answer: "IIT Madras is the undisputed leader for Mechanical Engineering with world-class labs and ₹15-20 LPA average packages. Among private colleges, Anna University CEG, SRM IST, and SSN College have the strongest Mechanical Engineering departments." },
  { question: "What is the scope of Mechanical Engineering in 2025?", answer: "Mechanical Engineering remains highly relevant with growing demand in Electric Vehicles (EV), Robotics, Aerospace, 3D Printing, and Renewable Energy sectors. Chennai's strong automotive industry (Hyundai, Ford, Renault-Nissan, Ashok Leyland) provides excellent opportunities." },
  { question: "What is the average placement for Mechanical Engineering in Chennai?", answer: "Average packages range from ₹4-8 LPA in top colleges. Top recruiters include Hyundai, Ashok Leyland, L&T, Caterpillar, TCS, and Infosys. IIT Madras mechanical grads average ₹15+ LPA." },
  { question: "What is the TNEA cutoff for Mechanical Engineering in Chennai?", answer: "TNEA cutoffs for Mechanical Engineering are lower than CSE: Anna University CEG (180-185), MIT Anna University (175-180), SRM IST (via SRMJEEE). Mechanical Engineering cutoffs have been decreasing, making top colleges more accessible." },
  { question: "Is Mechanical Engineering a good choice in Chennai?", answer: "Yes — Chennai is India's Detroit with major automobile companies headquartered here. The city has Hyundai, Renault-Nissan, Daimler, Caterpillar, and 400+ auto ancillary companies providing strong internship and placement opportunities for mechanical engineers." },
];

export const metadata: Metadata = {
  title: "Mechanical Engineering Colleges in Chennai 2025 — Fees, Placements & Cutoffs | EduMadras",
  description: "Best Mechanical Engineering colleges in Chennai 2025. Compare fees, placements, TNEA cutoffs. IIT Madras, SRM, Anna University & more. Free counseling.",
  keywords: "mechanical engineering colleges in chennai, best mechanical engineering colleges chennai, mech engineering colleges chennai",
  alternates: { canonical: "https://www.edumadras.com/mechanical-engineering-colleges-chennai" },
  openGraph: { title: "Mechanical Engineering Colleges in Chennai 2025 | EduMadras", url: "https://www.edumadras.com/mechanical-engineering-colleges-chennai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", limit: 40 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Mechanical Engineering Colleges in Chennai" h1={H1} subtitle="Every college in Chennai offering Mechanical Engineering — with branch-specific cutoffs, fees, and placement data from India's automobile capital." introText="Chennai is India's automobile capital — home to Hyundai, Renault-Nissan, Daimler, Ashok Leyland, and 400+ auto ancillary companies. This makes it one of the best cities in India for Mechanical Engineering. From IIT Madras's world-class mechanical labs to strong industry-connected programs at SRM and Anna University, this guide covers every Mechanical Engineering college in Chennai with verified data on fees, TNEA cutoffs, and placement records for 2025–2026." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/mechanical-engineering-colleges-chennai" filterLabel="Mechanical Engineering" />
    </>
  );
}
