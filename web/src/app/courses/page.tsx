"use client";

import { TopNavBar } from "@/components/TopNavBar";
import { mockCourses, mockColleges } from "@/lib/mockData";
import { BookOpen, GraduationCap, Building2, TrendingUp, IndianRupee, Clock, Search } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

function formatFee(val: number | null): string {
  if (!val) return "N/A";
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`;
  return `₹${val}`;
}

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const enrichedCourses = useMemo(() => {
    return mockCourses.map(course => {
      const college = mockColleges.find(c => c.id === course.college_id);
      return {
        ...course,
        collegeName: college?.name || "Unknown College",
        collegeCity: college?.city || "",
        collegeState: college?.state || "",
      };
    });
  }, []);

  const filteredCourses = useMemo(() => {
    if (!searchTerm) return enrichedCourses;
    const lower = searchTerm.toLowerCase();
    return enrichedCourses.filter(c => 
      c.master_courses.name.toLowerCase().includes(lower) ||
      c.collegeName.toLowerCase().includes(lower) ||
      c.master_courses.stream?.toLowerCase().includes(lower)
    );
  }, [searchTerm, enrichedCourses]);

  return (
    <div className="min-h-screen bg-surface-container">
      <TopNavBar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-10 text-center md:text-left animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy tracking-tight mb-4 hidden-border">
            Top <span className="text-teal">Courses</span> in Tamil Nadu 2026
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Discover the perfect academic program for your career goals. Filter through top courses from premium institutions.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-10 max-w-2xl animate-fade-in-up delay-100">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-text-tertiary" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-white/60 backdrop-blur-md text-text-primary rounded-2xl focus:ring-2 focus:ring-teal focus:outline-none transition-all card-shadow-md placeholder:text-text-tertiary"
            placeholder="Search by course name, college, or stream..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, idx) => (
              <div 
                key={course.id} 
                className="bg-white rounded-2xl p-6 card-shadow-sm hover:card-shadow-md transition-all duration-300 animate-fade-in-up flex flex-col h-full border border-border-ghost"
                style={{ animationDelay: `${(idx % 10) * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-teal/10 text-teal-dark font-semibold text-xs rounded-full mb-3 uppercase tracking-wider">
                      {course.master_courses.stream || "General"}
                    </span>
                    <h3 className="text-xl font-bold text-text-primary leading-tight line-clamp-2">
                      {course.master_courses.name}
                    </h3>
                  </div>
                </div>

                <Link href={`/colleges/${course.college_id}`} className="group flex items-start gap-2 mb-6 hover:text-teal transition-colors">
                  <Building2 className="w-4 h-4 mt-1 flex-shrink-0 text-text-tertiary group-hover:text-teal" />
                  <div>
                    <p className="text-sm font-semibold text-text-secondary group-hover:text-teal line-clamp-1">
                      {course.collegeName}
                    </p>
                    <p className="text-xs text-text-tertiary">
                      {course.collegeCity}, {course.collegeState}
                    </p>
                  </div>
                </Link>

                <div className="grid grid-cols-2 gap-4 mb-6 mt-auto">
                  <div className="bg-surface-low rounded-xl p-3 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-text-tertiary">
                      <IndianRupee className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">Total Fees</span>
                    </div>
                    <span className="text-sm font-bold text-navy">{formatFee(course.fee)}</span>
                  </div>
                  
                  <div className="bg-surface-low rounded-xl p-3 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-text-tertiary">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">Duration</span>
                    </div>
                    <span className="text-sm font-bold text-navy">{course.duration}</span>
                  </div>

                  <div className="bg-surface-low rounded-xl p-3 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-text-tertiary">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">Seats</span>
                    </div>
                    <span className="text-sm font-bold text-navy">{course.seats || "N/A"}</span>
                  </div>

                  <div className="bg-surface-low rounded-xl p-3 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-text-tertiary">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">Avg Pkg</span>
                    </div>
                    <span className="text-sm font-bold text-navy text-teal-dark">{formatFee(course.avg_package ? course.avg_package * 100000 : null)}</span>
                  </div>
                </div>

                <Link
                  href={`/colleges/${course.college_id}`}
                  className="w-full flex items-center justify-center py-3 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy-dark transition-colors focus-ring btn-press"
                >
                  View College Details
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-16 h-16 bg-surface-low rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-text-tertiary" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">No courses found</h3>
              <p className="text-text-secondary max-w-sm mx-auto">
                We couldn't find any courses matching your search "{searchTerm}". Try different keywords.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
