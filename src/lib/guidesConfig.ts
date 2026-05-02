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
  },
  "neet-counselling-2026": {
    slug: "neet-counselling-2026",
    title: "NEET 2026 Admission Guide — Medical College Counseling",
    description: "A comprehensive guide to NEET 2026 counseling for MBBS, BDS, and other medical courses in India. Learn about AIQ and State Quota processes.",
    lastUpdated: "April 20, 2026",
    sections: [
      {
        title: "Introduction to NEET Counseling",
        slug: "introduction",
        content: "NEET counseling is the gateway to all medical seats in India. The process is divided into two main categories: All India Quota (AIQ) conducted by MCC, and State Quota conducted by respective state authorities.",
      },
      {
        title: "Eligibility for Counseling",
        slug: "eligibility",
        content: "Only candidates who qualify for NEET by scoring the minimum cut-off percentile are eligible to participate in the counseling process. For General category, it's the 50th percentile, while for reserved categories, it's the 40th percentile.",
      },
      {
        title: "AIQ vs. State Quota",
        slug: "quotas",
        content: "The Medical Counseling Committee (MCC) conducts counseling for 15% All India Quota seats in Government colleges and 100% seats in Deemed/Central Universities. The remaining 85% seats in state government colleges are filled through State counseling.",
        subsections: [
          {
            title: "Tamil Nadu State Quota",
            content: "Conducted by the Selection Committee, Directorate of Medical Education (DME) for seats in Tamil Nadu government and private medical colleges."
          }
        ]
      },
      {
        title: "Registration Process",
        slug: "registration",
        content: "Register on the MCC website (for AIQ) or the DME website (for State Quota). You will need your NEET Roll Number, Application Number, and other personal details to create a profile.",
      },
      {
        title: "Choice Filling & Locking",
        slug: "choice-filling",
        content: "This is the most critical step. List your preferred colleges in order of priority. Once you are satisfied with the list, you must 'Lock' your choices before the deadline, otherwise they will be automatically locked.",
      },
      {
        title: "Documents for Verification",
        slug: "documents",
        content: "You must carry original documents for physical verification at the allotted college: NEET Admit Card, Scorecard, Class 10 & 12 Certificates, ID Proof, and 8 Passport size photos.",
      }
    ],
    faqs: [
      {
        question: "What is the security deposit for NEET counseling?",
        answer: "For Government colleges, it's typically ₹10,000 (General) or ₹5,000 (SC/ST). For Deemed Universities, it is ₹2,00,000."
      },
      {
        question: "How many rounds are there in NEET counseling?",
        answer: "Usually, there are four rounds: Round 1, Round 2, Mop-up Round, and Stray Vacancy Round."
      },
      {
        question: "Can I participate in both AIQ and State counseling?",
        answer: "Yes, you can participate in both simultaneously until you secure and join a seat in one of them."
      }
    ],
    relatedCollegeIds: ["4"]
  },
  "josaa-counselling-2026": {
    slug: "josaa-counselling-2026",
    title: "IIT-JEE 2026 Admission Guide — JoSAA Counseling Process",
    description: "Your ultimate guide to JoSAA 2026 counseling for admission to IITs, NITs, IIITs, and GFTIs. Learn about registration, seat allotment, and the business rules.",
    lastUpdated: "April 25, 2026",
    sections: [
      {
        title: "Overview of JoSAA",
        slug: "overview",
        content: "Joint Seat Allocation Authority (JoSAA) manages the common seat allocation for 118 premier technical institutes including 23 IITs, 31 NITs, IIEST Shibpur, 26 IIITs, and 38 Other-Government Funded Technical Institutes (Other-GFTIs).",
      },
      {
        title: "Eligibility for IITs vs NIT+ System",
        slug: "eligibility",
        content: "To be eligible for IITs, you must qualify in JEE Advanced. For the NIT+ system (NITs, IIITs, GFTIs), you only need a valid JEE Main rank. Additionally, candidates must have secured 75% marks in Class 12 (65% for SC/ST).",
      },
      {
        title: "The 6-Round Process",
        slug: "rounds",
        content: "JoSAA counseling typically consists of six rounds. After each round, candidates are allotted seats based on their rank and choices. If you receive an allotment, you must decide whether to Freeze, Float, or Slide.",
        subsections: [
          {
            title: "Freeze, Float, or Slide?",
            content: "Freeze means you accept the seat and don't want a better one. Float means you accept the seat but are open to a better college/branch. Slide means you accept the seat but are only open to a better branch in the SAME college."
          }
        ]
      },
      {
        title: "Registration & Choice Filling",
        slug: "registration",
        content: "Registration is free on the JoSAA portal. Choice filling is the most crucial part—ensure you list your preferred colleges in a logical descending order of preference. There is no limit to the number of choices.",
      },
      {
        title: "Seat Acceptance Fee",
        slug: "fees",
        content: "Once a seat is allotted, you must pay the Seat Acceptance Fee (SAF) online to confirm your interest. For 2026, it is expected to be ₹35,000 for General/OBC and ₹17,500 for SC/ST/PwD.",
      },
      {
        title: "CSAB Special Rounds",
        slug: "csab",
        content: "After the 6 rounds of JoSAA, if seats remain vacant in the NIT+ system (not IITs), two special rounds are conducted by the Central Seat Allocation Board (CSAB).",
      }
    ],
    faqs: [
      {
        question: "Can I change my choices after locking them?",
        answer: "No, once choices are locked or the deadline passes, you cannot modify them for any subsequent rounds of JoSAA."
      },
      {
        question: "What happens if I don't pay the seat acceptance fee?",
        answer: "If you fail to pay the fee or upload documents within the deadline, your allotted seat will be cancelled, and you will be out of the JoSAA process."
      },
      {
        question: "Is there a dual reporting requirement?",
        answer: "No, the entire document verification and seat acceptance process is now conducted online. Physical reporting is only required at the final allotted college after all rounds."
      }
    ],
    relatedCollegeIds: ["1", "2", "3"]
  }
};
