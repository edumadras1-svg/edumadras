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
import { mockColleges } from "@/lib/mockData";
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

  const relatedColleges = mockColleges.filter(c => guide.relatedCollegeIds.includes(c.id));

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

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TopNavBar />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32">
        <nav className="flex items-center gap-2 text-badge font-bold uppercase tracking-widest text-text-tertiary">
          <Link href="/" className="hover:text-teal transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/guides" className="hover:text-teal transition-colors">Guides</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-teal truncate max-w-[200px]">{guide.title}</span>
        </nav>
      </div>

      {/* Guide Hero */}
      <header className="max-w-7xl mx-auto px-6 pt-6 pb-12">
        <div className="max-w-3xl">
          <h1 className="text-display-sm md:text-display-md font-extrabold text-navy leading-tight tracking-tight">
            {guide.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-body-sm text-text-secondary font-medium">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal" />
              <span>Last Updated: {guide.lastUpdated}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal" />
              <span>{guide.sections.length} Sections</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto px-6 pb-24 flex flex-col lg:flex-row gap-12 relative">
        
        {/* Sidebar Table of Contents */}
        <aside className="lg:w-64 shrink-0 lg:sticky lg:top-32 h-fit order-2 lg:order-1">
          <div className="bg-surface-low rounded-3xl p-6 border border-border-ghost shadow-inner">
            <div className="flex items-center gap-2 mb-6 text-navy">
              <ListOrdered className="w-5 h-5" />
              <h2 className="text-badge font-extrabold uppercase tracking-widest">In this guide</h2>
            </div>
            <nav className="space-y-4">
              {guide.sections.map((section) => (
                <a 
                  key={section.slug}
                  href={`#${section.slug}`}
                  className="block text-body-sm font-semibold text-text-secondary hover:text-teal transition-all leading-tight border-l-2 border-transparent hover:border-teal/30 pl-4 py-0.5"
                >
                  {section.title}
                </a>
              ))}
              <a 
                href="#faqs"
                className="block text-body-sm font-semibold text-text-secondary hover:text-teal transition-all border-l-2 border-transparent pl-4 py-0.5"
              >
                Frequently Asked Questions
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <article className="flex-1 order-1 lg:order-2">
          <div className="space-y-16">
            {guide.sections.map((section, index) => (
              <React.Fragment key={section.slug}>
                <section id={section.slug} className="scroll-mt-32 animate-fade-in group">
                  <h2 className="text-h2 md:text-h1 font-bold text-navy mb-6 tracking-tight flex items-center gap-3">
                    <span className="text-teal/40 font-mono text-body-sm group-hover:text-teal transition-colors">0{index + 1}</span>
                    {section.title}
                  </h2>
                  <div className="text-body-md text-text-secondary leading-relaxed space-y-4">
                    <p>{section.content}</p>
                    {section.subsections?.map((sub, i) => (
                      <div key={i} className="mt-8 bg-surface-low p-6 rounded-2xl border-l-4 border-teal shadow-inner">
                        <h3 className="text-body-sm font-extrabold text-navy uppercase tracking-widest mb-2">{sub.title}</h3>
                        <p className="text-text-secondary leading-relaxed">{sub.content}</p>
                      </div>
                    ))}
                  </div>
                </section>
                
                {/* Inline CTA after the 3rd section */}
                {index === 2 && <InlineCTABanner />}
              </React.Fragment>
            ))}

            {/* FAQ Section */}
            <section id="faqs" className="scroll-mt-32 pt-8 border-t border-border-ghost animate-fade-in">
              <div className="flex items-center gap-3 mb-8">
                <HelpCircle className="w-8 h-8 text-teal" />
                <h2 className="text-h2 md:text-h1 font-bold text-navy tracking-tight">Frequently Asked Questions</h2>
              </div>
              <FAQAccordion items={guide.faqs} />
            </section>

            {/* Related Colleges Section */}
            <section className="pt-16 border-t border-border-ghost animate-fade-in">
              <h2 className="text-h2 font-bold text-navy mb-8 tracking-tight">Top Colleges Linked to this Guide</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedColleges.map((college) => (
                  <Link 
                    key={college.id}
                    href={`/colleges/${college.id}`}
                    className="group bg-white rounded-3xl border border-border-ghost p-5 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 block"
                  >
                    <div className="w-full h-32 rounded-2xl overflow-hidden mb-4 bg-surface-low relative">
                      {college.banner_url ? (
                        <img src={college.banner_url} alt={college.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full bg-navy flex items-center justify-center text-white font-bold text-2xl uppercase">
                           {college.name[0]}
                        </div>
                      )}
                      {college.rank && (
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-extrabold text-navy uppercase tracking-widest border border-border-ghost">
                          NIRF #{college.rank}
                        </div>
                      )}
                    </div>
                    <h3 className="text-body-sm font-bold text-navy line-clamp-1 group-hover:text-teal transition-colors">{college.name}</h3>
                    <div className="mt-2 flex items-center gap-1.5 text-caption text-text-tertiary">
                       <MapPin className="w-3.5 h-3.5" /> {college.city}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                       <div className="flex items-center gap-1 text-amber-500 font-bold text-badge">
                          <Star className="w-3.5 h-3.5 fill-amber-500 font-bold" /> {college.rating}
                       </div>
                       <span className="text-teal font-extrabold text-badge uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Details <ArrowRight className="w-3.5 h-3.5" />
                       </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </article>

      </div>
    </div>
  );
}
