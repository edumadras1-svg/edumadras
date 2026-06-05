"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Wallet,
  Banknote,
  UserCircle,
  LogOut,
  Menu,
  X,
  Handshake,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import PartnerLogin from "@/components/partner/PartnerLogin";
import PartnerPendingScreen from "@/components/partner/PartnerPendingScreen";
import PartnerSuspendedScreen from "@/components/partner/PartnerSuspendedScreen";

const navItems = [
  { name: "Dashboard", href: "/partner", icon: LayoutDashboard },
  { name: "Admissions", href: "/partner/admissions", icon: GraduationCap },
  { name: "Commissions", href: "/partner/commissions", icon: Wallet },
  { name: "Payouts", href: "/partner/payouts", icon: Banknote },
  { name: "Profile", href: "/partner/profile", icon: UserCircle },
];

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [partner, setPartner] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Allow registration page to render without auth
  const isRegisterPage = pathname === "/partner/register";

  useEffect(() => {
    if (isRegisterPage) {
      setIsLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchPartner(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchPartner(session.user.id);
      } else {
        setPartner(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [isRegisterPage]);

  const fetchPartner = async (userId: string) => {
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (data) {
      setPartner(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setPartner(null);
  };

  const handleCopyCode = () => {
    if (partner?.referral_code) {
      navigator.clipboard.writeText(partner.referral_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Registration page renders without auth
  if (isRegisterPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-low">
        <Loader2 className="w-8 h-8 animate-spin text-teal" />
      </div>
    );
  }

  if (!session) {
    return <PartnerLogin />;
  }

  // Session exists but no partner record — redirect to register
  if (!partner) {
    return <PartnerLogin />;
  }

  // Partner exists but pending
  if (partner.status === "pending") {
    return <PartnerPendingScreen partnerName={partner.name} />;
  }

  // Partner suspended
  if (partner.status === "suspended") {
    return <PartnerSuspendedScreen />;
  }

  return (
    <div className="flex h-screen bg-surface-low overflow-hidden font-sans">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          w-64 bg-navy border-r border-white/10 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          lg:w-64
        `}
      >
        {/* Brand */}
        <div className="h-14 lg:h-16 flex items-center justify-between px-4 lg:px-6 border-b border-white/5">
          <Link href="/partner" className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-gradient-to-br from-teal to-teal/80 flex items-center justify-center shrink-0 shadow-lg">
              <Handshake className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold tracking-tight text-base lg:text-lg">
              Partner<span className="text-teal-light">Hub</span>
            </span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 text-white/60 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Partner ID Card */}
        <div className="mx-3 lg:mx-4 mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Partner ID</p>
          <p className="text-white font-bold text-sm">{partner.partner_id}</p>
          <div className="mt-2 flex items-center gap-2">
            <code className="text-[11px] text-teal-light bg-white/5 px-2 py-1 rounded-lg flex-1 truncate">
              {partner.referral_code}
            </code>
            <button
              onClick={handleCopyCode}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              title="Copy referral code"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-white/60" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 lg:py-6 px-3 lg:px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl transition-all group ${
                  isActive
                    ? "bg-teal text-white shadow-lg shadow-teal/20"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "group-hover:text-teal"}`} />
                <span className="font-medium text-sm lg:text-[15px]">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sign Out */}
        <div className="p-3 lg:p-4 border-t border-white/5 bg-black/10">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 w-full rounded-xl text-white/60 hover:bg-red-500/10 hover:text-red-400 transition-all group"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="font-medium text-sm lg:text-[15px]">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Top Header */}
        <header className="h-14 lg:h-16 bg-white border-b border-border-ghost flex items-center justify-between px-4 lg:px-8 z-30 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-surface rounded-lg transition-colors text-text-secondary"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-bold text-navy hidden sm:block">
              {navItems.find((item) => item.href === pathname)?.name || "Partner Portal"}
            </h2>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-label font-semibold text-text-primary leading-none max-w-[150px] truncate text-xs lg:text-sm">
                {partner.name}
              </p>
              <p className="text-[10px] lg:text-[11px] text-teal mt-1 uppercase tracking-wider font-bold">
                {partner.partner_id}
              </p>
            </div>
            <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-teal flex items-center justify-center text-white text-xs lg:text-sm font-bold border-2 border-surface shadow-sm uppercase">
              {partner.name?.[0] || "P"}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
