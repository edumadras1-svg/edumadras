-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Users & Roles
create table if not exists public.users (
  id uuid references auth.users not null primary key,
  email text unique,
  role text default 'user' check (role in ('admin', 'user')),
  name text,
  phone text,
  city text,
  board_of_study text,
  marks text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS: Users
alter table public.users enable row level security;
drop policy if exists "Users can view own data" on public.users;
create policy "Users can view own data" on public.users for select using (auth.uid() = id);

drop policy if exists "Users can update own data" on public.users;
create policy "Users can update own data" on public.users for update using (auth.uid() = id);

drop policy if exists "Users can insert own data" on public.users;
create policy "Users can insert own data" on public.users for insert with check (auth.uid() = id);

-- AUTH TRIGGER (Automatically create user profile on signup)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name, phone, city, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'city',
    'user'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. App Settings (Global Config)
create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null,
  description text
);

-- Seed initial settings (only if not exists)
insert into public.app_settings (key, value, description)
values
('maintenance_mode', 'false', 'Toggle entire site maintenance mode'),
('show_medical', 'true', 'Show Medical colleges section'),
('show_engineering', 'true', 'Show Engineering colleges section')
on conflict (key) do nothing;

alter table public.app_settings enable row level security;
drop policy if exists "Public Read Settings" on public.app_settings;
create policy "Public Read Settings" on public.app_settings for select using (true);


-- 3. Counselors
create table if not exists public.counselors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  phone text not null,
  role text default 'Counselor',
  is_active boolean default true,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.counselors enable row level security;
drop policy if exists "Public Read Counselors" on public.counselors;
create policy "Public Read Counselors" on public.counselors for select using (true);


-- 4. Alerts (Announcements)
create table if not exists public.alerts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  message text not null,
  type text check (type in ('info', 'warning', 'offer')) default 'info',
  is_active boolean default true,
  image_url text, -- Added for Announcements
  expires_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Verify image_url column exists if table was already created
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name = 'alerts' and column_name = 'image_url') then
    alter table public.alerts add column image_url text;
  end if;
end $$;


alter table public.alerts enable row level security;
drop policy if exists "Public Read Alerts" on public.alerts;
create policy "Public Read Alerts" on public.alerts for select using (true);

drop policy if exists "Allow Public Insert Alerts" on public.alerts;
create policy "Allow Public Insert Alerts" on public.alerts for insert with check (true);

drop policy if exists "Allow Public Update Alerts" on public.alerts;
create policy "Allow Public Update Alerts" on public.alerts for update using (true);

drop policy if exists "Allow Public Delete Alerts" on public.alerts;
create policy "Allow Public Delete Alerts" on public.alerts for delete using (true);


-- 5. Colleges
create table if not exists public.colleges (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  city text,
  state text,
  rank integer,
  established_year integer,
  logo_url text,
  banner_url text,
  type text,
  fee_structure_url text,
  overall_rating numeric(3, 2),
  approvals text[], -- Stored as array of strings
  rating numeric,
  avg_package numeric,
  highest_package numeric,
  total_students integer,
  description text,
  stream text
);

alter table public.colleges enable row level security;
drop policy if exists "Public Read Colleges" on public.colleges;
create policy "Public Read Colleges" on public.colleges for select using (true);

drop policy if exists "Allow Public Insert Colleges" on public.colleges;
create policy "Allow Public Insert Colleges" on public.colleges for insert with check (true);

-- Enable Update/Delete for Colleges
drop policy if exists "Allow Public Update Colleges" on public.colleges;
create policy "Allow Public Update Colleges" on public.colleges for update using (true);

drop policy if exists "Allow Public Delete Colleges" on public.colleges;
create policy "Allow Public Delete Colleges" on public.colleges for delete using (true);


-- 6. Master Courses
create table if not exists public.master_courses (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  code text unique,
  stream text,
  description text
);

alter table public.master_courses enable row level security;
drop policy if exists "Public Read Master Courses" on public.master_courses;
create policy "Public Read Master Courses" on public.master_courses for select using (true);

drop policy if exists "Allow Public Insert Master Courses" on public.master_courses;
create policy "Allow Public Insert Master Courses" on public.master_courses for insert with check (true);


-- 7. College Courses (Junction Table)
create table if not exists public.college_courses (
  id uuid default uuid_generate_v4() primary key,
  college_id uuid references public.colleges(id) on delete cascade,
  course_id uuid references public.master_courses(id) on delete cascade,
  fee numeric,
  duration text,
  seats integer,
  eligibility text,
  avg_package numeric
);

alter table public.college_courses enable row level security;
drop policy if exists "Public Read College Courses" on public.college_courses;
create policy "Public Read College Courses" on public.college_courses for select using (true);

drop policy if exists "Allow Public Insert College Courses" on public.college_courses;
create policy "Allow Public Insert College Courses" on public.college_courses for insert with check (true);

-- Enable Update/Delete for College Courses
drop policy if exists "Allow Public Update College Courses" on public.college_courses;
create policy "Allow Public Update College Courses" on public.college_courses for update using (true);

drop policy if exists "Allow Public Delete College Courses" on public.college_courses;
create policy "Allow Public Delete College Courses" on public.college_courses for delete using (true);


-- 8. Leads
create table if not exists public.leads (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id),
  name text not null,
  email text,
  phone text,
  city text,
  target_course text,
  qualification text,
  college_id uuid references public.colleges(id),
  status text default 'Pending', -- Added status column
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Add foreign key constraint with cascade
alter table public.leads drop constraint if exists leads_college_id_fkey;
alter table public.leads
  add constraint leads_college_id_fkey
  foreign key (college_id)
  references public.colleges(id)
  on delete cascade;

-- Ensure status column exists if table already existed
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name = 'leads' and column_name = 'status') then
    alter table public.leads add column status text default 'Pending';
  end if;
end $$;

alter table public.leads enable row level security;

-- Allow full access to leads for now (Development/Admin purpose)
-- In production, you'd want strictly "role = 'admin'" or similar.

-- Clean up old policies if they exist (from previous versions)
drop policy if exists "Public Insert Leads" on public.leads;
drop policy if exists "Users view own leads" on public.leads;

-- New permissive policies
DROP POLICY IF EXISTS "Enable read access for all users" ON public.leads;
CREATE POLICY "Enable read access for all users" ON public.leads FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for all users" ON public.leads;
CREATE POLICY "Enable insert for all users" ON public.leads FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for all users" ON public.leads;
CREATE POLICY "Enable update for all users" ON public.leads FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable delete for all users" ON public.leads;
CREATE POLICY "Enable delete for all users" ON public.leads FOR DELETE USING (true);


-- 9. Loan Enquiries
create table if not exists public.loan_enquiries (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text,
  phone text,
  amount numeric,
  status text default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.loan_enquiries enable row level security;
drop policy if exists "Public Insert Loans" on public.loan_enquiries;
create policy "Public Insert Loans" on public.loan_enquiries for insert with check (true);


-- 10. Notifications (Admin Inbox)
create table if not exists public.activities (
  id uuid default uuid_generate_v4() primary key,
  type text not null,
  content jsonb,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.activities enable row level security;
drop policy if exists "Allow Public select Activities" on public.activities;
create policy "Allow Public select Activities" on public.activities for select using (true);

drop policy if exists "Allow Public insert Activities" on public.activities;
create policy "Allow Public insert Activities" on public.activities for insert with check (true);

drop policy if exists "Allow Public update Activities" on public.activities;
create policy "Allow Public update Activities" on public.activities for update using (true);

drop policy if exists "Allow Public delete Activities" on public.activities;
create policy "Allow Public delete Activities" on public.activities for delete using (true);


-- ==========================================
-- SEED DATA (Fixed with Valid UUIDs)
-- ==========================================

-- Seed Colleges
INSERT INTO public.colleges (id, name, city, state, rank, established_year, logo_url, banner_url, type, approvals, rating, avg_package, highest_package, total_students, description, stream) VALUES
('10000000-0000-0000-0000-000000000001', 'Indian Institute of Technology Madras', 'Chennai', 'Tamil Nadu', 1, 1959, 'https://upload.wikimedia.org/wikipedia/en/thumb/6/69/IIT_Madras_Logo.svg/1200px-IIT_Madras_Logo.svg.png', 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80', 'Government', '{"AICTE", "UGC"}', 4.9, 21.5, 198.0, 10000, 'IIT Madras is the top-ranked engineering institute in India, known for its rigorous academic curriculum and vibrant campus life.', 'Engineering'),
('10000000-0000-0000-0000-000000000002', 'Indian Institute of Technology Delhi', 'New Delhi', 'Delhi', 2, 1961, 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg/1200px-Indian_Institute_of_Technology_Delhi_Logo.svg.png', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80', 'Government', '{"AICTE", "UGC"}', 4.8, 20.0, 150.0, 9500, 'Located in the heart of the capital, IIT Delhi offers world-class education and research opportunities.', 'Engineering'),
('10000000-0000-0000-0000-000000000003', 'Indian Institute of Technology Bombay', 'Mumbai', 'Maharashtra', 3, 1958, 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg/1200px-Indian_Institute_of_Technology_Bombay_Logo.svg.png', 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80', 'Government', '{"AICTE", "UGC"}', 4.9, 23.0, 200.0, 10500, 'IIT Bombay is renowned for its entrepreneurship ecosystem and strong alumni network.', 'Engineering'),
('10000000-0000-0000-0000-000000000004', 'Indian Institute of Technology Kanpur', 'Kanpur', 'Uttar Pradesh', 4, 1959, 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/IIT_Kanpur_Logo.svg/1200px-IIT_Kanpur_Logo.svg.png', 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80', 'Government', '{"AICTE", "UGC"}', 4.7, 19.0, 120.0, 8000, 'Known for its strong computer science department and research facilities.', 'Engineering'),
('10000000-0000-0000-0000-000000000005', 'BITS Pilani', 'Pilani', 'Rajasthan', 5, 1964, 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/1200px-BITS_Pilani-Logo.svg.png', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80', 'Private', '{"UGC", "NAAC"}', 4.6, 18.0, 60.0, 12000, 'Top private engineering institute known for its ''no attendance'' policy and flexible curriculum.', 'Engineering'),
('10000000-0000-0000-0000-000000000006', 'National Institute of Technology Trichy', 'Tiruchirappalli', 'Tamil Nadu', 8, 1964, 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Nitt_logo.svg/1200px-Nitt_logo.svg.png', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80', 'Government', '{"AICTE", "UGC"}', 4.5, 12.0, 45.0, 6000, 'The top-ranked NIT in India with excellent placement records.', 'Engineering'),
('10000000-0000-0000-0000-000000000007', 'All India Institute of Medical Sciences', 'New Delhi', 'Delhi', 1, 1956, 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/AIIMS_New_Delhi_Logo.svg/1200px-AIIMS_New_Delhi_Logo.svg.png', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80', 'Government', '{"MCI"}', 5.0, 25.0, 80.0, 2000, 'The premier medical institute in India.', 'Medical'),
('10000000-0000-0000-0000-000000000008', 'Christian Medical College', 'Vellore', 'Tamil Nadu', 3, 1900, 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Christian_Medical_College_Vellore_Logo.svg/1200px-Christian_Medical_College_Vellore_Logo.svg.png', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80', 'Private', '{"MCI"}', 4.8, 15.0, 30.0, 1500, 'One of the oldest and best medical colleges in India.', 'Medical'),
('10000000-0000-0000-0000-000000000009', 'Jawaharlal Institute of Postgraduate Medical Education and Research', 'Puducherry', 'Puducherry', 5, 1823, 'https://upload.wikimedia.org/wikipedia/en/thumb/0/06/JIPMER_Logo.svg/1200px-JIPMER_Logo.svg.png', 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80', 'Government', '{"MCI"}', 4.7, 18.0, 40.0, 1800, 'Institute of National Importance known for its quality medical education.', 'Medical'),
('10000000-0000-0000-0000-000000000010', 'Indian Institute of Management Ahmedabad', 'Ahmedabad', 'Gujarat', 1, 1961, 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/IIM_Ahmedabad_Logo.svg/1200px-IIM_Ahmedabad_Logo.svg.png', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80', 'Government', '{"AICTE", "AACSB", "EQUIS"}', 5.0, 32.0, 130.0, 1200, 'The best B-School in India, offering world-class management education.', 'Management'),
('10000000-0000-0000-0000-000000000011', 'Indian Institute of Management Bangalore', 'Bangalore', 'Karnataka', 2, 1973, 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/IIM_Bangalore_Logo.svg/1200px-IIM_Bangalore_Logo.svg.png', 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80', 'Government', '{"AICTE", "EQUIS"}', 4.9, 30.0, 80.0, 1100, 'Located in India''s Silicon Valley, focusing on innovation and entrepreneurship.', 'Management'),
('10000000-0000-0000-0000-000000000012', 'Indian Institute of Management Calcutta', 'Kolkata', 'West Bengal', 3, 1961, 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/IIM_Calcutta_Logo.svg/1200px-IIM_Calcutta_Logo.svg.png', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80', 'Government', '{"AICTE", "AACSB", "AMBA"}', 4.9, 29.0, 90.0, 1300, 'Known for its strong finance curriculum and beautiful campus.', 'Management'),
('10000000-0000-0000-0000-000000000013', 'Indian School of Business', 'Hyderabad', 'Telangana', 4, 2001, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Indian_School_of_Business_logo.svg/1200px-Indian_School_of_Business_logo.svg.png', 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80', 'Private', '{"AACSB", "EQUIS", "AMBA"}', 4.8, 34.0, 70.0, 900, 'A premier private business school with a one-year MBA program.', 'Management'),
('10000000-0000-0000-0000-000000000014', 'National Institute of Design', 'Ahmedabad', 'Gujarat', 1, 1961, 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/National_Institute_of_Design_Logo.svg/1200px-National_Institute_of_Design_Logo.svg.png', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80', 'Government', '{"UGC"}', 4.8, 12.0, 35.0, 1000, 'The dream destination for design aspirants in India.', 'Design'),
('10000000-0000-0000-0000-000000000015', 'National Institute of Fashion Technology', 'New Delhi', 'Delhi', 2, 1986, 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/National_Institute_of_Fashion_Technology_logo.svg/1200px-National_Institute_of_Fashion_Technology_logo.svg.png', 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80', 'Government', '{"Ministry of Textiles"}', 4.6, 8.0, 20.0, 2500, 'A pioneer in fashion education in India.', 'Design'),
('10000000-0000-0000-0000-000000000016', 'National Law School of India University', 'Bangalore', 'Karnataka', 1, 1986, 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/National_Law_School_of_India_University_Logo.svg/1200px-National_Law_School_of_India_University_Logo.svg.png', 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80', 'Government', '{"BCI", "UGC"}', 4.9, 16.0, 45.0, 800, 'The Harvard of the East for Law education.', 'Law'),
('10000000-0000-0000-0000-000000000017', 'NALSAR University of Law', 'Hyderabad', 'Telangana', 2, 1998, 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Nalsar_University_of_Law_Logo.svg/1200px-Nalsar_University_of_Law_Logo.svg.png', 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80', 'Government', '{"BCI", "UGC"}', 4.7, 14.0, 30.0, 750, 'One of the best NLUs offering top-notch legal education.', 'Law')
ON CONFLICT (id) DO NOTHING;

-- Seed Master Courses (needed for college_courses)
INSERT INTO public.master_courses (id, name, stream) VALUES
('20000000-0000-0000-0000-000000000001', 'B.Tech in Computer Science', 'Engineering'),
('20000000-0000-0000-0000-000000000002', 'B.Tech in Electrical Engineering', 'Engineering'),
('20000000-0000-0000-0000-000000000003', 'B.Tech in Mechanical Engineering', 'Engineering'),
('20000000-0000-0000-0000-000000000004', 'B.Tech in Mathematics & Computing', 'Engineering'),
('20000000-0000-0000-0000-000000000005', 'B.Tech in Aerospace Engineering', 'Engineering'),
('20000000-0000-0000-0000-000000000006', 'B.E. in Computer Science', 'Engineering'),
('20000000-0000-0000-0000-000000000007', 'B.E. in Electronics & Instrumentation', 'Engineering'),
('20000000-0000-0000-0000-000000000008', 'MBBS', 'Medical'),
('20000000-0000-0000-0000-000000000009', 'PGP (MBA)', 'Management'),
('20000000-0000-0000-0000-000000000010', 'PGP in Management', 'Management'),
('20000000-0000-0000-0000-000000000011', 'B.Des in Product Design', 'Design'),
('20000000-0000-0000-0000-000000000012', 'B.Des in Graphic Design', 'Design'),
('20000000-0000-0000-0000-000000000013', 'B.Des in Fashion Design', 'Design'),
('20000000-0000-0000-0000-000000000014', 'BA LLB (Hons)', 'Law')
ON CONFLICT (id) DO NOTHING;

-- Seed College Courses
INSERT INTO public.college_courses (id, college_id, course_id, fee, duration, seats, eligibility) VALUES
('30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 800000, '4 Years', 120, 'JEE Advanced with top rank'),
('30000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 800000, '4 Years', 150, 'JEE Advanced'),
('30000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000003', 800000, '4 Years', 180, 'JEE Advanced'),
('30000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 850000, '4 Years', 100, 'JEE Advanced'),
('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000004', 850000, '4 Years', 80, 'JEE Advanced'),
('30000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 900000, '4 Years', 110, 'JEE Advanced Top 50 Rank'),
('30000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000005', 900000, '4 Years', 60, 'JEE Advanced'),
('30000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000001', 820000, '4 Years', 90, 'JEE Advanced'),
('30000000-0000-0000-0000-000000000013', '10000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000006', 1600000, '4 Years', 150, 'BITSAT'),
('30000000-0000-0000-0000-000000000014', '10000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000007', 1600000, '4 Years', 100, 'BITSAT'),
('30000000-0000-0000-0000-000000000015', '10000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000001', 500000, '4 Years', 92, 'JEE Mains'),
('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000008', 6000, '5.5 Years', 125, 'NEET Top Rankers'),
('30000000-0000-0000-0000-000000000016', '10000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000008', 150000, '5.5 Years', 100, 'NEET'),
('30000000-0000-0000-0000-000000000017', '10000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000008', 12000, '5.5 Years', 150, 'NEET'),
('30000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000009', 2500000, '2 Years', 400, 'CAT + Interview'),
('30000000-0000-0000-0000-000000000018', '10000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000009', 2450000, '2 Years', 430, 'CAT'),
('30000000-0000-0000-0000-000000000019', '10000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000009', 2700000, '2 Years', 460, 'CAT'),
('30000000-0000-0000-0000-000000000020', '10000000-0000-0000-0000-000000000013', '20000000-0000-0000-0000-000000000010', 3500000, '1 Year', 600, 'GMAT / GRE'),
('30000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000014', '20000000-0000-0000-0000-000000000011', 1000000, '4 Years', 30, 'NID DAT'),
('30000000-0000-0000-0000-000000000021', '10000000-0000-0000-0000-000000000014', '20000000-0000-0000-0000-000000000012', 1000000, '4 Years', 25, 'NID DAT'),
('30000000-0000-0000-0000-000000000022', '10000000-0000-0000-0000-000000000015', '20000000-0000-0000-0000-000000000013', 1100000, '4 Years', 40, 'NIFT Entrance'),
('30000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000016', '20000000-0000-0000-0000-000000000014', 1200000, '5 Years', 180, 'CLAT'),
('30000000-0000-0000-0000-000000000023', '10000000-0000-0000-0000-000000000017', '20000000-0000-0000-0000-000000000014', 1150000, '5 Years', 120, 'CLAT')
ON CONFLICT (id) DO NOTHING;

-- Create banners table
create table if not exists public.banners (
  id bigint primary key generated always as identity,
  title text not null,
  subtitle text,
  description text,
  cta text not null default 'Learn More',
  cta_link text default '#',
  image text not null,
  gradient text default 'bg-gradient-to-r from-blue-600 to-indigo-700',
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.banners enable row level security;

-- Policy for public read access
-- Policy for public read access
drop policy if exists "Banners are viewable by everyone" on public.banners;
create policy "Banners are viewable by everyone"
  on public.banners for select
  using ( is_active = true );

-- Policy for admin/all access (for development simplicity, allowing all operations for now or authenticated)
-- Adjust based on actual auth setup. Assuming authenticated users (admins) can edit.
drop policy if exists "Admins can insert banners" on public.banners;
create policy "Admins can insert banners"
  on public.banners for insert
  with check ( true );

drop policy if exists "Admins can update banners" on public.banners;
create policy "Admins can update banners"
  on public.banners for update
  using ( true );

drop policy if exists "Admins can delete banners" on public.banners;
create policy "Admins can delete banners"
  on public.banners for delete
  using ( true );

-- Add initial data matching the hardcoded data
INSERT INTO public.banners (title, subtitle, description, cta, image, gradient)
VALUES
(
  'Year End Sale!',
  'Get up to 50% off on Premium College Applications',
  'Limited time offer for engineering and medical aspirants.',
  'Apply Now',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
  'bg-gradient-to-r from-blue-600 to-indigo-700'
),
(
  'Scholarship Mela 2025',
  '100% Scholarships Available',
  'Merit-based scholarships for top performers. Check your eligibility today.',
  'Check Eligibility',
  'https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?q=80&w=2070&auto=format&fit=crop',
  'bg-gradient-to-r from-emerald-500 to-teal-700'
),
(
  'Study Abroad',
  'Your Gateway to Global Education',
  'Expert counseling for USA, UK, Canada & Australia. Free consultation.',
  'Book Consultation',
  'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=2070&auto=format&fit=crop',
  'bg-gradient-to-r from-orange-500 to-red-600'
);
-- Enable RLS for counselors (already enabled, but good to be sure)
alter table public.counselors enable row level security;

-- Policy to allow anyone (public) to READ counselors (already exists, but recreating for completeness)
drop policy if exists "Public Read Counselors" on public.counselors;
create policy "Public Read Counselors" on public.counselors for select using (true);

-- Policy to allow authenticated users (Admins) to INSERT counselors
-- Changing to allow PUBLIC (true) for development to fix 401 error if not logged in
drop policy if exists "Authenticated Insert Counselors" on public.counselors;
create policy "Authenticated Insert Counselors" on public.counselors for insert with check (true);

-- Policy to allow authenticated users to UPDATE counselors
drop policy if exists "Authenticated Update Counselors" on public.counselors;
create policy "Authenticated Update Counselors" on public.counselors for update using (true);

-- Policy to allow authenticated users to DELETE counselors
drop policy if exists "Authenticated Delete Counselors" on public.counselors;
create policy "Authenticated Delete Counselors" on public.counselors for delete using (true);

-- NOTE: If you still face issues and want to unblock development completely, you can allow PUBLIC access (careful!):
-- create policy "Public ALL Counselors" on public.counselors for all using (true);
-- Create sticky_notes table
CREATE TABLE IF NOT EXISTS public.sticky_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    color TEXT DEFAULT '#EF4444',
    text_color TEXT DEFAULT '#FFFFFF',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- Create college_sticky_notes junction table
CREATE TABLE IF NOT EXISTS public.college_sticky_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    college_id UUID NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
    sticky_note_id UUID NOT NULL REFERENCES public.sticky_notes(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(college_id, sticky_note_id)
);
-- Enable RLS
ALTER TABLE public.sticky_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.college_sticky_notes ENABLE ROW LEVEL SECURITY;
-- Drop existing policies to allow re-running the script
DROP POLICY IF EXISTS "Enable read access for all users" ON public.sticky_notes;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.college_sticky_notes;
DROP POLICY IF EXISTS "Enable write access for all users" ON public.sticky_notes;
DROP POLICY IF EXISTS "Enable write access for all users" ON public.college_sticky_notes;
DROP POLICY IF EXISTS "Enable write access for authenticated users" ON public.sticky_notes;
DROP POLICY IF EXISTS "Enable write access for authenticated users" ON public.college_sticky_notes;
-- Create Policies
CREATE POLICY "Enable read access for all users" ON public.sticky_notes FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.college_sticky_notes FOR SELECT USING (true);
-- FOR DEVELOPMENT: Relaxing to public access to avoid 401s if auth is not fully set up.
CREATE POLICY "Enable write access for all users" ON public.sticky_notes FOR ALL USING (true);
CREATE POLICY "Enable write access for all users" ON public.college_sticky_notes FOR ALL USING (true);
-- Add is_recommended column to colleges table
ALTER TABLE public.colleges ADD COLUMN IF NOT EXISTS is_recommended BOOLEAN DEFAULT FALSE;
-- Safely add 'role' and 'email' columns if they don't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'role') THEN 
        ALTER TABLE public.users ADD COLUMN role text DEFAULT 'user'; 
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'email') THEN 
        ALTER TABLE public.users ADD COLUMN email text; 
    END IF;
END $$;

-- Safely create RLS policy if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE schemaname = 'public'
        AND tablename = 'users'
        AND policyname = 'Users can view their own data'
    ) THEN
        -- Enable RLS on users table if not already enabled (optional, good practice)
        ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Users can view their own data" ON public.users FOR SELECT USING (auth.uid() = id);
    END IF;
END $$;

-- Update the user role to admin
DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Find user ID from Supabase Auth table
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'admin@edumadras.com';

  IF v_user_id IS NOT NULL THEN
    -- Upsert into public.users
    -- We use ON CONFLICT to update if the record exists
    INSERT INTO public.users (id, email, role)
    VALUES (v_user_id, 'admin@edumadras.com', 'admin')
    ON CONFLICT (id) DO UPDATE
    SET role = 'admin', email = 'admin@edumadras.com';
    
    RAISE NOTICE 'Success: User admin@edumadras.com has been promoted to admin.';
  ELSE
    RAISE WARNING 'User admin@edumadras.com not found in auth.users. Please create the user in Supabase Authentication first.';
  END IF;
END $$;
-- Add image_url column to sticky_notes table
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'sticky_notes' AND column_name = 'image_url') THEN 
        ALTER TABLE public.sticky_notes ADD COLUMN image_url text; 
    END IF;
END $$;
-- Drop table and related objects for activities

-- 1. Drop the trigger on leads table
DROP TRIGGER IF EXISTS on_lead_created ON public.leads;

-- 2. Drop the trigger function
DROP FUNCTION IF EXISTS public.log_new_lead_activity();

-- 3. Drop the activities table
DROP TABLE IF EXISTS public.activities;
-- Enable RLS on banners table (if not already enabled)
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to start fresh and avoid conflicts
DROP POLICY IF EXISTS "Banners are viewable by everyone" ON public.banners;
DROP POLICY IF EXISTS "Admins can insert banners" ON public.banners;
DROP POLICY IF EXISTS "Admins can update banners" ON public.banners;
DROP POLICY IF EXISTS "Admins can delete banners" ON public.banners;
DROP POLICY IF EXISTS "Authenticated users can do everything" ON public.banners;
DROP POLICY IF EXISTS "Public can view active banners" ON public.banners;

-- 1. Public Read Access (Active banners only)
-- This is for the homepage to see active banners.
CREATE POLICY "Public can view active banners"
ON public.banners FOR SELECT
TO public
USING (is_active = true);

-- 2. Authenticated Access (Full Control)
-- This allows logged-in admins to seeing ALL banners (including inactive ones),
-- and to INSERT, UPDATE, and DELETE them.
CREATE POLICY "Authenticated users can do everything"
ON public.banners
TO authenticated
USING (true)
WITH CHECK (true);
-- Drop unique constraint on code
ALTER TABLE public.master_courses DROP CONSTRAINT IF EXISTS master_courses_code_key;

-- Drop unique constraint on name if it exists (it wasn't explicitly in the setup but good to be safe if it was added)
-- The setup script didn't have a unique constraint on name, only code.
-- But if one exists, we drop it.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'master_courses_name_key') THEN
    ALTER TABLE public.master_courses DROP CONSTRAINT master_courses_name_key;
  END IF;
END $$;
-- Enable RLS on master_courses (should be already enabled, but safe to repeat)
ALTER TABLE public.master_courses ENABLE ROW LEVEL SECURITY;

-- 1. DELETE Policy
DROP POLICY IF EXISTS "Allow Public Delete Master Courses" ON public.master_courses;
CREATE POLICY "Allow Public Delete Master Courses"
ON public.master_courses
FOR DELETE
USING (true);

-- 2. UPDATE Policy (Good practice to have if we allow delete/insert)
DROP POLICY IF EXISTS "Allow Public Update Master Courses" ON public.master_courses;
CREATE POLICY "Allow Public Update Master Courses"
ON public.master_courses
FOR UPDATE
USING (true);

-- Verify INSERT policy exists (from previous setup), if not recreate it
-- (Note: full_db_setup.sql already has this, but for a standalone fix script it doesn't hurt to ensure)
DROP POLICY IF EXISTS "Allow Public Insert Master Courses" ON public.master_courses;
CREATE POLICY "Allow Public Insert Master Courses"
ON public.master_courses
FOR INSERT
WITH CHECK (true);