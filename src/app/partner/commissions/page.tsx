"use client";

import React, { useState, useEffect } from "react";
import { Wallet, Loader2, Clock, IndianRupee } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  approved: "bg-blue-50 text-blue-600",
  paid: "bg-green-50 text-green-600",
};

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState<any[]>([]);
  const [summary, setSummary] = useState({ pending: 0, approved: 0, paid: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCommissions();
  }, []);

  const fetchCommissions = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: partnerData } = await supabase
      .from("partners")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!partnerData) return;

    const { data } = await supabase
      .from("partner_commissions")
      .select("*, partner_admissions(student_name, course)")
      .eq("partner_id", partnerData.id)
      .order("created_at", { ascending: false });

    setCommissions(data || []);

    // Calculate summary
    const sums = { pending: 0, approved: 0, paid: 0 };
    (data || []).forEach((c: any) => {
      if (c.status in sums) sums[c.status as keyof typeof sums] += c.amount || 0;
    });
    setSummary(sums);

    setIsLoading(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-[28px] font-bold text-navy tracking-tight">Commissions</h1>
        <p className="text-text-secondary mt-1 text-body-sm font-medium">
          Track your earnings from successful referrals
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-border-ghost">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-amber-50">
              <IndianRupee className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-badge text-text-tertiary uppercase tracking-wider font-bold">Pending</span>
          </div>
          <p className="text-h2 font-bold text-navy">₹{summary.pending.toLocaleString("en-IN")}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-border-ghost">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-blue-50">
              <IndianRupee className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-badge text-text-tertiary uppercase tracking-wider font-bold">Approved</span>
          </div>
          <p className="text-h2 font-bold text-navy">₹{summary.approved.toLocaleString("en-IN")}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-border-ghost">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-green-50">
              <IndianRupee className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-badge text-text-tertiary uppercase tracking-wider font-bold">Paid Out</span>
          </div>
          <p className="text-h2 font-bold text-teal">₹{summary.paid.toLocaleString("en-IN")}</p>
        </div>
      </div>

      {/* Commission Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-ghost overflow-hidden">
        <div className="px-6 py-5 border-b border-border-ghost">
          <h2 className="text-lg font-bold text-navy">Commission History</h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-teal" />
          </div>
        ) : commissions.length === 0 ? (
          <div className="py-16 text-center">
            <Wallet className="w-12 h-12 text-text-tertiary/30 mx-auto mb-3" />
            <p className="text-text-secondary font-medium">No commissions yet</p>
            <p className="text-xs text-text-tertiary mt-1">
              Commissions will appear here when your referrals are verified
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-low/50">
                <tr>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Course</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ghost">
                {commissions.map((c) => (
                  <tr key={c.id} className="hover:bg-surface/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-body-sm font-semibold text-text-primary">
                        {c.partner_admissions?.student_name || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-body-sm text-text-secondary">
                        {c.partner_admissions?.course || "—"}
                      </span>
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
                          {new Date(c.created_at).toLocaleDateString("en-IN", {
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
    </div>
  );
}
