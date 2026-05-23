import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/web-development-colleges-chennai";
const H1 = "Best Engineering Colleges in Chennai for Web Development Careers — 2025";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "Web Development", href: "/web-development-colleges-chennai" }];
const FAQ_ITEMS = [
  { question: "Which Chennai colleges are best for web development careers?", answer: "IIT Madras, SSN College, SRM IST, and Anna University CEG lead for web development careers. They offer dedicated full-stack labs, hackathon culture, coding clubs, and partnerships with Google, Microsoft, and Amazon. CSE and IT branches are most relevant." },
  { question: "Do I need a specific engineering branch for web development?", answer: "Computer Science (CSE) and Information Technology (IT) are ideal. However, AI/ML and Data Science branches also cover web technologies. Even ECE students can transition with self-learning, online certifications, and personal projects." },
  { question: "Which companies hire web developers from Chennai colleges?", answer: "Major recruiters include Zoho, Freshworks, TCS Digital, Infosys, Cognizant, Accenture, Amazon, Microsoft, and numerous startups. Zoho and Freshworks — both headquartered in Chennai — are top hirers for web development roles." },
  { question: "Is coding skills or college name more important for web development jobs?", answer: "For web development specifically, skills matter more than college name. A strong GitHub portfolio, internship experience, and knowledge of React, Node.js, and modern frameworks can help tier 2 college students compete with IIT/NIT graduates." },
];

export const metadata: Metadata = {
  title: "Best Colleges for Web Development in Chennai 2025 | EduMadras",
  description: "Top Chennai colleges for web development careers — with coding labs, hackathons & tech company placements. CSE, IT & AI/ML programs compared.",
  keywords: "web development colleges chennai, best college for web development chennai, coding colleges chennai, full stack development colleges chennai",
  alternates: { canonical: "https://www.edumadras.com/web-development-colleges-chennai" },
  openGraph: { title: "Web Development Colleges Chennai 2025 | EduMadras", url: "https://www.edumadras.com/web-development-colleges-chennai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", limit: 15 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Web Development Colleges Chennai" h1={H1} subtitle="Chennai's best engineering colleges for aspiring web developers — ranked by coding culture, tech placements & industry partnerships." introText="Web development is one of the fastest-growing career paths, and choosing the right college can give you a significant head start. This curated list features Chennai engineering colleges that excel in producing web developers — with strong CSE/IT programs, active coding clubs, hackathon culture, modern full-stack labs, and partnerships with tech companies like Zoho, Freshworks, Google, and Microsoft. Whether you're targeting product companies or startups, these colleges will prepare you with the skills, portfolio, and network you need." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/web-development-colleges-chennai" filterLabel="Web Dev" showPlacementColumn={true} />
    </>
  );
}
