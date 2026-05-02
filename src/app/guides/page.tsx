import React from "react";
import { TopNavBar } from "@/components/TopNavBar";
import Link from "next/link";
import { guides } from "@/lib/guidesConfig";
import { ArrowRight, Clock, BookOpen, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Expert Admission Guides & Blogs | EduMadras",
  description: "Comprehensive guides for TNEA, NEET, JEE, and other major college admissions in India.",
};

export default function GuidesListPage() {
  const guideList = Object.values(guides);

  return (
    <div className="bg-surface min-h-screen pb-20">
      <TopNavBar />
      
      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-mobile text-center">
          <span className="text-badge text-teal-light tracking-widest uppercase">Expert Knowledge</span>
          <h1 className="text-display-sm md:text-display-md text-white mt-4 font-extrabold tracking-tight">
            College <span className="text-teal-light">Admission</span> Guides
          </h1>
          <p className="text-white/60 mt-4 max-w-xl mx-auto text-body-sm md:text-base">
            Detailed, step-by-step guides curated by experts to help you navigate through the complex admission processes of India's top colleges.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <main className="container-mobile -mt-10 md:-mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guideList.map((guide) => (
            <Link 
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group bg-white rounded-[2rem] border border-border-ghost shadow-soft hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full"
            >
              {/* Card Image/Header */}
              <div className="h-48 bg-navy relative overflow-hidden flex items-center justify-center p-8">
                 <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <GraduationCap className="w-20 h-20 text-white/10 absolute -bottom-4 -right-4 rotate-12 group-hover:scale-125 transition-transform duration-700" />
                 <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                       <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-badge text-teal font-bold uppercase tracking-widest bg-white px-3 py-1 rounded-full">Admission Guide</span>
                 </div>
              </div>

              {/* Card Content */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-caption text-text-tertiary mb-4 font-bold uppercase tracking-tighter">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {guide.lastUpdated}
                  </div>
                  <div className="w-1 h-1 bg-border-ghost rounded-full" />
                  <span>{guide.sections.length} Sections</span>
                </div>
                
                <h2 className="text-h3 text-navy font-bold line-clamp-2 group-hover:text-teal transition-colors mb-3">
                  {guide.title}
                </h2>
                
                <p className="text-body-sm text-text-secondary line-clamp-3 mb-6 flex-1">
                  {guide.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-border-ghost">
                  <span className="text-teal font-extrabold text-badge uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {guideList.length === 0 && (
          <div className="py-24 text-center">
            <BookOpen className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
            <h3 className="text-h3 text-navy font-bold">More Guides Coming Soon</h3>
            <p className="text-text-secondary mt-2">Our experts are working on detailed guides for NEET, JEE, and CAT.</p>
          </div>
        )}
      </main>
    </div>
  );
}
