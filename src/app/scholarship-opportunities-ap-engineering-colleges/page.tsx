import type { Metadata } from "next";
import { buildArticleJsonLd } from "@/lib/seo/articleJsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOBlogArticle } from "@/components/seo/SEOBlogArticle";

const PAGE_URL = "https://www.edumadras.com/scholarship-opportunities-ap-engineering-colleges";
const H1 = "Scholarship Opportunities at AP Engineering Colleges: Complete Guide";
const BREADCRUMBS = [{ label: "Guides", href: "/guides" }, { label: "Scholarships AP", href: "/scholarship-opportunities-ap-engineering-colleges" }];
const FAQ_ITEMS = [
  { question: "What scholarships are available for engineering students in AP?", answer: "AP engineering students can avail Jagananna Vidya Deevena (full tuition reimbursement), Jagananna Vasathi Deevena (hostel allowance), Central Government Post Matric Scholarships (SC/ST/OBC), AICTE Pragati Scheme (for girls), and college-specific merit scholarships based on EAMCET or JEE ranks." },
  { question: "How do I apply for the Jagananna Vidya Deevena scholarship?", answer: "Applications are submitted through the Jagananna Ammavodi portal. Students need to provide Aadhaar-linked bank details (mother's account), income certificate showing family income below ₹2.5 LPA, and college admission confirmation under convener quota." },
  { question: "Can private college students get fee reimbursement in AP?", answer: "Yes, students admitted through convener quota (EAMCET counseling) at recognized private colleges are eligible for Jagananna Vidya Deevena fee reimbursement. However, management quota (Category-B) students are not eligible." },
  { question: "Are there scholarships specifically for girl engineering students in AP?", answer: "Yes, the AICTE Pragati Scheme provides up to ₹50,000 per year for female engineering students. Additionally, several AP colleges offer dedicated women-in-STEM scholarships and tuition waivers." },
];
const TOC = [
  { id: "scholarship-landscape", label: "Overview of AP Engineering Scholarships" },
  { id: "state-govt-schemes", label: "AP State Government Scholarship Schemes" },
  { id: "central-govt-schemes", label: "Central Government & AICTE Scholarships" },
  { id: "college-specific", label: "College-Specific Merit Scholarships" },
  { id: "application-checklist", label: "Application Checklist & Documents Required" },
];

export const metadata: Metadata = {
  title: "Engineering Scholarships in Andhra Pradesh 2025 — Complete Guide | EduMadras",
  description: "Complete guide to engineering scholarships in AP. Jagananna Vidya Deevena, Vasathi Deevena, AICTE Pragati, merit-based waivers & how to apply step by step.",
  keywords: "AP engineering scholarships 2025, Jagananna Vidya Deevena scholarship, AP engineering fee reimbursement, AICTE scholarships AP, merit scholarship engineering AP",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Scholarships for AP Engineering Students 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "article", locale: "en_IN" },
};

export default function Page() {
  const jsonLdSchemas = buildArticleJsonLd({ title: H1, description: metadata.description as string, pageUrl: PAGE_URL, datePublished: "2025-05-23", dateModified: "2025-05-23", breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOBlogArticle h1={H1} subtitle="A comprehensive, action-oriented guide to every scholarship and fee reimbursement scheme available for engineering students in Andhra Pradesh." publishDate="May 23, 2025" readTime="9 min read" category="Scholarships" breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} tableOfContents={TOC}>
        <p id="scholarship-landscape">Andhra Pradesh is one of the most student-friendly states in India when it comes to financial assistance for engineering education. Between state government fee reimbursement schemes, central government scholarships, and college-level merit waivers, eligible students can reduce their total B.Tech cost to near zero. This guide maps every available opportunity and provides step-by-step application instructions.</p>

        <h2 id="state-govt-schemes">AP State Government Scholarship Schemes</h2>
        <p>The AP government operates two flagship financial aid programs for higher education:</p>
        <h3>1. Jagananna Vidya Deevena (Fee Reimbursement)</h3>
        <ul>
          <li><strong>Coverage:</strong> 100% tuition fee reimbursement for engineering students admitted through EAMCET convener quota counseling.</li>
          <li><strong>Eligibility:</strong> Family annual income must be below ₹2.5 Lakhs. The student must be a domicile of Andhra Pradesh.</li>
          <li><strong>Disbursement:</strong> Funds are released directly to the mother&apos;s bank account in installments aligned with the college fee payment schedule.</li>
          <li><strong>Applicable Colleges:</strong> All APSCHE-recognized government and private engineering colleges where the student holds a convener quota seat.</li>
        </ul>
        <h3>2. Jagananna Vasathi Deevena (Maintenance Allowance)</h3>
        <ul>
          <li><strong>Coverage:</strong> ₹20,000 per year for hostel and accommodation expenses.</li>
          <li><strong>Eligibility:</strong> Same income criteria as Vidya Deevena. Students must be residing in hostels or rented accommodation away from their home district.</li>
          <li><strong>Disbursement:</strong> Annual lump-sum payment to the mother&apos;s bank account.</li>
        </ul>

        <h2 id="central-govt-schemes">Central Government &amp; AICTE Scholarships</h2>
        <p>In addition to state schemes, several central government programs are available to AP engineering students:</p>
        <table>
          <thead>
            <tr>
              <th>Scholarship Name</th>
              <th>Eligibility</th>
              <th>Benefit</th>
              <th>Application Portal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Post Matric Scholarship (SC/ST)</strong></td>
              <td>SC/ST students with family income &lt; ₹2.5 LPA</td>
              <td>Full tuition + ₹1,200/month maintenance</td>
              <td>National Scholarship Portal</td>
            </tr>
            <tr>
              <td><strong>Post Matric Scholarship (OBC)</strong></td>
              <td>OBC students with family income &lt; ₹1.5 LPA</td>
              <td>Full tuition + ₹750/month maintenance</td>
              <td>National Scholarship Portal</td>
            </tr>
            <tr>
              <td><strong>AICTE Pragati Scheme (Girls)</strong></td>
              <td>Female students in AICTE-approved colleges</td>
              <td>Up to ₹50,000/year</td>
              <td>AICTE Portal</td>
            </tr>
            <tr>
              <td><strong>AICTE Saksham Scheme (Differently Abled)</strong></td>
              <td>Students with 40%+ disability</td>
              <td>Up to ₹50,000/year</td>
              <td>AICTE Portal</td>
            </tr>
          </tbody>
        </table>

        <h2 id="college-specific">College-Specific Merit Scholarships</h2>
        <p>Many top AP private colleges offer their own merit-based financial aid to attract high-ranking students:</p>
        <ul>
          <li><strong>KL University:</strong> Offers 25% to 100% tuition fee waiver for students with EAMCET ranks under 5,000 or JEE Main scores above specific thresholds. Their &quot;KL Merit Scholarship&quot; program is one of the most generous in the state.</li>
          <li><strong>GITAM University:</strong> Provides merit scholarships ranging from ₹25,000 to full tuition waiver based on JEE Main percentiles and academic performance in board examinations.</li>
          <li><strong>Sree Vidyanikethan (Tirupati):</strong> Offers scholarship packages for district-toppers and EAMCET high-achievers, covering 50–100% of tuition fees.</li>
        </ul>

        <h2 id="application-checklist">Application Checklist &amp; Documents Required</h2>
        <p>To ensure you don&apos;t miss any scholarship deadlines, keep these documents ready before the admission season begins:</p>
        <ol>
          <li><strong>Aadhaar Card:</strong> Student&apos;s and mother&apos;s Aadhaar (linked to active bank account).</li>
          <li><strong>Income Certificate:</strong> Issued by the Tahsildar (Revenue Department) showing family annual income.</li>
          <li><strong>Caste Certificate:</strong> Required for SC/ST/OBC central scholarships (issued by Revenue Department).</li>
          <li><strong>EAMCET Rank Card / JEE Main Scorecard:</strong> For college-specific merit scholarship applications.</li>
          <li><strong>10+2 Marks Memo:</strong> Original and photocopies of intermediate board examination marks.</li>
          <li><strong>College Admission Letter:</strong> Official confirmation of admission under convener or management quota.</li>
          <li><strong>Bank Passbook (Mother&apos;s Account):</strong> For Jagananna scheme fund disbursement.</li>
        </ol>
        <p><strong>Pro Tip:</strong> Apply for all eligible scholarships simultaneously. Many students are eligible for both state and central schemes concurrently, which can cover tuition, hostel, and even monthly maintenance expenses completely.</p>
      </SEOBlogArticle>
    </>
  );
}
