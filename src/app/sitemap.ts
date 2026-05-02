import { MetadataRoute } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const BASE_URL = 'https://edumadras.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerSupabaseClient();

  // 1. Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/colleges`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // 2. College Pages (Dynamic from Supabase)
  const { data: colleges, error } = await supabase
    .from('colleges')
    .select('id')
    .order('name');

  if (error) {
    console.error('Sitemap: Failed to fetch colleges', error);
  }

  const collegeRoutes: MetadataRoute.Sitemap = (colleges || []).map((college) => ({
    url: `${BASE_URL}/colleges/${college.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. Stream Pages
  const streams = ['engineering', 'medical', 'management', 'law', 'design'];
  const streamRoutes: MetadataRoute.Sitemap = streams.map((stream) => ({
    url: `${BASE_URL}/streams/${stream}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 4. Guide Pages
  const guideSlugs = [
    'admission-tips',
    'scholarship-guide',
    'entrance-exams-2026',
    'top-engineering-colleges',
    'medical-admission-process',
    'choosing-the-right-stream',
    'hostel-life-tips',
    'preparing-for-counseling',
    'documents-required-for-college',
    'career-after-graduation',
  ];
  const guideRoutes: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${BASE_URL}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // 5. Phase 1 SEO Pages (Priority 1 — highest traffic keywords)
  const seoPages = [
    '/nirf-ranking-2025-engineering-colleges',
    '/engineering-colleges/chennai',
    '/engineering-colleges/tamilnadu',
    '/top-engineering-colleges-in-chennai',
    '/top-10-engineering-colleges-chennai',
    '/top-50-engineering-colleges-chennai',
    '/top-engineering-colleges-tamilnadu',
    '/top-10-engineering-colleges-tamilnadu',
    '/top-50-engineering-colleges-tamilnadu-rank-wise',
    '/engineering-colleges-tamilnadu-rank-wise',
    '/engineering-colleges-chennai-placement',
    '/medical-colleges/chennai',
    '/arts-science-colleges/chennai',
    '/arts-science-colleges/tamilnadu',
    '/aeronautical-engineering-colleges-tamilnadu',
    '/marine-engineering-colleges-tamilnadu',
  ];
  const seoRoutes: MetadataRoute.Sitemap = seoPages.map((slug) => ({
    url: `${BASE_URL}${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 6. Phase 2 SEO Pages (Priority 2 — medium traffic keywords)
  const phase2Pages = [
    '/government-arts-science-colleges-chennai',
    '/top-10-arts-science-colleges-chennai',
    '/top-5-arts-science-colleges-chennai',
    '/top-arts-science-colleges-chennai',
    '/top-10-arts-science-colleges-tamilnadu',
    '/top-20-arts-science-colleges-tamilnadu',
    '/top-arts-science-colleges-tamilnadu',
    '/aeronautical-engineering-colleges-chennai',
    '/aerospace-engineering-colleges-chennai',
    '/biomedical-engineering-colleges-chennai',
    '/engineering-colleges-chennai-low-fees',
    '/marine-engineering-colleges-chennai',
    '/top-10-engineering-colleges-chennai-2025',
    '/aerospace-engineering-colleges-tamilnadu',
    '/biomedical-engineering-colleges-tamilnadu',
    '/chemical-engineering-colleges-tamilnadu',
    '/government-engineering-colleges-tamilnadu',
    '/engineering-colleges-tamilnadu-cutoff',
    '/best-medical-colleges-chennai',
    '/government-medical-colleges-chennai',
    '/private-medical-colleges-chennai-fees',
    '/private-medical-colleges-chennai',
    '/top-medical-colleges-chennai',
  ];
  const phase2Routes: MetadataRoute.Sitemap = phase2Pages.map((slug) => ({
    url: `${BASE_URL}${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 7. Phase 3 SEO Pages (Priority 3 — quick wins)
  const phase3Pages = [
    '/engineering-colleges-chennai-140-cutoff',
    '/engineering-colleges-chennai-150-cutoff',
    '/engineering-colleges-chennai-160-cutoff',
    '/engineering-colleges-chennai-cyber-security',
    '/engineering-colleges-chennai-for-girls',
    '/engineering-colleges-chennai-cse-fees',
    '/engineering-colleges-chennai-list',
    '/engineering-colleges-chennai-without-jee',
    '/tier-1-engineering-colleges-chennai',
    '/tier-3-engineering-colleges-chennai',
    '/mba-colleges/tamilnadu',
    '/government-medical-colleges-chennai-top-10',
    '/medical-colleges/tamilnadu',
    '/architecture-colleges-tamilnadu',
    '/hotel-management-colleges-tamilnadu',
    '/law-colleges/tamilnadu',
    '/nursing-colleges-tamilnadu',
    '/government-pharmacy-colleges-tamilnadu',
    '/engineering-colleges/chennai/avadi',
    '/engineering-colleges/chennai/omr',
    '/engineering-colleges/chennai/tambaram',
    '/engineering-colleges/chennai/poonamallee',
    '/engineering-colleges/tamilnadu/vellore',
  ];
  const phase3Routes: MetadataRoute.Sitemap = phase3Pages.map((slug) => ({
    url: `${BASE_URL}${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 8. Regional Strategy Pages
  const regionalPages = [
    '/engineering-colleges/kallakurichi',
    '/arts-science-colleges/kallakurichi',
    '/medical-colleges/kallakurichi',
    '/colleges-in-kallakurichi',
  ];
  const regionalRoutes: MetadataRoute.Sitemap = regionalPages.map((slug) => ({
    url: `${BASE_URL}${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  return [...routes, ...seoRoutes, ...phase2Routes, ...phase3Routes, ...regionalRoutes, ...collegeRoutes, ...streamRoutes, ...guideRoutes];
}
