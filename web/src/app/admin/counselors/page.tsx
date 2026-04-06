"use client";

import React, { useState } from "react";
import {
  Users,
  Plus,
  Star,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Mail,
  Phone,
} from "lucide-react";

const counselors = [
  { id: 1, name: "Dr. Priya Sharma", role: "Senior Counselor — Engineering", experience: "12+ years", studentsGuided: "5,000+", rating: 4.9, specialty: "Engineering", isActive: true, email: "dr.priya@edumadras.com" },
  { id: 2, name: "Rajesh Kumar", role: "Lead Counselor — Medical", experience: "8+ years", studentsGuided: "3,500+", rating: 4.8, specialty: "Medical", isActive: true, email: "rajesh.k@edumadras.com" },
  { id: 3, name: "Anita Desai", role: "Counselor — Management", experience: "6+ years", studentsGuided: "2,200+", rating: 4.7, specialty: "Management", isActive: false, email: "anita.d@edumadras.com" },
  { id: 4, name: "Vikram Singh", role: "Senior Counselor — Law", experience: "10+ years", studentsGuided: "4,000+", rating: 4.9, specialty: "Law", isActive: true, email: "vikram.s@edumadras.com" },
];

export default function AdminCounselorsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCounselors = counselors.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">Expert Counselors</h1>
          <p className="text-text-secondary text-caption font-medium">
            Manage your network of admissions experts and educational consultants.
          </p>
        </div>
        <button className="h-11 px-6 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-teal/20 btn-press shrink-0">
          <Plus className="w-4 h-4" /> Add Counselor
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-border-ghost flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search counselors by name or specialty..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal/30 focus:ring-4 focus:ring-teal/5 transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="h-10 px-4 flex items-center gap-2 text-text-secondary border border-border-ghost rounded-xl hover:bg-surface transition-colors font-semibold text-caption">
          <Filter className="w-4 h-4" /> Filter By specialty
        </button>
      </div>

      {/* Counselors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {filteredCounselors.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-border-ghost p-6 hover:shadow-lg transition-all group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-navy text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner ring-offset-2 ring-teal/0 group-hover:ring-2 transition-all">
                  {c.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-body-sm font-bold text-navy truncate">{c.name}</h3>
                  <div className={`mt-1.5 flex items-center gap-1.5 text-badge font-bold uppercase tracking-widest ${
                    c.isActive ? "text-green-600" : "text-text-tertiary"
                  }`}>
                    {c.isActive ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {c.isActive ? "Active Now" : "Currently Off"}
                  </div>
                </div>
              </div>
              <button className="p-2 text-text-tertiary hover:text-navy transition-colors rounded-lg hover:bg-surface">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-low rounded-xl p-3 border border-border-ghost/50">
                   <p className="text-[10px] text-text-tertiary uppercase tracking-widest font-bold">specialty</p>
                   <p className="text-caption font-bold text-navy truncate mt-0.5">{c.specialty}</p>
                </div>
                <div className="bg-surface-low rounded-xl p-3 border border-border-ghost/50">
                   <p className="text-[10px] text-text-tertiary uppercase tracking-widest font-bold">Experience</p>
                   <p className="text-caption font-bold text-navy truncate mt-0.5">{c.experience}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-body-sm">
                <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-500" />
                  {c.rating} 
                </div>
                <div className="flex items-center gap-1.5 text-text-tertiary font-medium">
                  <Users className="w-4 h-4" />
                  {c.studentsGuided} students
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-caption text-text-secondary">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="truncate">{c.email}</span>
                </div>
                <div className="flex items-center gap-2 text-caption text-text-secondary">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{c.phone || "Not Set"}</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-2.5 bg-navy text-white font-bold rounded-xl text-caption transition-all hover:bg-navy/90 btn-press">
              Manage Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
