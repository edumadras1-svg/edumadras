"use client";

import React, { useState, useEffect } from "react";
import {
  Banknote,
  Search,
  Filter,
  Loader2,
  Clock,
  IndianRupee,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

const statusColors: Record<string, string> = {
  requested: "bg-amber-50 text-amber-600",
  processing: "bg-blue-50 text-blue-600",
  completed: "bg-green-50 text-green-600",
  rejected: "bg-red-50 text-red-600",
};

const statusOptions = ["all", "requested", "processing", "completed", "rejected"];

export default function AdminPartnerPayoutsPage() {
  const [payouts, setPayouts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [summary, setSummary] = useState({ total: 0, requested: 0, processing: 0, completed: 0 });
  const [expandedBank, setExpandedBank] = useState<string | null>(null);

  useEffect(() => {
    fetchPayouts();
  }, [filter]);

  const fetchPayouts = async () => {
    setIsLoading(true);

    let query = supabase
      .from("partner_payouts")
      .select("*, partners(name, partner_id, email, phone)")
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data } = await query;
    setPayouts(data || []);

    // Summary
    const { data: allPayouts } = await supabase.from("partner_payouts").select("amount, status");
    const sums = { total: 0, requested: 0, processing: 0, completed: 0 };
    (allPayouts || []).forEach((p: any) => {
      sums.total += p.amount || 0;
      if (p.status === "requested") sums.requested += p.amount || 0;
      if (p.status === "processing") sums.processing += p.amount || 0;
      if (p.status === "completed") sums.completed += p.amount || 0;
    });
    setSummary(sums);

    setIsLoading(false);
  };

  const handleStatusChange = async (payoutId: string, newStatus: string) => {
    setActionLoading(payoutId);

    const updates: any = { status: newStatus };
    if (newStatus === "completed") {
      updates.processed_at = new Date().toISOString();

      // Update partner total_paid
      const payout = payouts.find((p) => p.id === payoutId);
      if (payout) {
        const { data: partner } = await supabase
          .from("partners")
          .select("total_paid")
          .eq("id", payout.partner_id)
          .single();

        if (partner) {
          await supabase.from("partners").update({
            total_paid: (partner.total_paid || 0) + payout.amount,
          }).eq("id", payout.partner_id);
        }
      }
    }

    await supabase.from("partner_payouts").update(updates).eq("id", payoutId);
    setActionLoading(null);
    fetchPayouts();
  };

  const filteredPayouts = payouts.filter((p) =>
    searchQuery
      ? p.partners?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.partners?.partner_id?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-[28px] font-bold text-navy tracking-tight">Partner Payouts</h1>
        <p className="text-text-secondary mt-1 text-body-sm font-medium">
          Process and track all partner payout requests
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Payouts", value: summary.total, color: "bg-surface text-navy" },
          { label: "Requested", value: summary.requested, color: "bg-amber-50 text-amber-600" },
          { label: "Processing", value: summary.processing, color: "bg-blue-50 text-blue-600" },
          { label: "Completed", value: summary.completed, color: "bg-green-50 text-green-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white p-5 rounded-2xl shadow-sm border border-border-ghost">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-xl ${s.color}`}>
                <IndianRupee className="w-4 h-4" />
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
            placeholder="Search by partner name or ID..."
            className="w-full pl-11 pr-4 py-2.5 bg-white rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
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
        ) : filteredPayouts.length === 0 ? (
          <div className="py-16 text-center">
            <Banknote className="w-12 h-12 text-text-tertiary/30 mx-auto mb-3" />
            <p className="text-text-secondary font-medium">No payout requests found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-low/50">
                <tr>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Partner</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Bank Details</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Requested</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ghost">
                {filteredPayouts.map((p) => (
                  <tr key={p.id} className="hover:bg-surface/30 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/partners/${p.partner_id}`} className="text-body-sm font-semibold text-teal hover:underline">
                        {p.partners?.partner_id || "—"}
                      </Link>
                      <p className="text-[11px] text-text-tertiary">{p.partners?.name}</p>
                      <p className="text-[11px] text-text-tertiary">{p.partners?.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-navy">
                        ₹{(p.amount || 0).toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {p.bank_details ? (
                        <div>
                          <button
                            onClick={() => setExpandedBank(expandedBank === p.id ? null : p.id)}
                            className="text-body-sm text-teal font-semibold hover:underline flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            {expandedBank === p.id ? "Hide" : "View"}
                          </button>
                          {expandedBank === p.id && (
                            <div className="mt-2 p-3 bg-surface-low rounded-lg border border-border-ghost text-xs space-y-1">
                              <p><strong>Bank:</strong> {p.bank_details.bank_name}</p>
                              <p><strong>A/C:</strong> {p.bank_details.account_number}</p>
                              <p><strong>IFSC:</strong> {p.bank_details.ifsc_code}</p>
                              <p><strong>Holder:</strong> {p.bank_details.account_holder}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] text-text-tertiary">Not provided</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-badge font-bold px-2.5 py-1 rounded-full capitalize ${statusColors[p.status] || ""}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-text-tertiary">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-caption font-medium">
                          {new Date(p.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                      {p.processed_at && (
                        <p className="text-[10px] text-green-600 mt-0.5">
                          Paid: {new Date(p.processed_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5">
                        {p.status === "requested" && (
                          <>
                            <button
                              onClick={() => handleStatusChange(p.id, "processing")}
                              disabled={actionLoading === p.id}
                              className="px-2.5 py-1 bg-blue-50 text-blue-700 text-badge font-bold rounded-lg hover:bg-blue-100 disabled:opacity-50"
                            >
                              {actionLoading === p.id ? <Loader2 className="w-3 h-3 animate-spin" /> : "Process"}
                            </button>
                            <button
                              onClick={() => handleStatusChange(p.id, "rejected")}
                              disabled={actionLoading === p.id}
                              className="px-2.5 py-1 bg-red-50 text-red-700 text-badge font-bold rounded-lg hover:bg-red-100 disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {p.status === "processing" && (
                          <button
                            onClick={() => handleStatusChange(p.id, "completed")}
                            disabled={actionLoading === p.id}
                            className="px-2.5 py-1 bg-green-50 text-green-700 text-badge font-bold rounded-lg hover:bg-green-100 disabled:opacity-50"
                          >
                            {actionLoading === p.id ? <Loader2 className="w-3 h-3 animate-spin" /> : "Mark Paid"}
                          </button>
                        )}
                        {(p.status === "completed" || p.status === "rejected") && (
                          <span className="text-[11px] text-text-tertiary italic">
                            {p.status === "completed" ? "✓ Paid" : "✗ Rejected"}
                          </span>
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
