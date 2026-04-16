"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  ExternalLink,
  MapPin,
  Trophy,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  rank: number;
  established_year: number;
  logo_url: string;
  banner_url: string;
  type: string;
  approvals: string[];
  rating: number;
  avg_package: number;
  highest_package: number;
  total_students: number;
  description: string;
  stream: string;
}

export default function AdminCollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchColleges = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .order('name');
      
    if (error) {
      console.error("Error fetching colleges", error);
    } else {
      setColleges(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this college? This action cannot be undone and will delete all associated courses and data.")) {
      const { error } = await supabase
        .from('colleges')
        .delete()
        .eq('id', id);
        
      if (!error) {
        fetchColleges();
      } else {
        alert("Failed to delete college. Make sure you have the required permissions.");
        console.error(error);
      }
    }
  };

  const filteredColleges = colleges.filter((college) =>
    (college.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (college.city || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in relative h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">College Management</h1>
          <p className="text-text-secondary text-caption font-medium">
            Manage your institutional database, rankings, and placement statistics.
          </p>
        </div>
        <Link
          href="/admin/colleges/new"
          className="h-11 px-6 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-teal/20 btn-press shrink-0"
        >
          <Plus className="w-4 h-4" /> Add New College
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-border-ghost flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search by name, city, or state..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal/30 focus:ring-4 focus:ring-teal/5 transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Colleges Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-ghost overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-teal" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-low/50 border-b border-border-ghost">
                <tr>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Institution</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Stream</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Ranking</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Avg. Package</th>
                  <th className="px-6 py-4 text-right text-badge text-text-tertiary font-bold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ghost">
                {filteredColleges.map((college) => (
                  <tr key={college.id} className="hover:bg-surface/30 transition-all group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-surface text-navy rounded-xl flex items-center justify-center font-bold text-lg border border-border-ghost ring-offset-2 ring-teal/0 group-hover:ring-2 transition-all overflow-hidden shrink-0">
                          {college.logo_url ? (
                            <img src={college.logo_url} alt={college.name} className="w-full h-full object-contain bg-white" />
                          ) : (
                            college.name?.[0] || 'C'
                          )}
                        </div>
                        <div>
                          <p className="text-body-sm font-bold text-navy line-clamp-1">{college.name}</p>
                          <div className="flex items-center gap-1 text-[11px] text-text-tertiary font-medium">
                            <MapPin className="w-3 h-3" /> {college.city}, {college.state}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-[11px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                        college.stream === 'Engineering' ? 'bg-blue-50 text-blue-600' :
                        college.stream === 'Medical' ? 'bg-teal-50 text-teal-600' :
                        'bg-amber-50 text-amber-600'
                      }`}>
                        {college.stream || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 text-navy font-bold text-body-sm">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        #{college.rank || 'N/A'}
                      </div>
                      {college.rank && <p className="text-[11px] text-text-tertiary uppercase tracking-tight font-medium">NIRF</p>}
                    </td>
                    <td className="px-6 py-5 font-bold text-navy text-body-sm">
                      {college.avg_package ? `₹${college.avg_package} LPA` : 'N/A'}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/colleges/${college.id}`}
                          target="_blank"
                          title="View on site"
                          className="p-2 text-text-tertiary hover:text-teal transition-colors rounded-lg hover:bg-teal/5"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link 
                          href={`/admin/colleges/${college.id}`}
                          title="Edit"
                          className="p-2 text-text-tertiary hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(college.id)}
                          title="Delete"
                          className="p-2 text-text-tertiary hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-2 text-text-tertiary group-hover:hidden transition-all">
                        <MoreVertical className="w-4 h-4 ml-auto" />
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredColleges.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-text-tertiary">
                      No colleges found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
