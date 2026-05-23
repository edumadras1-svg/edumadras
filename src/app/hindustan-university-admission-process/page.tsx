import type { Metadata } from "next";
import { buildArticleJsonLd } from "@/lib/seo/articleJsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOBlogArticle } from "@/components/seo/SEOBlogArticle";

const PAGE_URL = "https://www.edumadras.com/hindustan-university-admission-process";
const H1 = "Hindustan University Admission 2025: How Hard Is It to Get In?";
const BREADCRUMBS = [{ label: "Colleges", href: "/colleges" }, { label: "Hindustan University", href: "/colleges/hindustan-institute-of-technology-science-chennai" }, { label: "Admission Process", href: "/hindustan-university-admission-process" }];
const FAQ_ITEMS = [
  { question: "How do I get admission to Hindustan University?", answer: "Admission to HITS is primarily through the HITSEEE entrance exam (online CBT covering Physics, Chemistry, Mathematics). JEE Main scores are also accepted. For management and design programmes, separate entrance tests or merit-based admission apply." },
  { question: "What is the HITSEEE exam pattern?", answer: "HITSEEE is a 90-minute online Computer Based Test (CBT) with questions from Physics, Chemistry, and Mathematics. It is conducted multiple times between April and June, giving students multiple attempt opportunities." },
  { question: "Is Hindustan University hard to get into?", answer: "Hindustan University has moderate admission difficulty. High-demand branches like CSE (AI/ML with IBM) and Aeronautical Engineering are more competitive, while branches like Mechanical, Civil, and EEE have wider availability. A decent HITSEEE score or JEE Main rank ensures admission." },
  { question: "Can I get direct admission to Hindustan University without HITSEEE?", answer: "Yes, students with valid JEE Main scores can apply directly. Additionally, HITS offers management quota seats where admission is based on 10+2 marks and an interview. International students can apply through the NRI/International quota." },
];
const TOC = [
  { id: "admission-overview", label: "Admission Pathways at HITS" },
  { id: "hitseee-guide", label: "HITSEEE Exam: Complete Guide" },
  { id: "eligibility-criteria", label: "Eligibility Criteria by Programme" },
  { id: "application-steps", label: "Step-by-Step Application Process" },
  { id: "scholarships", label: "Scholarships & Fee Concessions" },
];

export const metadata: Metadata = {
  title: "Hindustan University Admission 2025 — HITSEEE, Eligibility & Process | EduMadras",
  description: "Complete guide to Hindustan University admission 2025. HITSEEE exam pattern, eligibility criteria, application process, direct admission & scholarship details.",
  keywords: "hindustan university admission 2025, HITSEEE exam pattern, hindustan university eligibility, HITS chennai admission process, hindustan university direct admission",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Hindustan University Admission 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "article", locale: "en_IN" },
};

export default function Page() {
  const jsonLdSchemas = buildArticleJsonLd({ title: H1, description: metadata.description as string, pageUrl: PAGE_URL, datePublished: "2025-05-23", dateModified: "2025-05-23", breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOBlogArticle h1={H1} subtitle="Everything you need to know about getting into HITS Chennai — from HITSEEE exam preparation to direct admission pathways and scholarship eligibility." publishDate="May 23, 2025" readTime="8 min read" category="Admissions" breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} tableOfContents={TOC}>
        <p id="admission-overview">Hindustan University (HITS) is a NAAC A+ deemed university on OMR, Chennai, offering over 20 undergraduate programmes. If you&apos;re wondering how competitive admissions are and which pathway suits you best, this guide covers every route into HITS — from the HITSEEE entrance exam to management quota and JEE Main-based admission.</p>

        <h2 id="hitseee-guide">HITSEEE Exam: Complete Guide</h2>
        <p>The <strong>Hindustan Institute of Technology and Science Engineering Entrance Examination (HITSEEE)</strong> is the primary gateway to HITS B.Tech programmes:</p>
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>Mode</strong></td><td>Online Computer Based Test (CBT)</td></tr>
            <tr><td><strong>Duration</strong></td><td>90 minutes</td></tr>
            <tr><td><strong>Subjects</strong></td><td>Physics, Chemistry, Mathematics</td></tr>
            <tr><td><strong>Question Type</strong></td><td>Multiple Choice Questions (MCQs)</td></tr>
            <tr><td><strong>Exam Windows</strong></td><td>April – June (multiple slots available)</td></tr>
            <tr><td><strong>Application Fee</strong></td><td>₹1,000 (online application)</td></tr>
            <tr><td><strong>Also Accepted</strong></td><td>JEE Main scores (direct admission)</td></tr>
          </tbody>
        </table>

        <h2 id="eligibility-criteria">Eligibility Criteria by Programme</h2>
        <ul>
          <li><strong>B.Tech (All Branches):</strong> Pass in 10+2 with minimum 50% aggregate in Physics, Chemistry, and Mathematics. Valid HITSEEE or JEE Main score required.</li>
          <li><strong>B.Arch:</strong> Pass in 10+2 with Mathematics. Valid NATA or JEE Main Paper-2 score required.</li>
          <li><strong>BBA / BCA:</strong> Pass in 10+2 from any stream with minimum 50% aggregate. Admission based on merit in board marks.</li>
          <li><strong>MBA:</strong> Bachelor&apos;s degree in any discipline. Valid TANCET / CAT / MAT / XAT score required.</li>
          <li><strong>BA LLB (Hons):</strong> Pass in 10+2 from any stream. Admission through HITS entrance test or CLAT score.</li>
        </ul>

        <h2 id="application-steps">Step-by-Step Application Process</h2>
        <ol>
          <li><strong>Register Online:</strong> Visit the official HITS admission portal and create an account with your email and mobile number.</li>
          <li><strong>Fill Application Form:</strong> Enter personal details, academic records (10th and 12th marks), and programme preferences.</li>
          <li><strong>Pay Application Fee:</strong> ₹1,000 via online payment (credit/debit card, net banking, or UPI).</li>
          <li><strong>Schedule HITSEEE Slot:</strong> Choose your preferred exam date and time from available windows (April–June).</li>
          <li><strong>Appear for HITSEEE:</strong> Take the 90-minute online CBT from any approved test centre or from home (remote proctored option available).</li>
          <li><strong>Receive Rank Card:</strong> Results are declared within 2 weeks. Qualified candidates receive a rank-based counseling invitation.</li>
          <li><strong>Document Verification &amp; Fee Payment:</strong> Submit original certificates, pay the first semester fees, and confirm your seat.</li>
        </ol>

        <h2 id="scholarships">Scholarships &amp; Fee Concessions</h2>
        <p>HITS offers multiple scholarship pathways to reduce the financial burden:</p>
        <ul>
          <li><strong>HITSEEE Merit Scholarship:</strong> Top HITSEEE rank holders receive 25% to 100% tuition fee waiver, renewable annually based on academic performance.</li>
          <li><strong>JEE Main Score-Based:</strong> Students with JEE Main percentile above 85 are eligible for direct admission with merit-based fee concessions.</li>
          <li><strong>Sports &amp; Cultural Achievers:</strong> National/state-level athletes and performers receive dedicated scholarships covering up to 50% of tuition fees.</li>
          <li><strong>Sibling &amp; Alumni Discount:</strong> Children of HITS alumni or siblings of current students receive a 10% tuition fee concession.</li>
        </ul>
      </SEOBlogArticle>
    </>
  );
}
