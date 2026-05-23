import type { Metadata } from "next";
import { buildArticleJsonLd } from "@/lib/seo/articleJsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOBlogArticle } from "@/components/seo/SEOBlogArticle";

const PAGE_URL = "https://www.edumadras.com/top-it-companies-recruiting-chennai-colleges";
const H1 = "Which Chennai Colleges Do TCS, Infosys, Wipro & Top IT Companies Recruit From?";
const BREADCRUMBS = [{ label: "Guides", href: "/guides" }, { label: "IT Companies Recruiting", href: "/top-it-companies-recruiting-chennai-colleges" }];
const FAQ_ITEMS = [
  { question: "Which Chennai engineering colleges do TCS recruit from?", answer: "TCS recruits from nearly all AICTE-approved colleges in Chennai including SRM IST, Sathyabama, Saveetha, Rajalakshmi, Hindustan, and Anna University affiliated colleges. TCS NQT is the primary selection exam. Higher-tier colleges get TCS Digital roles (₹7-9 LPA) while others get TCS Ninja roles (₹3.5-4 LPA)." },
  { question: "Which Chennai colleges get Infosys placements?", answer: "Infosys recruits from SSN, SRM IST, VIT Chennai, Sathyabama, Rajalakshmi, and most autonomous colleges. Infosys offers System Engineer (₹3.6 LPA), Power Programmer (₹6.5 LPA), and Digital Specialist (₹5 LPA) roles based on InfyTQ scores." },
  { question: "Do product companies like Google and Microsoft recruit from Chennai colleges?", answer: "Yes, but primarily from IIT Madras, SSN, Anna University CEG, and SRM IST (top performers). Google, Microsoft, Amazon, and other product companies visit fewer than 10 Chennai colleges. Students from other colleges can apply off-campus through competitive coding." },
  { question: "What companies recruit from tier 2 colleges in Chennai?", answer: "Tier 2 colleges primarily see recruitment from service-based companies — TCS, Wipro, Cognizant, HCL, Accenture, and Capgemini. Some mid-size product companies like Zoho, Freshworks, and PayPal also recruit from select tier 2 colleges with strong coding cultures." },
  { question: "How can I get into top IT companies from a Chennai college?", answer: "Focus on competitive coding (LeetCode, CodeChef), build a strong GitHub portfolio, do relevant internships, and participate in hackathons. Companies like Zoho and Freshworks have open hiring processes that don't depend on campus visits." },
];
const TOC = [
  { id: "mass-recruiters", label: "Mass Recruiters (TCS, Infosys, Wipro)" },
  { id: "mid-tier-companies", label: "Mid-Tier Companies (Cognizant, HCL)" },
  { id: "product-companies", label: "Product Companies (Google, Microsoft)" },
  { id: "chennai-based", label: "Chennai-Based Companies (Zoho, Freshworks)" },
  { id: "college-wise", label: "Company-Wise College List" },
  { id: "tips", label: "How to Get Into Top Companies" },
];

export const metadata: Metadata = {
  title: "Top IT Companies Recruiting from Chennai Engineering Colleges 2025 | EduMadras",
  description: "TCS, Infosys, Wipro, Cognizant & more — see which Chennai engineering colleges they recruit from. Package data, hiring counts & tips.",
  keywords: "TCS recruiting colleges chennai, infosys recruiting colleges chennai, top IT companies chennai engineering colleges, wipro recruitment chennai colleges",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "IT Companies Recruiting from Chennai Colleges | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "article", locale: "en_IN" },
};

export default function Page() {
  const jsonLdSchemas = buildArticleJsonLd({
    title: H1, description: metadata.description as string, pageUrl: PAGE_URL,
    datePublished: "2025-05-23", dateModified: "2025-05-23",
    breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS,
  });

  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOBlogArticle h1={H1} subtitle="A complete breakdown of which IT companies recruit from which Chennai colleges — with package data, role types, and insider tips." publishDate="May 23, 2025" readTime="12 min read" category="Placements" breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} tableOfContents={TOC}>

        <p>Every year, hundreds of IT companies visit Chennai engineering colleges for campus recruitment. But not all colleges get the same companies — or the same roles. Understanding which companies recruit from which colleges can dramatically change your college selection strategy.</p>

        <h2 id="mass-recruiters">Mass Recruiters — TCS, Infosys, Wipro, Cognizant</h2>
        <p>Mass recruiters hire in bulk (500-5000+ students per year across India) and visit almost every AICTE-approved engineering college in Chennai. Here's what you need to know:</p>

        <table>
          <thead>
            <tr><th>Company</th><th>Package Range</th><th>Role Types</th><th>Colleges Visited</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>TCS</strong></td><td>₹3.5–9 LPA</td><td>Ninja, Digital, Prime</td><td>50+ Chennai colleges</td></tr>
            <tr><td><strong>Infosys</strong></td><td>₹3.6–6.5 LPA</td><td>System Engineer, Power Programmer</td><td>40+ Chennai colleges</td></tr>
            <tr><td><strong>Wipro</strong></td><td>₹3.5–6 LPA</td><td>Project Engineer, WILP</td><td>45+ Chennai colleges</td></tr>
            <tr><td><strong>Cognizant</strong></td><td>₹4–7 LPA</td><td>Programmer Analyst, GenC</td><td>35+ Chennai colleges</td></tr>
            <tr><td><strong>HCL</strong></td><td>₹3.5–5 LPA</td><td>Software Engineer</td><td>30+ Chennai colleges</td></tr>
            <tr><td><strong>Accenture</strong></td><td>₹4.5–6.5 LPA</td><td>Associate Software Eng.</td><td>30+ Chennai colleges</td></tr>
          </tbody>
        </table>

        <blockquote>
          <strong>Key Insight:</strong> Mass recruiters visit most colleges, but the <em>role tier</em> differs. IIT Madras and SSN students get interviewed for higher-paying digital/prime roles, while tier 3 colleges primarily see entry-level roles.
        </blockquote>

        <h2 id="mid-tier-companies">Mid-Tier Companies — ₹5-12 LPA Range</h2>
        <p>These companies are selective about which colleges they visit. Having one of these recruit from your college is a strong signal of placement quality:</p>
        <ul>
          <li><strong>Zoho Corporation</strong> — ₹6-14 LPA, recruits from SSN, SRM, CEG, Rajalakshmi, Saveetha</li>
          <li><strong>Freshworks</strong> — ₹8-15 LPA, recruits from IIT Madras, SSN, SRM IST</li>
          <li><strong>PayPal</strong> — ₹12-18 LPA, recruits from IIT Madras, SSN, Anna University CEG</li>
          <li><strong>Capgemini</strong> — ₹4.5-7 LPA, recruits from 25+ Chennai colleges</li>
          <li><strong>L&T Infotech</strong> — ₹4-6 LPA, recruits from 20+ Chennai colleges</li>
        </ul>

        <h2 id="product-companies">Product Companies — Google, Microsoft, Amazon</h2>
        <p>Dream companies with packages of ₹15-60+ LPA. These visit very few Chennai colleges:</p>
        <ul>
          <li><strong>Google</strong> — Only IIT Madras (campus), others via off-campus/internship conversion</li>
          <li><strong>Microsoft</strong> — IIT Madras, SSN College (select years)</li>
          <li><strong>Amazon</strong> — IIT Madras, SSN, SRM IST (SDE roles), Anna University CEG</li>
          <li><strong>Flipkart</strong> — IIT Madras, SSN</li>
          <li><strong>Oracle</strong> — IIT Madras, SSN, SRM IST, Anna University CEG</li>
        </ul>
        <p><strong>Reality check:</strong> If getting into a product company is your goal, IIT Madras and SSN are your best bets in Chennai. For all other colleges, focus on off-campus preparation through competitive coding platforms.</p>

        <h2 id="chennai-based">Chennai-Based Companies</h2>
        <p>Chennai is home to several major tech companies that actively recruit from local colleges:</p>
        <ul>
          <li><strong>Zoho</strong> — Largest private software company in Chennai, known for skill-based hiring (not college-based)</li>
          <li><strong>Freshworks</strong> — SaaS unicorn, strong preference for top-tier college candidates</li>
          <li><strong>Chargebee</strong> — High-growth SaaS company, recruits from top colleges</li>
          <li><strong>CIPL, TVS Digital, Ashok Leyland IT</strong> — Domain-specific tech roles</li>
        </ul>

        <h2 id="college-wise">College-Wise Recruiter Summary</h2>
        <table>
          <thead>
            <tr><th>College</th><th>Top Recruiters</th><th>Avg. Package</th></tr>
          </thead>
          <tbody>
            <tr><td>IIT Madras</td><td>Google, Microsoft, Amazon, Goldman Sachs</td><td>₹20+ LPA</td></tr>
            <tr><td>SSN College</td><td>Amazon, Zoho, PayPal, Oracle, TCS Digital</td><td>₹8-10 LPA</td></tr>
            <tr><td>Anna University CEG</td><td>Amazon, Oracle, Zoho, TCS Digital</td><td>₹8-12 LPA</td></tr>
            <tr><td>SRM IST</td><td>Amazon, TCS, Infosys, Cognizant, Zoho</td><td>₹6-8 LPA</td></tr>
            <tr><td>VIT Chennai</td><td>TCS, Infosys, Cognizant, Deloitte, Capgemini</td><td>₹6-7 LPA</td></tr>
            <tr><td>Sathyabama</td><td>TCS, Wipro, Cognizant, HCL, Accenture</td><td>₹4-6 LPA</td></tr>
            <tr><td>Saveetha Engg.</td><td>TCS, Infosys, Wipro, Zoho, Cognizant</td><td>₹4-5 LPA</td></tr>
            <tr><td>Rajalakshmi Engg.</td><td>TCS, Infosys, Wipro, Zoho, Cognizant</td><td>₹4-6 LPA</td></tr>
          </tbody>
        </table>

        <h2 id="tips">How to Get Into Top IT Companies</h2>
        <p>Regardless of your college tier, here are actionable strategies:</p>
        <ol>
          <li><strong>Start coding early</strong> — Begin competitive coding on LeetCode/CodeChef from Year 1</li>
          <li><strong>Build a portfolio</strong> — 3-5 quality GitHub projects beat a college name</li>
          <li><strong>Get internships</strong> — Apply to Zoho, Freshworks, and startup internships from Year 2</li>
          <li><strong>Network on LinkedIn</strong> — Connect with alumni at target companies</li>
          <li><strong>Apply off-campus</strong> — Most product companies accept applications directly through their careers pages</li>
        </ol>

      </SEOBlogArticle>
    </>
  );
}
