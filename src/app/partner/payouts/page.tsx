"use client";

import React, { useState, useEffect } from "react";
import {
  Banknote,
  Loader2,
  Clock,
  Plus,
  X,
  Building2,
  Hash,
  CreditCard,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const statusColors: Record<string, string> = {
  requested: "bg-amber-50 text-amber-600",
  processing: "bg-blue-50 text-blue-600",
  completed: "bg-green-50 text-green-600",
  rejected: "bg-red-50 text-red-600",
};

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState<any[]>([]);
  const [partner, setPartner] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestAmount, setRequestAmount] = useState("");
  const [bankDetails, setBankDetails] = useState({
    bank_name: "",
    account_number: "",
    ifsc_code: "",
    account_holder: "",
  });
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [availableBalance, setAvailableBalance] = useState(0);

  useEffect(() => {
    fetchPayouts();
  }, []);

  const fetchPayouts = async () => {
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

    // Calculate available balance (total_earned - total_paid)
    setAvailableBalance((partnerData.total_earned || 0) - (partnerData.total_paid || 0));

    const { data } = await supabase
      .from("partner_payouts")
      .select("*")
      .eq("partner_id", partnerData.id)
      .order("created_at", { ascending: false });

    setPayouts(data || []);
    setIsLoading(false);
  };

  const handleRequestPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestLoading(true);
    setRequestError(null);

    const amount = parseFloat(requestAmount);
    if (isNaN(amount) || amount <= 0) {
      setRequestError("Please enter a valid amount");
      setRequestLoading(false);
      return;
    }

    if (amount > availableBalance) {
      setRequestError("Amount exceeds available balance");
      setRequestLoading(false);
      return;
    }

    const { error } = await supabase.from("partner_payouts").insert({
      partner_id: partner.id,
      amount,
      status: "requested",
      bank_details: bankDetails,
    });

    if (error) {
      setRequestError(error.message);
      setRequestLoading(false);
      return;
    }

    setShowRequestModal(false);
    setRequestAmount("");
    setBankDetails({ bank_name: "", account_number: "", ifsc_code: "", account_holder: "" });
    setRequestLoading(false);
    fetchPayouts();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-navy tracking-tight">Payouts</h1>
          <p className="text-text-secondary mt-1 text-body-sm font-medium">
            Request and track your payout history
          </p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          disabled={availableBalance <= 0}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl transition-all btn-press shadow-lg shadow-teal/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Request Payout
        </button>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-navy to-navy/90 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-1">Available Balance</p>
            <p className="text-3xl font-bold">₹{availableBalance.toLocaleString("en-IN")}</p>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-1">Total Earned</p>
              <p className="text-lg font-bold text-teal-light">
                ₹{(partner?.total_earned || 0).toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-1">Total Paid</p>
              <p className="text-lg font-bold text-white/80">
                ₹{(partner?.total_paid || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-ghost overflow-hidden">
        <div className="px-6 py-5 border-b border-border-ghost">
          <h2 className="text-lg font-bold text-navy">Payout History</h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-teal" />
          </div>
        ) : payouts.length === 0 ? (
          <div className="py-16 text-center">
            <Banknote className="w-12 h-12 text-text-tertiary/30 mx-auto mb-3" />
            <p className="text-text-secondary font-medium">No payouts yet</p>
            <p className="text-xs text-text-tertiary mt-1">
              Request a payout when you have available balance
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-low/50">
                <tr>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Bank</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Requested</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Processed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ghost">
                {payouts.map((p) => (
                  <tr key={p.id} className="hover:bg-surface/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-body-sm font-bold text-navy">
                        ₹{(p.amount || 0).toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-badge font-bold px-2.5 py-1 rounded-full ${statusColors[p.status] || ""}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-body-sm text-text-secondary">
                        {p.bank_details?.bank_name || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-text-tertiary">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-caption font-medium">
                          {new Date(p.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-caption text-text-tertiary">
                        {p.processed_at
                          ? new Date(p.processed_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })
                          : "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Request Payout Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up">
            <div className="px-6 py-5 border-b border-border-ghost flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy">Request Payout</h3>
              <button
                onClick={() => setShowRequestModal(false)}
                className="p-2 hover:bg-surface rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-text-tertiary" />
              </button>
            </div>
            <form onSubmit={handleRequestPayout} className="p-6 space-y-4">
              {requestError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100">
                  {requestError}
                </div>
              )}

              <div className="bg-surface-low rounded-xl p-4 text-center">
                <p className="text-xs text-text-tertiary uppercase tracking-widest font-bold mb-1">Available Balance</p>
                <p className="text-2xl font-bold text-teal">₹{availableBalance.toLocaleString("en-IN")}</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-2">Amount (₹) *</label>
                <input
                  type="number"
                  value={requestAmount}
                  onChange={(e) => setRequestAmount(e.target.value)}
                  required
                  min="1"
                  max={availableBalance}
                  className="w-full px-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                  placeholder="Enter amount"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Bank Name *</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                    <input
                      type="text"
                      value={bankDetails.bank_name}
                      onChange={(e) => setBankDetails({ ...bankDetails, bank_name: e.target.value })}
                      required
                      className="w-full pl-11 pr-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                      placeholder="HDFC Bank"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">IFSC Code *</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                    <input
                      type="text"
                      value={bankDetails.ifsc_code}
                      onChange={(e) => setBankDetails({ ...bankDetails, ifsc_code: e.target.value })}
                      required
                      className="w-full pl-11 pr-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                      placeholder="HDFC0001234"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-2">Account Number *</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input
                    type="text"
                    value={bankDetails.account_number}
                    onChange={(e) => setBankDetails({ ...bankDetails, account_number: e.target.value })}
                    required
                    className="w-full pl-11 pr-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                    placeholder="1234567890123"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-2">Account Holder Name *</label>
                <input
                  type="text"
                  value={bankDetails.account_holder}
                  onChange={(e) => setBankDetails({ ...bankDetails, account_holder: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                  placeholder="As per bank records"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 py-2.5 bg-surface hover:bg-surface-container text-text-secondary font-bold rounded-xl transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={requestLoading}
                  className="flex-1 py-2.5 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl transition-all btn-press shadow-lg shadow-teal/20 text-sm flex items-center justify-center gap-2"
                >
                  {requestLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Request Payout"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
