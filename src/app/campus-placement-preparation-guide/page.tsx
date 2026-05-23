import type { Metadata } from "next";
import { buildArticleJsonLd } from "@/lib/seo/articleJsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOBlogArticle } from "@/components/seo/SEOBlogArticle";

const PAGE_URL = "https://www.edumadras.com/campus-placement-preparation-guide";
const H1 = "Campus Placement Preparation Guide for Chennai Engineering Students — 2025";
const BREADCRUMBS = [{ label: "Guides", href: "/guides" }, { label: "Placement Prep Guide", href: "/campus-placement-preparation-guide" }];
const FAQ_ITEMS = [
  { question: "What are the stages of a campus placement drive in Chennai engineering colleges?", answer: "Typically, there are four stages: 1. Resume Shortlisting, 2. Online Aptitude & Coding Test, 3. Technical Interview (DSA, OOPs, DBMS), and 4. HR Interview (behavioral questions, salary, and location discussion)." },
  { question: "How important is CGPA during campus placement drives?", answer: "CGPA is extremely important for the initial filtering process. Many top-tier and mid-tier companies set a cutoff of 7.5 or 8.0 CGPA to sit for their online tests. Once you pass the test, CGPA matters much less compared to your actual coding and technical skills." },
  { question: "What is tested during the HR interview round?", answer: "The HR round tests your communication skills, adaptability, willingness to relocate, cultural fit within the company, teamwork capability, and response to behavioral scenario questions." },
];
const TOC = [
  { id: "intro", label: "Overview of Campus Placement Process" },
  { id: "phase-aptitude", label: "Phase 1: Aptitude & Reasoning Prep" },
  { id: "phase-technical", label: "Phase 2: Technical & Coding Mastery" },
  { id: "phase-resume", label: "Phase 3: Resume Writing & Project Showcase" },
  { id: "phase-interview", label: "Phase 4: Cracking Technical & HR Rounds" },
];

export const metadata: Metadata = {
  title: "Campus Placement Preparation Guide 2025 — For Chennai Engineering Students | EduMadras",
  description: "Complete campus placement preparation guide for Chennai engineering students. Interview prep, resume tips, aptitude training & company-specific strategies.",
  keywords: "campus placement preparation guide, how to prepare for campus placement, placement preparation engineering students, fresher job guide chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Campus Placement Prep Guide 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "article", locale: "en_IN" },
};

export default function Page() {
  const howToSteps = [
    { name: "Step 1: Resume Design & Standardization", text: "Create a single-page LaTeX or Google Docs resume. Ensure there are no grammatical errors and add links to your GitHub and deployed web projects." },
    { name: "Step 2: Clear the Aptitude Gatekeeper", text: "Practice quantitative aptitude, logical reasoning, and verbal topics on IndiaBIX or R.S. Aggarwal. Spend 30 minutes daily to maintain speed." },
    { name: "Step 3: Master Technical Fundamentals", text: "Revise Database Management Systems (DBMS), Operating Systems (OS), Computer Networks (CN), and Object-Oriented Programming (OOP) concepts." },
    { name: "Step 4: Practice Live Mock Interviews", text: "Practice talking through your code aloud. Conduct mock interview sessions with classmates to build confidence and refine your technical explanations." }
  ];

  const jsonLdSchemas = buildArticleJsonLd({ title: H1, description: metadata.description as string, pageUrl: PAGE_URL, datePublished: "2025-05-23", dateModified: "2025-05-23", breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS, howToSteps });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOBlogArticle h1={H1} subtitle="A comprehensive preparation framework covering aptitude tests, programming, computer science basics, resume creation, and interview techniques." publishDate="May 23, 2025" readTime="10 min read" category="Careers" breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} tableOfContents={TOC}>
        <p id="intro">Campus placements represent the most direct and crucial opportunity for engineering students in Chennai to kickstart their professional journeys. However, many qualified students fail to secure offers simply due to a lack of preparation structure. This comprehensive roadmap details how to prepare for each phase of the recruitment process to secure a high-quality job offer.</p>

        <h2 id="phase-aptitude">Phase 1: Aptitude &amp; Reasoning Prep</h2>
        <p>Aptitude tests are the first gatekeeper. No matter how excellent your coding is, if you fail the aptitude test, you will not get an interview opportunity. Here is what to focus on:</p>
        <ul>
          <li><strong>Quantitative Aptitude:</strong> Focus on high-frequency topics: Time &amp; Work, Time, Speed &amp; Distance, Percentages, Profit &amp; Loss, Permutations &amp; Combinations, and Probability.</li>
          <li><strong>Logical Reasoning:</strong> Prepare topics like Syllogisms, Coding-Decoding, Blood Relations, Seating Arrangements, and Data Interpretation.</li>
          <li><strong>Preparation Resources:</strong> Use <em>IndiaBIX</em> for massive free databases, or refer to <em>R.S. Aggarwal&apos;s Quantitative Aptitude</em> textbook.</li>
        </ul>

        <h2 id="phase-technical">Phase 2: Technical &amp; Coding Mastery</h2>
        <p>Technical assessments test both your programming capability and your theoretical computer science knowledge. Ensure you dedicate solid preparation to:</p>
        <ol>
          <li><strong>Object-Oriented Programming (OOP):</strong> Deeply understand the four pillars of OOP (Inheritance, Polymorphism, Encapsulation, Abstraction) and know how to implement them in C++, Java, or Python.</li>
          <li><strong>DBMS &amp; SQL:</strong> Master SQL queries (Joins, Aggregations, Subqueries), Normalization (1NF, 2NF, 3NF), and basic transaction concepts (ACID properties).</li>
          <li><strong>Core Computer Science:</strong> Revise key operating system terms (Paging, Threading, Deadlocks) and basic Computer Network layer concepts (TCP/IP model, HTTP vs HTTPS).</li>
        </ol>

        <h2 id="phase-resume">Phase 3: Resume Writing &amp; Project Showcase</h2>
        <p>A poor resume will hide outstanding coding talent. Build your resume with these guidelines:</p>
        <ul>
          <li><strong>Keep it to a Single Page:</strong> Freshers should never have a multi-page resume. Keep it clean, structured, and use standard bullet points.</li>
          <li><strong>Use the STAR Method:</strong> When describing projects, use the structure: <em>Situation</em> (what was the challenge), <em>Task</em> (what was your objective), <em>Action</em> (how did you code it), and <em>Result</em> (what was the outcome/metric achieved).</li>
          <li><strong>Add Clickable Links:</strong> Link your GitHub profile, LinkedIn handle, and live deployed web URLs.</li>
        </ul>

        <h2 id="phase-interview">Phase 4: Cracking Technical &amp; HR Rounds</h2>
        <p>The interview is where you bring your resume to life. Review these key interview success patterns:</p>
        <ul>
          <li><strong>Explain your thought process:</strong> When asked a coding problem, do not sit in silence. Talk aloud. Explain your brute-force approach first, then discuss how you intend to optimize it.</li>
          <li><strong>Be honest:</strong> If you do not know the answer to a specific theoretical question, say: <em>&quot;I am not fully familiar with this concept, but I would love to learn more about it.&quot;</em> Recruiter appreciate honesty over bluffing.</li>
          <li><strong>Understand the company:</strong> Spend 15 minutes before the interview researching what the company does, their main products, and read their recent news. This shows genuine interest.</li>
        </ul>
      </SEOBlogArticle>
    </>
  );
}
