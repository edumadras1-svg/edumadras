"use client";

import React, { useState, useEffect } from "react";
import {
  ClipboardList,
  Search,
  Filter,
  Loader2,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  verified: "bg-blue-50 text-blue-600",
  admitted: "bg-green-50 text-green-600",
  rejected: "bg-red-50 text-red-600",
};

const statusOptions = ["all", "pending", "verified", "admitted", "rejected"];

export default function AdminPartnerAdmissionsPage() {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Stats
  const [stats, setStats] = useState({ total: 0, pending: 0, verified: 0, admitted: 0, rejected: 0 });

  useEffect(() => {
    fetchAdmissions();
  }, [filter]);

  const fetchAdmissions = async () => {
    setIsLoading(true);

    let query = supabase
      .from("partner_admissions")
      .select("*, partners(name, partner_id), colleges(name)")
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data } = await query;
    setAdmissions(data || []);

    // Fetch stats
    const { count: total } = await supabase.from("partner_admissions").select("*", { count: "exact", head: true });
    const { count: pending } = await supabase.from("partner_admissions").select("*", { count: "exact", head: true }).eq("status", "pending");
    const { count: verified } = await supabase.from("partner_admissions").select("*", { count: "exact", head: true }).eq("status", "verified");
    const { count: admitted } = await supabase.from("partner_admissions").select("*", { count: "exact", head: true }).eq("status", "admitted");
    const { count: rejected } = await supabase.from("partner_admissions").select("*", { count: "exact", head: true }).eq("status", "rejected");

    setStats({
      total: total || 0,
      pending: pending || 0,
      verified: verified || 0,
      admitted: admitted || 0,
      rejected: rejected || 0,
    });

    setIsLoading(false);
  };

  const handleStatusChange = async (admissionId: string, newStatus: string) => {
    setActionLoading(admissionId);

    const updates: any = { status: newStatus };
    if (newStatus === "verified") updates.verified_at = new Date().toISOString();

    await supabase.from("partner_admissions").update(updates).eq("id", admissionId);

    // If admitted, create commission
    if (newStatus === "admitted") {
      const admission = admissions.find((a) => a.id === admissionId);
      if (admission) {
        await supabase.from("partner_commissions").insert({
          partner_id: admission.partner_id,
          admission_id: admissionId,
          amount: admission.commission_amount || 5000,
          status: "pending",
        });

        // Update partner total_earned
        const { data: partner } = await supabase.from("partners").select("total_earned").eq("id", admission.partner_id).single();
        if (partner) {
          await supabase.from("partners").update({
            total_earned: (partner.total_earned || 0) + (admission.commission_amount || 5000),
          }).eq("id", admission.partner_id);
        }
      }
    }

    setActionLoading(null);
    fetchAdmissions();
  };

  const filteredAdmissions = admissions.filter((adm) =>
    searchQuery
      ? adm.student_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adm.student_phone?.includes(searchQuery) ||
        adm.partners?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adm.partners?.partner_id?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-[28px] font-bold text-navy tracking-tight">Partner Admissions</h1>
        <p className="text-text-secondary mt-1 text-body-sm font-medium">
          Manage all student referrals from partners
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Total", value: stats.total, color: "bg-surface text-navy" },
          { label: "Pending", value: stats.pending, color: "bg-amber-50 text-amber-600" },
          { label: "Verified", value: stats.verified, color: "bg-blue-50 text-blue-600" },
          { label: "Admitted", value: stats.admitted, color: "bg-green-50 text-green-600" },
          { label: "Rejected", value: stats.rejected, color: "bg-red-50 text-red-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white p-4 rounded-xl shadow-sm border border-border-ghost text-center">
            <p className="text-h2 font-bold text-navy">{s.value}</p>
            <span className={`text-badge font-bold px-2 py-0.5 rounded-full ${s.color} mt-1 inline-block`}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student, phone, or partner..."
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
            <ClipboardList className="w-12 h-12 text-text-tertiary/30 mx-auto mb-3" />
            <p className="text-text-secondary font-medium">No admissions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-low/50">
                <tr>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Partner</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Course</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Commission</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Actions</th>
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
                        <div>
                          <p className="text-body-sm font-semibold text-text-primary">{adm.student_name}</p>
                          <p className="text-[11px] text-text-tertiary">{adm.student_phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/partners/${adm.partner_id}`} className="text-body-sm font-semibold text-teal hover:underline">
                        {adm.partners?.partner_id || "—"}
                      </Link>
                      <p className="text-[11px] text-text-tertiary">{adm.partners?.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-body-sm text-text-primary font-medium">{adm.course || "—"}</p>
                      <p className="text-[11px] text-text-tertiary">{adm.colleges?.name || "—"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-badge font-bold px-2.5 py-1 rounded-full ${statusColors[adm.status] || ""}`}>
                        {adm.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-body-sm font-bold text-navy">
                        ₹{(adm.commission_amount || 0).toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-text-tertiary">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-caption font-medium">
                          {new Date(adm.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5">
                        {adm.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleStatusChange(adm.id, "verified")}
                              disabled={actionLoading === adm.id}
                              className="px-2.5 py-1 bg-blue-50 text-blue-700 text-badge font-bold rounded-lg hover:bg-blue-100 disabled:opacity-50"
                            >
                              {actionLoading === adm.id ? <Loader2 className="w-3 h-3 animate-spin" /> : "Verify"}
                            </button>
                            <button
                              onClick={() => handleStatusChange(adm.id, "rejected")}
                              disabled={actionLoading === adm.id}
                              className="px-2.5 py-1 bg-red-50 text-red-700 text-badge font-bold rounded-lg hover:bg-red-100 disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {adm.status === "verified" && (
                          <button
                            onClick={() => handleStatusChange(adm.id, "admitted")}
                            disabled={actionLoading === adm.id}
                            className="px-2.5 py-1 bg-green-50 text-green-700 text-badge font-bold rounded-lg hover:bg-green-100 disabled:opacity-50"
                          >
                            {actionLoading === adm.id ? <Loader2 className="w-3 h-3 animate-spin" /> : "Mark Admitted"}
                          </button>
                        )}
                        {(adm.status === "admitted" || adm.status === "rejected") && (
                          <span className="text-[11px] text-text-tertiary italic">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
