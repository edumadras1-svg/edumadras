-- ==========================================
-- PARTNER PROGRAM SCHEMA
-- Run this in Supabase SQL Editor
-- ==========================================

-- 1. Partners Table
CREATE TABLE IF NOT EXISTS public.partners (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  partner_id text UNIQUE NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  city text,
  organization text,
  referral_code text UNIQUE NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended')),
  commission_rate numeric DEFAULT 2000,
  total_earned numeric DEFAULT 0,
  total_paid numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  approved_at timestamptz
);

-- RLS for partners
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Partners can view own data" ON public.partners;
CREATE POLICY "Partners can view own data" ON public.partners
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Partners can update own data" ON public.partners;
CREATE POLICY "Partners can update own data" ON public.partners
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public can insert partners" ON public.partners;
CREATE POLICY "Public can insert partners" ON public.partners
  FOR INSERT WITH CHECK (true);

-- Admin full access (for development)
DROP POLICY IF EXISTS "Admin full read partners" ON public.partners;
CREATE POLICY "Admin full read partners" ON public.partners
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin full update partners" ON public.partners;
CREATE POLICY "Admin full update partners" ON public.partners
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Admin full delete partners" ON public.partners;
CREATE POLICY "Admin full delete partners" ON public.partners
  FOR DELETE USING (true);

-- Public read for referral code validation
DROP POLICY IF EXISTS "Public can validate referral codes" ON public.partners;
CREATE POLICY "Public can validate referral codes" ON public.partners
  FOR SELECT USING (true);


-- 2. Partner Admissions Table
CREATE TABLE IF NOT EXISTS public.partner_admissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id uuid REFERENCES public.partners(id) ON DELETE CASCADE,
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  college_id uuid REFERENCES public.colleges(id) ON DELETE SET NULL,
  student_name text NOT NULL,
  student_phone text,
  student_email text,
  course text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'admitted', 'rejected')),
  commission_amount numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  verified_at timestamptz
);

ALTER TABLE public.partner_admissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Partners can view own admissions" ON public.partner_admissions;
CREATE POLICY "Partners can view own admissions" ON public.partner_admissions
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Partners can insert admissions" ON public.partner_admissions;
CREATE POLICY "Partners can insert admissions" ON public.partner_admissions
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access admissions" ON public.partner_admissions;
CREATE POLICY "Admin full access admissions" ON public.partner_admissions
  FOR ALL USING (true);


-- 3. Partner Commissions Table
CREATE TABLE IF NOT EXISTS public.partner_commissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id uuid REFERENCES public.partners(id) ON DELETE CASCADE,
  admission_id uuid REFERENCES public.partner_admissions(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.partner_commissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Partners can view own commissions" ON public.partner_commissions;
CREATE POLICY "Partners can view own commissions" ON public.partner_commissions
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin full access commissions" ON public.partner_commissions;
CREATE POLICY "Admin full access commissions" ON public.partner_commissions
  FOR ALL USING (true);

DROP POLICY IF EXISTS "Public insert commissions" ON public.partner_commissions;
CREATE POLICY "Public insert commissions" ON public.partner_commissions
  FOR INSERT WITH CHECK (true);


-- 4. Partner Payouts Table
CREATE TABLE IF NOT EXISTS public.partner_payouts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id uuid REFERENCES public.partners(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  status text DEFAULT 'requested' CHECK (status IN ('requested', 'processing', 'completed', 'rejected')),
  bank_details jsonb,
  notes text,
  created_at timestamptz DEFAULT now(),
  processed_at timestamptz
);

ALTER TABLE public.partner_payouts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Partners can view own payouts" ON public.partner_payouts;
CREATE POLICY "Partners can view own payouts" ON public.partner_payouts
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Partners can insert payouts" ON public.partner_payouts;
CREATE POLICY "Partners can insert payouts" ON public.partner_payouts
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access payouts" ON public.partner_payouts;
CREATE POLICY "Admin full access payouts" ON public.partner_payouts
  FOR ALL USING (true);


-- 5. Modify leads table — add referral tracking
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'partner_referral_code') THEN
    ALTER TABLE public.leads ADD COLUMN partner_referral_code text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'referred_by_partner') THEN
    ALTER TABLE public.leads ADD COLUMN referred_by_partner uuid REFERENCES public.partners(id) ON DELETE SET NULL;
  END IF;
END $$;


-- 6. Function to generate sequential Partner ID
CREATE OR REPLACE FUNCTION public.generate_partner_id()
RETURNS text AS $$
DECLARE
  next_num integer;
  new_id text;
BEGIN
  SELECT COALESCE(MAX(
    CAST(REPLACE(partner_id, 'EM-P', '') AS integer)
  ), 0) + 1
  INTO next_num
  FROM public.partners;

  new_id := 'EM-P' || LPAD(next_num::text, 3, '0');
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;
