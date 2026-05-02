"use client";

import Link from "next/link";
import { Star, MapPin, GraduationCap, Stethoscope, Briefcase, Scale, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ApplicationModal } from "./ApplicationModal";

const streamConfig: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  Engineering: { bg: "bg-stream-engineering", text: "text-stream-engineering-text", icon: GraduationCap },
  Medical: { bg: "bg-stream-medical", text: "text-stream-medical-text", icon: Stethoscope },
  Management: { bg: "bg-stream-management", text: "text-stream-management-text", icon: Briefcase },
  Law: { bg: "bg-stream-law", text: "text-stream-law-text", icon: Scale },
  Design: { bg: "bg-stream-design", text: "text-stream-design-text", icon: Palette },
};

interface CollegeCardProps {
  id?: string;
  name: string;
  location: string;
  rating: number;
  fees: string;
  package: string;
  rank?: number;
  stream?: string;
  approvals?: string[];
  bannerUrl?: string;
  logoUrl?: string;
  totalStudents?: string;
  isRecommended?: boolean;
  className?: string;
}

export function CollegeCard({
  id,
  name,
  location,
  rating,
  fees,
  package: avgPackage,
  rank,
  stream = "Engineering",
  approvals = ["AICTE", "UGC"],
  bannerUrl,
  logoUrl,
  totalStudents,
  isRecommended,
  className,
}: CollegeCardProps) {
  const streamStyle = streamConfig[stream] || streamConfig.Engineering;
  const StreamIcon = streamStyle.icon;
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 3);

  const [isCounselingModalOpen, setIsCounselingModalOpen] = useState(false);

  const detailHref = id ? `/colleges/${id}` : "#";

  return (
    <>
      <Link
        href={detailHref}
        className={cn(
          "block bg-surface-card rounded-[14px] shadow-card overflow-hidden card-hover relative cursor-pointer",
          isRecommended && "ring-2 ring-amber-400",
          className
        )}
      >
        {/* Banner Image Area */}
        <div className="relative h-40 bg-surface-container overflow-hidden">
        {bannerUrl ? (
          <img src={bannerUrl} alt={`${name} campus`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-navy/20 via-teal/10 to-transparent" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Stream Badge */}
        <div className={cn("absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-badge", streamStyle.bg, streamStyle.text)}>
          <StreamIcon className="w-3 h-3" />
          {stream}
        </div>

        {/* Rank Badge */}
        {rank && (
          <div className="absolute top-3 right-3 bg-white/95 text-navy text-badge px-2.5 py-1 rounded-full font-bold shadow-sm">
            Rank #{rank}
          </div>
        )}

        {/* Recommended Badge */}
        {isRecommended && (
          <div className="absolute bottom-3 right-3 bg-amber-400 text-amber-900 text-badge px-2 py-1 rounded-full">
            ⭐ Recommended
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 relative">
        {/* College Logo */}
        <div className="absolute -top-7 left-4 w-14 h-14 bg-white rounded-[10px] shadow-soft flex items-center justify-center overflow-hidden">
          {logoUrl ? (
            <img src={logoUrl} alt={`${name} logo`} className="w-10 h-10 object-contain" />
          ) : (
            <span className="text-sm font-bold text-navy">{initials}</span>
          )}
        </div>

        <div className="mt-8">
          {/* Name & Location */}
          <h3 className="text-lg font-semibold text-text-primary leading-tight line-clamp-2">{name}</h3>
          <div className="flex items-center gap-1 mt-1 text-text-secondary">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="text-label truncate">{location}</span>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-1 mt-3 text-label text-text-secondary">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-teal">{avgPackage}</span>
              <span className="text-text-tertiary">Avg Pkg</span>
            </div>
            <span className="text-border-light mx-1">|</span>
            <div className="flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-text-primary">{rating}</span>
            </div>
            {totalStudents && (
              <>
                <span className="text-border-light mx-1">|</span>
                <span>{totalStudents}</span>
              </>
            )}
          </div>

          {/* Approval Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {approvals.map((approval) => (
              <span
                key={approval}
                className="text-badge bg-surface-low text-text-secondary px-2 py-0.5 rounded"
              >
                {approval}
              </span>
            ))}
          </div>

          {/* CTA Row */}
          <div className="flex gap-2.5 mt-4">
            <span className="flex-1 h-10 flex items-center justify-center text-sm font-semibold text-navy bg-surface-low hover:bg-surface-container rounded-[10px] transition-colors btn-press">
              View Details
            </span>
            <button
              onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation(); 
                setIsCounselingModalOpen(true);
              }}
              className="flex-1 h-10 flex items-center justify-center text-sm font-semibold text-white bg-navy hover:bg-navy-dark rounded-[10px] transition-colors btn-press focus-ring"
            >
              Get Counseling
            </button>
          </div>
        </div>
      </div>
    </Link>

      {/* Counseling Modal */}
      <ApplicationModal
        isOpen={isCounselingModalOpen}
        onClose={() => setIsCounselingModalOpen(false)}
        collegeId={id || "general"}
        collegeName={name}
        courses={[{ id: "1", name: stream }]}
        mode="counseling"
      />
    </>
  );
}
