"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Loader2, Lock, Mail, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // If successful, the onAuthStateChange listener in layout will update state
  };

  return (
    <div className="min-h-screen bg-surface-low flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mb-4 shadow-xl border border-white/10">
           <img src="/logo_icon.ico" alt="EduMadras" className="w-10 h-10 object-contain bg-white rounded-lg" />
        </div>
        <h1 className="text-2xl font-bold text-navy tracking-tight">EduMadras Admin</h1>
        <p className="text-text-secondary text-sm font-medium mt-1">Please sign in to continue</p>
      </div>

      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-border-ghost overflow-hidden">
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-start gap-3 border border-red-100">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-navy mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                  placeholder="admin@edumadras.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-navy mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-navy hover:bg-navy/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-navy/20 flex items-center justify-center gap-2 btn-press disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
