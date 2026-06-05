"use client";

import React, { useState, useEffect } from "react";
import {
  Wallet,
  Search,
  Filter,
  Loader2,
  Clock,
  IndianRupee,
  CheckCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  approved: "bg-blue-50 text-blue-600",
  paid: "bg-green-50 text-green-600",
};

const statusOptions = ["all", "pending", "approved", "paid"];

export default function AdminPartnerCommissionsPage() {
  const [commissions, setCommissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [summary, setSummary] = useState({ total: 0, pending: 0, approved: 0, paid: 0 });

  useEffect(() => {
    fetchCommissions();
  }, [filter]);

  const fetchCommissions = async () => {
    setIsLoading(true);

    let query = supabase
      .from("partner_commissions")
      .select("*, partners(name, partner_id), partner_admissions(student_name, course)")
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data } = await query;
    setCommissions(data || []);

    // Summary
    const { data: allComm } = await supabase.from("partner_commissions").select("amount, status");
    const sums = { total: 0, pending: 0, approved: 0, paid: 0 };
    (allComm || []).forEach((c: any) => {
      sums.total += c.amount || 0;
      if (c.status in sums) sums[c.status as keyof typeof sums] += c.amount || 0;
    });
    setSummary(sums);

    setIsLoading(false);
  };

  const handleStatusChange = async (commissionId: string, newStatus: string) => {
    setActionLoading(commissionId);
    await supabase.from("partner_commissions").update({ status: newStatus }).eq("id", commissionId);
    setActionLoading(null);
    fetchCommissions();
  };

  const filteredCommissions = commissions.filter((c) =>
    searchQuery
      ? c.partners?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.partners?.partner_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.partner_admissions?.student_name?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-[28px] font-bold text-navy tracking-tight">Partner Commissions</h1>
        <p className="text-text-secondary mt-1 text-body-sm font-medium">
          Track and manage all partner commission payments
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Commissions", value: summary.total, icon: IndianRupee, color: "bg-surface text-navy" },
          { label: "Pending", value: summary.pending, icon: Clock, color: "bg-amber-50 text-amber-600" },
          { label: "Approved", value: summary.approved, icon: CheckCircle, color: "bg-blue-50 text-blue-600" },
          { label: "Paid", value: summary.paid, icon: Wallet, color: "bg-green-50 text-green-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white p-5 rounded-2xl shadow-sm border border-border-ghost">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-xl ${s.color}`}>
                <s.icon className="w-4 h-4" />
              </div>
              <span className="text-badge text-text-tertiary uppercase tracking-wider font-bold">{s.label}</span>
            </div>
            <p className="text-h2 font-bold text-navy">₹{s.value.toLocaleString("en-IN")}</p>
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
            placeholder="Search by partner or student..."
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
        ) : filteredCommissions.length === 0 ? (
          <div className="py-16 text-center">
            <Wallet className="w-12 h-12 text-text-tertiary/30 mx-auto mb-3" />
            <p className="text-text-secondary font-medium">No commissions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-low/50">
                <tr>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Partner</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ghost">
                {filteredCommissions.map((c) => (
                  <tr key={c.id} className="hover:bg-surface/30 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/partners/${c.partner_id}`} className="text-body-sm font-semibold text-teal hover:underline">
                        {c.partners?.partner_id || "—"}
                      </Link>
                      <p className="text-[11px] text-text-tertiary">{c.partners?.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-body-sm font-medium text-text-primary">{c.partner_admissions?.student_name || "—"}</p>
                      <p className="text-[11px] text-text-tertiary">{c.partner_admissions?.course || "—"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-body-sm font-bold text-navy">
                        ₹{(c.amount || 0).toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-badge font-bold px-2.5 py-1 rounded-full ${statusColors[c.status] || ""}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-text-tertiary">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-caption font-medium">
                          {new Date(c.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5">
                        {c.status === "pending" && (
                          <button
                            onClick={() => handleStatusChange(c.id, "approved")}
                            disabled={actionLoading === c.id}
                            className="px-2.5 py-1 bg-blue-50 text-blue-700 text-badge font-bold rounded-lg hover:bg-blue-100 disabled:opacity-50"
                          >
                            {actionLoading === c.id ? <Loader2 className="w-3 h-3 animate-spin" /> : "Approve"}
                          </button>
                        )}
                        {c.status === "approved" && (
                          <button
                            onClick={() => handleStatusChange(c.id, "paid")}
                            disabled={actionLoading === c.id}
                            className="px-2.5 py-1 bg-green-50 text-green-700 text-badge font-bold rounded-lg hover:bg-green-100 disabled:opacity-50"
                          >
                            {actionLoading === c.id ? <Loader2 className="w-3 h-3 animate-spin" /> : "Mark Paid"}
                          </button>
                        )}
                        {c.status === "paid" && (
                          <span className="text-[11px] text-text-tertiary italic">Completed</span>
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
