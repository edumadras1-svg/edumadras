"use client";

import React, { useState, useEffect } from "react";
import {
  Handshake,
  Search,
  Filter,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ChevronRight,
  ShieldCheck,
  ShieldOff,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  active: "bg-green-50 text-green-600",
  suspended: "bg-red-50 text-red-600",
};

const statusOptions = ["all", "pending", "active", "suspended"];

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchPartners();
  }, [filter]);

  const fetchPartners = async () => {
    setIsLoading(true);
    let query = supabase
      .from("partners")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data } = await query;
    setPartners(data || []);
    setIsLoading(false);
  };

  const handleApprove = async (partnerId: string) => {
    setActionLoading(partnerId);
    await supabase
      .from("partners")
      .update({ status: "active", approved_at: new Date().toISOString() })
      .eq("id", partnerId);
    setActionLoading(null);
    fetchPartners();
  };

  const handleSuspend = async (partnerId: string) => {
    setActionLoading(partnerId);
    await supabase
      .from("partners")
      .update({ status: "suspended" })
      .eq("id", partnerId);
    setActionLoading(null);
    fetchPartners();
  };

  const handleReactivate = async (partnerId: string) => {
    setActionLoading(partnerId);
    await supabase
      .from("partners")
      .update({ status: "active" })
      .eq("id", partnerId);
    setActionLoading(null);
    fetchPartners();
  };

  const filteredPartners = partners.filter((p) =>
    searchQuery
      ? p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.partner_id?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const pendingCount = partners.filter((p) => p.status === "pending").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-navy tracking-tight">Partner Management</h1>
          <p className="text-text-secondary mt-1 text-body-sm font-medium">
            Review, approve, and manage partner accounts
          </p>
        </div>
        {pendingCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-sm font-semibold border border-amber-100">
            <Clock className="w-4 h-4" />
            {pendingCount} pending approval{pendingCount > 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or partner ID..."
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
        ) : filteredPartners.length === 0 ? (
          <div className="py-16 text-center">
            <Handshake className="w-12 h-12 text-text-tertiary/30 mx-auto mb-3" />
            <p className="text-text-secondary font-medium">No partners found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-low/50">
                <tr>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Partner</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">ID / Code</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Earnings</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ghost">
                {filteredPartners.map((p) => (
                  <tr key={p.id} className="hover:bg-surface/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-teal/10 text-teal flex items-center justify-center font-bold text-sm uppercase">
                          {p.name?.[0]}
                        </div>
                        <div>
                          <p className="text-body-sm font-semibold text-text-primary">{p.name}</p>
                          <p className="text-[11px] text-text-tertiary">{p.organization || "Individual"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-body-sm font-bold text-navy">{p.partner_id}</p>
                      <p className="text-[11px] text-text-tertiary font-mono">{p.referral_code}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-body-sm text-text-primary">{p.email}</p>
                      <p className="text-[11px] text-text-tertiary">{p.phone || "—"} · {p.city || "—"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-badge font-bold px-2.5 py-1 rounded-full capitalize ${statusColors[p.status] || ""}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-body-sm font-semibold text-navy">
                        ₹{(p.total_earned || 0).toLocaleString("en-IN")}
                      </p>
                      <p className="text-[11px] text-text-tertiary">
                        Paid: ₹{(p.total_paid || 0).toLocaleString("en-IN")}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {p.status === "pending" && (
                          <button
                            onClick={() => handleApprove(p.id)}
                            disabled={actionLoading === p.id}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 font-bold rounded-lg text-badge transition-all disabled:opacity-50"
                          >
                            {actionLoading === p.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <ShieldCheck className="w-3 h-3" />
                            )}
                            Approve
                          </button>
                        )}
                        {p.status === "active" && (
                          <button
                            onClick={() => handleSuspend(p.id)}
                            disabled={actionLoading === p.id}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg text-badge transition-all disabled:opacity-50"
                          >
                            {actionLoading === p.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <ShieldOff className="w-3 h-3" />
                            )}
                            Suspend
                          </button>
                        )}
                        {p.status === "suspended" && (
                          <button
                            onClick={() => handleReactivate(p.id)}
                            disabled={actionLoading === p.id}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg text-badge transition-all disabled:opacity-50"
                          >
                            {actionLoading === p.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <CheckCircle className="w-3 h-3" />
                            )}
                            Reactivate
                          </button>
                        )}
                        <Link
                          href={`/admin/partners/${p.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-surface hover:bg-surface-container text-text-secondary font-bold rounded-lg text-badge transition-all"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </Link>
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
