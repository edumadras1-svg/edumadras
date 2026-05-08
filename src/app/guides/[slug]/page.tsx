import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ChevronRight, 
  Clock, 
  MapPin, 
  Star, 
  ArrowRight, 
  BookOpen, 
  ListOrdered,
  HelpCircle
} from "lucide-react";
import { guides } from "@/lib/guidesConfig";
import { supabase } from "@/lib/supabase/client";
import { InlineCTABanner } from "@/components/InlineCTABanner";
import { FAQAccordion } from "@/components/FAQAccordion";
import { TopNavBar } from "@/components/TopNavBar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides[slug];
  
  if (!guide) return { title: "Guide Not Found | EduMadras" };

  return {
    title: `${guide.title} | EduMadras`,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
    }
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = guides[slug];

  if (!guide) notFound();

  const { data: relatedCollegesData } = await supabase
    .from("colleges")
    .select("*")
    .in("id", guide.relatedCollegeIds);

  const relatedColleges = relatedCollegesData || [];

  // JSON-LD for FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guide.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // JSON-LD for Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guide.title,
    "description": guide.description,
    "author": {
      "@type": "Organization",
      "name": "EduMadras Expert Counselors"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EduMadras",
      "logo": {
        "@type": "ImageObject",
        "url": "https://edumadras.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://edumadras.com/guides/${slug}`
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <TopNavBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-border-ghost px-4 py-3">
        <div className="container-mobile">
          <nav className="flex items-center gap-1.5 text-caption" aria-label="Breadcrumb">
            <Link href="/" className="text-blue-mid hover:underline">Home</Link>
            <ChevronRight className="w-3 h-3 text-text-tertiary" />
            <span className="text-text-secondary font-medium">Guides</span>
            <ChevronRight className="w-3 h-3 text-text-tertiary" />
            <span className="text-text-secondary font-medium truncate max-w-[200px]">{guide.title}</span>
          </nav>
        </div>
      </div>

      <main className="container-mobile py-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Section */}
            <header className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal/10 text-teal rounded-full text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                Comprehensive Guide
              </div>
              <h1 className="text-h1 text-text-primary leading-tight">{guide.title}</h1>
              <p className="text-body-lg text-text-secondary">{guide.description}</p>
              
              <div className="flex items-center gap-6 pt-2 border-t border-border-ghost mt-6 text-sm text-text-tertiary">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>5 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-navy text-white rounded-full flex items-center justify-center font-bold text-xs">E</div>
                  <span>EduMadras Experts</span>
                </div>
              </div>
            </header>

            {/* Guide Body */}
            <article className="prose prose-slate max-w-none prose-headings:text-navy prose-h2:text-h2 prose-h2:mt-8 prose-h2:mb-4 prose-p:text-body-lg prose-p:text-text-secondary prose-p:leading-relaxed prose-li:text-text-secondary prose-a:text-teal hover:prose-a:text-teal-light">
              {guide.sections.map((section, index) => (
                <div key={section.slug || index} className="mb-8">
                  <h2 id={section.slug}>{section.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                  {section.subsections?.map((sub, subIndex) => (
                    <div key={subIndex} className="mt-4 ml-4">
                      <h3 className="text-h3 text-navy mb-2">{sub.title}</h3>
                      <div dangerouslySetInnerHTML={{ __html: sub.content }} />
                    </div>
                  ))}
                </div>
              ))}
            </article>

            {/* Inline CTA Form inserted naturally within the content flow */}
            <div className="my-10">
              <InlineCTABanner 
                title={`Get Free Counseling for ${guide.title.includes('Engineering') ? 'Engineering' : 'Medical'} Admissions`}
                subtitle="Our experts have helped 5000+ students secure their dream seats."
                context={`Guide: ${guide.title}`}
              />
            </div>

            {/* FAQ Section */}
            {guide.faqs && guide.faqs.length > 0 && (
              <section className="mt-12 bg-white p-8 rounded-2xl border border-border-ghost shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center text-teal">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h2 className="text-h2 text-navy">Frequently Asked Questions</h2>
                </div>
                <FAQAccordion faqs={guide.faqs} />
              </section>
            )}
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Table of Contents / Quick Links (Optional, if you want to extract headings) */}
            <div className="bg-white p-6 rounded-2xl border border-border-ghost shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border-ghost">
                <ListOrdered className="w-5 h-5 text-teal" />
                <h3 className="text-lg font-bold text-navy">In This Guide</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="text-text-secondary hover:text-teal cursor-pointer transition-colors">Overview & Requirements</li>
                <li className="text-text-secondary hover:text-teal cursor-pointer transition-colors">Top Colleges to Consider</li>
                <li className="text-text-secondary hover:text-teal cursor-pointer transition-colors">Admission Process 2026</li>
                <li className="text-text-secondary hover:text-teal cursor-pointer transition-colors">Frequently Asked Questions</li>
              </ul>
            </div>

            {/* Top Recommended Colleges Mini-Cards */}
            {relatedColleges.length > 0 && (
              <div className="bg-gradient-hero p-6 rounded-2xl text-white shadow-card">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-orange" fill="currentColor" />
                  Top Picks for You
                </h3>
                <div className="space-y-3">
                  {relatedColleges.slice(0, 3).map(college => (
                    <Link href={`/colleges/${college.id}`} key={college.id} className="block bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors border border-white/5">
                      <p className="font-bold text-sm truncate">{college.name}</p>
                      <div className="flex justify-between items-center mt-2 text-xs text-white/70">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {college.city}</span>
                        <span className="font-medium bg-white/20 px-2 py-0.5 rounded-full">{college.avg_package ? `${college.avg_package} LPA` : "N/A"}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href={`/streams/${guide.title.includes('Engineering') ? 'engineering' : 'medical'}`} className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-white text-navy font-bold rounded-xl text-sm hover:bg-surface transition-colors">
                  View All Colleges <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </aside>

        </div>
      </main>
    </div>
  );
}
