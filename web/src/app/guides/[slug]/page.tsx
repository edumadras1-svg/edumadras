import { TopNavBar } from "@/components/TopNavBar";
import { ChevronRight, Calendar, User, Clock } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guideTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  
  return {
    title: `${guideTitle} | EduMadras`,
    description: `Expert guide on ${guideTitle} for 2026. Get the latest admissions tips, requirements, and insights from EduMadras.`,
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guideTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNavBar />

      <div className="bg-surface px-4 py-3">
        <div className="container-mobile">
          <nav className="flex items-center gap-1.5 text-caption" aria-label="Breadcrumb">
            <Link href="/" className="text-blue-mid hover:underline">Home</Link>
            <ChevronRight className="w-3 h-3 text-text-tertiary" />
            <span className="text-text-secondary font-medium">Guides</span>
            <ChevronRight className="w-3 h-3 text-text-tertiary" />
            <span className="text-text-secondary font-medium truncate max-w-[200px]">{guideTitle}</span>
          </nav>
        </div>
      </div>

      <main className="container-mobile py-8 pb-32">
        <article className="max-w-3xl mx-auto">
          <header className="mb-10">
            <h1 className="text-h1 text-text-primary mb-4">{guideTitle}</h1>
            
            <div className="flex items-center gap-4 text-caption text-text-tertiary">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Updated April 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>EduMadras Expert</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>5 min read</span>
              </div>
            </div>
          </header>

          <div className="prose prose-slate max-w-none space-y-6 text-body-lg text-text-secondary">
            <p>
              Navigating the college admissions landscape in 2026 requires up-to-date information and strategic planning. Whether you are looking for engineering excellence or medical expertise, this guide provides the foundational knowledge needed to make informed decisions.
            </p>
            <h2 className="text-h3 text-text-primary mt-8">Key Considerations for 2026</h2>
            <p>
              The admission process has evolved to include more holistic reviews of student profiles. Beyond entrance exam scores like JEE and NEET, colleges are increasingly looking at extra-curricular achievements and community impact.
            </p>
            <div className="bg-surface-low rounded-2xl p-6 my-8">
              <h3 className="text-label font-bold text-navy mb-2">Pro Tip</h3>
              <p className="text-body-sm italic">
                Always verify the latest accreditation and approval status (AICTE/UGC/MCI) before finalizing your application. EduMadras provides a simplified verification badge for all listed institutions.
              </p>
            </div>
            <p>
              We recommend starting your research at least six months before the application deadlines to ensure you have all documentation ready and can participate in any required counseling sessions.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-border-ghost text-center">
            <h2 className="text-h3 text-text-primary mb-4">Want Personalized Guidance?</h2>
            <p className="text-body-sm text-text-secondary mb-6">
              Our expert counselors are available for free 1-on-1 sessions.
            </p>
            <Link 
              href="/counselors" 
              className="inline-block px-10 py-3 bg-teal hover:bg-teal/90 text-white font-semibold rounded-xl transition-all shadow-md btn-press"
            >
              Talk to a Counselor
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
