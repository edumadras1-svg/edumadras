"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TopNavBar } from "@/components/TopNavBar";
import { InlineCTABanner } from "@/components/InlineCTABanner";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ApplicationModal } from "@/components/ApplicationModal";
import {
  ChevronRight, BookOpen, Clock, Calendar, Tag,
  ArrowUpRight, Phone, Share2, Bookmark,
} from "lucide-react";

interface TableOfContentsItem {
  id: string;
  label: string;
}

interface SEOBlogArticleProps {
  h1: string;
  subtitle: string;
  publishDate: string;
  readTime: string;
  category: string;
  breadcrumbs: { label: string; href: string }[];
  faqItems: { question: string; answer: string }[];
  pageUrl: string;
  tableOfContents?: TableOfContentsItem[];
  children: React.ReactNode;
}

export function SEOBlogArticle({
  h1,
  subtitle,
  publishDate,
  readTime,
  category,
  breadcrumbs,
  faqItems,
  pageUrl,
  tableOfContents,
  children,
}: SEOBlogArticleProps) {
  const [isCounselingOpen, setIsCounselingOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <TopNavBar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#002444] via-[#1B3A5C] to-[#1a7a6e] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400 rounded-full blur-[100px]" />
        </div>
        <div className="container-mobile relative py-12 md:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                <ChevronRight className="w-3.5 h-3.5" />
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-white/90 font-medium">{b.label}</span>
                ) : (
                  <Link href={b.href} className="hover:text-white transition-colors">{b.label}</Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal/20 text-teal-light rounded-full text-xs font-bold uppercase tracking-wider border border-teal/30">
              <Tag className="w-3 h-3" />
              {category}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight max-w-4xl">
            {h1}
          </h1>
          <p className="text-base md:text-lg text-white/70 mt-4 max-w-2xl leading-relaxed font-medium">
            {subtitle}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mt-8 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {publishDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              EduMadras Research
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container-mobile py-10 px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Article Body */}
          <article className="flex-1 min-w-0 max-w-4xl">
            {/* Table of Contents - Mobile */}
            {tableOfContents && tableOfContents.length > 0 && (
              <div className="lg:hidden mb-10 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="text-sm font-extrabold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal" />
                  Table of Contents
                </h2>
                <nav className="space-y-2">
                  {tableOfContents.map((item, i) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-teal transition-colors py-1"
                    >
                      <span className="w-6 h-6 bg-gray-50 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400 shrink-0">
                        {i + 1}
                      </span>
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Prose Content */}
            <div className="prose prose-lg max-w-none
              prose-headings:font-extrabold prose-headings:text-[#1E293B] prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:scroll-mt-24
              prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-base
              prose-li:text-gray-600 prose-li:text-base
              prose-strong:text-[#1E293B]
              prose-a:text-teal prose-a:no-underline hover:prose-a:underline
              prose-table:w-full prose-table:overflow-x-auto
              prose-th:bg-navy prose-th:text-white prose-th:text-xs prose-th:font-bold prose-th:uppercase prose-th:tracking-wider prose-th:py-3 prose-th:px-4 prose-th:text-left
              prose-td:py-3 prose-td:px-4 prose-td:text-sm prose-td:border-b prose-td:border-gray-100
              prose-tr:hover:bg-gray-50 prose-tr:transition-colors
              prose-blockquote:border-l-4 prose-blockquote:border-teal prose-blockquote:bg-teal/5 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
            ">
              {children}
            </div>

            {/* Mid-article CTA */}
            <div className="my-14">
              <div className="bg-gradient-to-br from-navy to-navy-dark rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal/10 rounded-full blur-3xl" />
                <h2 className="text-2xl md:text-3xl font-extrabold mb-3 relative">Need Help Choosing the Right College?</h2>
                <p className="text-white/60 max-w-xl mx-auto mb-8 relative">Our expert counselors have guided 10,000+ students. Get free, personalized admission guidance today.</p>
                <button
                  onClick={() => setIsCounselingOpen(true)}
                  className="h-14 px-10 bg-teal hover:bg-teal/90 text-white font-bold rounded-2xl transition-all shadow-xl shadow-teal/20 btn-press text-base relative"
                >
                  Talk to Expert Counselor — Free
                </button>
              </div>
            </div>

            {/* FAQs */}
            {faqItems.length > 0 && (
              <section className="mt-16">
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E293B] mb-2">Frequently Asked Questions</h2>
                  <p className="text-gray-500">Everything you need to know before making your decision.</p>
                </div>
                <div className="max-w-3xl mx-auto">
                  <FAQAccordion items={faqItems} />
                </div>
              </section>
            )}

            {/* Related Pages / Internal Linking */}
            <section className="mt-16 border-t border-gray-100 pt-10">
              <h3 className="text-xl font-extrabold text-[#1E293B] mb-6">Related Pages</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Top 10 Engineering Colleges Chennai", href: "/top-10-engineering-colleges-chennai" },
                  { label: "Best Engineering Colleges Chennai", href: "/best-engineering-colleges-chennai" },
                  { label: "Placement-Wise Engineering Chennai", href: "/engineering-colleges-chennai-placement" },
                  { label: "Low Fee Engineering Chennai", href: "/engineering-colleges-chennai-low-fees" },
                  { label: "CSE Colleges in Chennai", href: "/cse-colleges-chennai" },
                  { label: "Private Engineering Colleges Chennai", href: "/private-engineering-colleges-chennai" },
                  { label: "Engineering Without JEE Chennai", href: "/engineering-colleges-chennai-without-jee" },
                  { label: "Tier 1 Engineering Colleges Chennai", href: "/tier-1-engineering-colleges-chennai" },
                  { label: "Top 50 Engineering Colleges Chennai", href: "/top-50-engineering-colleges-chennai" },
                  { label: "NIRF Ranking 2025 Engineering", href: "/nirf-ranking-2025-engineering-colleges" },
                ].map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 hover:border-teal/30 hover:shadow-sm group transition-all"
                  >
                    <span className="text-sm font-bold text-gray-700 group-hover:text-teal transition-colors">
                      {link.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-teal transition-colors" />
                  </Link>
                ))}
              </div>
            </section>

            <div className="mt-12">
              <InlineCTABanner />
            </div>
          </article>

          {/* Sidebar - Desktop TOC */}
          {tableOfContents && tableOfContents.length > 0 && (
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="text-sm font-extrabold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-teal" />
                    In This Article
                  </h2>
                  <nav className="space-y-1.5">
                    {tableOfContents.map((item, i) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex items-start gap-2.5 text-sm text-gray-500 hover:text-teal transition-colors py-1.5 leading-snug"
                      >
                        <span className="w-5 h-5 bg-gray-50 rounded flex items-center justify-center text-[10px] font-bold text-gray-400 shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Sidebar CTA */}
                <div className="mt-6 bg-gradient-to-br from-teal/10 to-teal/5 rounded-2xl border border-teal/20 p-6 text-center">
                  <p className="text-sm font-extrabold text-navy mb-2">Need Expert Advice?</p>
                  <p className="text-xs text-gray-500 mb-4">Free counseling for 2025–2026 admissions</p>
                  <button
                    onClick={() => setIsCounselingOpen(true)}
                    className="w-full h-11 bg-teal hover:bg-teal/90 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-teal/20 btn-press flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Get Free Callback
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>

      <ApplicationModal
        isOpen={isCounselingOpen}
        onClose={() => setIsCounselingOpen(false)}
        collegeName="EduMadras"
        collegeId="edumadras-general"
        courses={[]}
        mode="counseling"
      />
    </div>
  );
}
