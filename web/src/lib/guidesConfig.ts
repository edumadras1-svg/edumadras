export interface GuideSection {
  title: string;
  slug: string;
  content: string;
  subsections?: { title: string; content: string }[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: GuideSection[];
  faqs: FAQ[];
  relatedCollegeIds: string[];
}

export const guides: Record<string, Guide> = {
  "tnea-counselling-2026": {
    slug: "tnea-counselling-2026",
    title: "How to Apply for TNEA 2026 — Complete Step-by-Step Guide",
    description: "Learn everything about Tamil Nadu Engineering Admissions (TNEA) 2026. Detailed steps on eligibility, registration, certificate verification, and choice filling.",
    lastUpdated: "April 06, 2026",
    sections: [
      {
        title: "Eligibility",
        slug: "eligibility",
        content: "Candidates must have passed the HSC (Academic) or its equivalent with a minimum average percentage in Mathematics, Physics, and Chemistry. Vocational stream candidates are also eligible under specific criteria set by the Directorate of Technical Education (DoTE), Tamil Nadu.",
        subsections: [
          {
            title: "Nativity Criteria",
            content: "Tamil Nadu candidates who have passed VIII, IX, X, XI, and XII Std. in Tamil Nadu are eligible to apply. Others must produce a Nativity Certificate."
          }
        ]
      },
      {
        title: "Important Dates",
        slug: "important-dates",
        content: "The TNEA 2026 schedule typically begins in the first week of May with online registration. The rank list is usually published by mid-June, followed by multiple rounds of online counseling.",
      },
      {
        title: "Documents Required",
        slug: "documents-required",
        content: "Ensure you have scanned copies of the following: Class 10 & 12 Marksheets, Transfer Certificate, Community Certificate (if applicable), Nativity Certificate (if applicable), and First Graduate Certificate (if applying for tuition fee waiver).",
      },
      {
        title: "How to Register",
        slug: "how-to-register",
        content: "Visit the official TNEA portal. Click on 'New Registration', enter your basic details, and pay the registration fee (₹500 for General, ₹250 for SC/ST). You will receive a User ID and Password for further login.",
      },
      {
        title: "Allotment Process",
        slug: "allotment-process",
        content: "Counseling is conducted in four rounds based on rank. During your round, you must add and lock your college choices. A tentative allotment will be released, which you must confirm through the portal.",
      },
      {
        title: "What to Do After Allotment",
        slug: "what-to-do-after-allotment",
        content: "Once you confirm your seat, download the provisional allotment order. Report to the allotted college within the specified date with original documents and pay the admission fees to secure your seat.",
      }
    ],
    faqs: [
      {
        question: "What is the minimum mark for TNEA 2026?",
        answer: "For General category, a minimum average of 45% in PCM is required. For BC/BCM/MBC/DNC/SC/SCA/ST, the minimum is 40%."
      },
      {
        question: "Is there an entrance exam for TNEA?",
        answer: "No, TNEA is based entirely on the 12th standard (HSC) board exam marks. There is no separate entrance test."
      },
      {
        question: "Can other state students apply for TNEA?",
        answer: "Yes, but they will be considered under the Open Category (OC) and must fulfill specific nativity or residency requirements."
      },
      {
        question: "What is the fee for TNEA registration?",
        answer: "The registration fee is ₹500 for General/OBC candidates and ₹250 for SC/SCA/ST candidates belonging to Tamil Nadu."
      },
      {
        question: "How many choices can I fill in TNEA counseling?",
        answer: "There is no limit to the number of choices you can fill. It is recommended to fill as many as possible to ensure a seat."
      }
    ],
    relatedCollegeIds: ["1", "8", "9"]
  }
};
