"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Plus,
  Search,
  Filter,
  Loader2,
  Clock,
  X,
  User,
  Phone,
  Mail,
  BookOpen,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  verified: "bg-blue-50 text-blue-600",
  admitted: "bg-green-50 text-green-600",
  rejected: "bg-red-50 text-red-600",
};

const statusOptions = ["all", "pending", "verified", "admitted", "rejected"];

export default function AdmissionsPage() {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [partner, setPartner] = useState<any>(null);

  // Add form state
  const [addForm, setAddForm] = useState({
    student_name: "",
    student_phone: "",
    student_email: "",
    course: "",
  });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    setIsLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: partnerData } = await supabase
      .from("partners")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!partnerData) return;
    setPartner(partnerData);

    let query = supabase
      .from("partner_admissions")
      .select("*, colleges(name)")
      .eq("partner_id", partnerData.id)
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data } = await query;
    setAdmissions(data || []);
    setIsLoading(false);
  };

  const handleAddReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError(null);

    if (!partner) return;

    const { error } = await supabase.from("partner_admissions").insert({
      partner_id: partner.id,
      student_name: addForm.student_name,
      student_phone: addForm.student_phone,
      student_email: addForm.student_email,
      course: addForm.course || null,
      status: "pending",
      commission_amount: partner.commission_rate || 2000,
    });

    if (error) {
      setAddError(error.message);
      setAddLoading(false);
      return;
    }

    setShowAddModal(false);
    setAddForm({ student_name: "", student_phone: "", student_email: "", course: "" });
    setAddLoading(false);
    fetchData();
  };

  const filteredAdmissions = admissions.filter((adm) =>
    searchQuery
      ? adm.student_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adm.student_phone?.includes(searchQuery)
      : true
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-navy tracking-tight">Admissions</h1>
          <p className="text-text-secondary mt-1 text-body-sm font-medium">
            Track all your student referrals
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl transition-all btn-press shadow-lg shadow-teal/20 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Referral
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or phone..."
            className="w-full pl-11 pr-4 py-2.5 bg-white rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-text-tertiary shrink-0" />
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-badge font-bold transition-all capitalize ${
                filter === status
                  ? "bg-teal text-white shadow-sm"
                  : "bg-white text-text-secondary border border-border-ghost hover:border-teal/30"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-ghost overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-teal" />
          </div>
        ) : filteredAdmissions.length === 0 ? (
          <div className="py-16 text-center">
            <GraduationCap className="w-12 h-12 text-text-tertiary/30 mx-auto mb-3" />
            <p className="text-text-secondary font-medium">No referrals found</p>
            <p className="text-xs text-text-tertiary mt-1">
              {filter !== "all" ? "Try changing the filter" : "Add your first referral to get started"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-low/50">
                <tr>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">
                    Course / College
                  </th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">
                    Commission
                  </th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ghost">
                {filteredAdmissions.map((adm) => (
                  <tr key={adm.id} className="hover:bg-surface/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal/10 text-teal flex items-center justify-center font-bold text-xs uppercase">
                          {adm.student_name?.[0]}
                        </div>
                        <span className="text-body-sm font-semibold text-text-primary">
                          {adm.student_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-body-sm text-text-primary">{adm.student_phone || "—"}</p>
                      <p className="text-[11px] text-text-tertiary">{adm.student_email || "—"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-body-sm text-text-primary font-medium">{adm.course || "—"}</p>
                      <p className="text-[11px] text-text-tertiary">{adm.colleges?.name || "—"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-badge font-bold px-2.5 py-1 rounded-full ${
                          statusColors[adm.status] || "bg-surface text-text-tertiary"
                        }`}
                      >
                        {adm.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-body-sm font-semibold text-navy">
                        ₹{(adm.commission_amount || 0).toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-text-tertiary">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-caption font-medium">
                          {new Date(adm.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Referral Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up">
            <div className="px-6 py-5 border-b border-border-ghost flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy">Add New Referral</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-surface rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-text-tertiary" />
              </button>
            </div>
            <form onSubmit={handleAddReferral} className="p-6 space-y-4">
              {addError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100">
                  {addError}
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-navy mb-2">Student Name *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input
                    type="text"
                    value={addForm.student_name}
                    onChange={(e) => setAddForm({ ...addForm, student_name: e.target.value })}
                    required
                    className="w-full pl-11 pr-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                    placeholder="Student's full name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                    <input
                      type="tel"
                      value={addForm.student_phone}
                      onChange={(e) => setAddForm({ ...addForm, student_phone: e.target.value })}
                      className="w-full pl-11 pr-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                      placeholder="9876543210"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                    <input
                      type="email"
                      value={addForm.student_email}
                      onChange={(e) => setAddForm({ ...addForm, student_email: e.target.value })}
                      className="w-full pl-11 pr-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                      placeholder="student@email.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-2">Course / Program</label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input
                    type="text"
                    value={addForm.course}
                    onChange={(e) => setAddForm({ ...addForm, course: e.target.value })}
                    className="w-full pl-11 pr-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                    placeholder="B.Tech CSE, MBBS, etc."
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-surface hover:bg-surface-container text-text-secondary font-bold rounded-xl transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addLoading}
                  className="flex-1 py-2.5 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl transition-all btn-press shadow-lg shadow-teal/20 text-sm flex items-center justify-center gap-2"
                >
                  {addLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Referral"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
