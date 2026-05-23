import type { Metadata } from "next";
import { buildArticleJsonLd } from "@/lib/seo/articleJsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOBlogArticle } from "@/components/seo/SEOBlogArticle";

const PAGE_URL = "https://www.edumadras.com/college-selection-checklist-chennai";
const H1 = "Engineering College Selection Checklist — 15 Questions You Must Ask";
const BREADCRUMBS = [{ label: "Guides", href: "/guides" }, { label: "College Selection Checklist", href: "/college-selection-checklist-chennai" }];
const FAQ_ITEMS = [
  { question: "What is the single most important factor when choosing an engineering college?", answer: "While placements are crucial, the ultimate metric is ROI (Return on Investment) — balancing the total 4-year tuition fee against the median placement salary of the branch you intend to join." },
  { question: "Should I choose a college based on placement statistics alone?", answer: "No. You should also evaluate the academic syllabus quality (is the college autonomous?), infrastructure facilities (labs, coding clubs), faculty credentials, student-to-faculty ratio, and student safety/hostel environment." },
  { question: "Why is autonomous status important for a college?", answer: "Autonomous status allows a college to design its own curriculum, update its syllabus to include modern coding standards (like React, Cloud, Python), and conduct exams independently, making it far superior to non-autonomous colleges affiliated strictly to standard university templates." },
];
const TOC = [
  { id: "intro", label: "The Challenge of College Selection" },
  { id: "checklist-section", label: "The 15-Point Selection Checklist" },
  { id: "how-to-use", label: "How to Gather This Information" },
  { id: "decision-making", label: "Making Your Final Choice" },
];

export const metadata: Metadata = {
  title: "College Selection Checklist — 15 Questions to Ask Before Joining | EduMadras",
  description: "Choosing an engineering college in Chennai? Use this 15-point checklist covering placements, fees, faculty, infrastructure & campus life.",
  keywords: "college selection checklist, questions to ask before joining college, how to select engineering college chennai, choose engineering college list",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Engineering College Selection Checklist | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "article", locale: "en_IN" },
};

export default function Page() {
  const howToSteps = [
    { name: "Step 1: Download the NIRF PDF", text: "Download the legally-certified NIRF PDF of the college. Note the actual numbers of graduating vs placed students." },
    { name: "Step 2: Schedule a Campus Visit", text: "Walk around the computer labs, project spaces, and discuss directly with existing 3rd and 4th-year students." },
    { name: "Step 3: Connect with Alumni", text: "Reach out to 3 recent graduates on LinkedIn to confirm if placement cells are supportive during campus drives." }
  ];

  const jsonLdSchemas = buildArticleJsonLd({ title: H1, description: metadata.description as string, pageUrl: PAGE_URL, datePublished: "2025-05-23", dateModified: "2025-05-23", breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS, howToSteps });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOBlogArticle h1={H1} subtitle="A practical, highly exhaustive 15-point inspection framework to help students evaluate engineering colleges in Chennai before making a final admission choice." publishDate="May 23, 2025" readTime="8 min read" category="College Guide" breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} tableOfContents={TOC}>
        <p id="intro">Choosing an engineering college is a four-year commitment that determines your initial career trajectory, peer network, and professional skill level. With over a hundred engineering colleges in and around Chennai, marketing campaigns can make it highly confusing to separate average institutions from top-performing colleges. To help you evaluate, we have built this detailed 15-point inspection checklist.</p>

        <h2 id="checklist-section">The 15-Point Selection Checklist</h2>
        <p>Before saying yes or making an advanced payment, use this scorecard to ask the college administration (and students) these critical questions:</p>

        <h3>1. Placements and Return on Investment (ROI)</h3>
        <ul>
          <li><strong>Q1: What is the median salary package of placed students in the target branch?</strong> (Don&apos;t settle for average; median represents the actual average student&apos;s package).</li>
          <li><strong>Q2: What percentage of eligible students actually get placed?</strong> (Ensure this includes all students, not just a subset).</li>
          <li><strong>Q3: How many companies visited the campus last year offering packages above ₹6 LPA?</strong> (Verifies product company footprint).</li>
          <li><strong>Q4: Do they count BPO and sales jobs under technical engineering placements?</strong></li>
        </ul>

        <h3>2. Academics and Autonomous Status</h3>
        <ul>
          <li><strong>Q5: Is the college autonomous?</strong> (Autonomous status means the syllabus is upgraded frequently to match modern tech needs).</li>
          <li><strong>Q6: Are modern technologies (React, Python, Cloud Computing) integrated into the core curriculum?</strong></li>
          <li><strong>Q7: What is the average research output or patents filed by the department?</strong></li>
        </ul>

        <h3>3. Infrastructure and Labs</h3>
        <ul>
          <li><strong>Q8: Are computer labs equipped with high-speed internet and modern hardware?</strong></li>
          <li><strong>Q9: Is there a dedicated product incubation or coding club room?</strong> (Indicates a robust coding environment).</li>
          <li><strong>Q10: Are library resources available digitally 24/7?</strong></li>
        </ul>

        <h3>4. College Fees and Hidden Costs</h3>
        <ul>
          <li><strong>Q11: What is the complete 4-year cost breakdown including tuition, exam fees, books, and lab fees?</strong></li>
          <li><strong>Q12: Are there mandatory hostel, mess, or transportation fees even if you are a day scholar?</strong></li>
          <li><strong>Q13: What scholarship options are available for merit toppers or reserved category students?</strong></li>
        </ul>

        <h3>5. Campus Life and Culture</h3>
        <ul>
          <li><strong>Q14: Does the college conduct annual national-level technical symposiums and hackathons?</strong></li>
          <li><strong>Q15: What is the strictness level regarding dress code and campus movement?</strong> (Many Chennai colleges are known for high discipline; ensure it matches your comfort level).</li>
        </ul>

        <h2 id="how-to-use">How to Gather This Information</h2>
        <p>Do not expect college admission representatives to give you negative answers. Use these three channels to verify the checklist points:</p>
        <ol>
          <li><strong>Talk to tea-stall vendors and local shopkeepers:</strong> The tea stalls right outside the college campus are where students hang out. Visiting them is an exceptional way to get the true campus reality.</li>
          <li><strong>Speak to 3rd-year students in the labs:</strong> During your campus tour, politely ask the guide to let you walk through the labs. Speak directly with a couple of 3rd or 4th-year students without faculty members listening in.</li>
          <li><strong>Download NIRF and NAAC Reports:</strong> Cross-check placement rates, graduation numbers, and PhD faculty counts on the NIRF and NAAC portals.</li>
        </ol>
      </SEOBlogArticle>
    </>
  );
}
