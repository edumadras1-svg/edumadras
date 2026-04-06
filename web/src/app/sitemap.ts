import { MetadataRoute } from 'next';
import { mockColleges } from '@/lib/mockData';

const BASE_URL = 'https://edumadras.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Homepage
  const routes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ];

  // 2. College Pages (Dynamic from mockData)
  const collegeRoutes = mockColleges.map((college) => ({
    url: `${BASE_URL}/colleges/${college.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Stream Pages
  const streams = ['engineering', 'medical', 'management', 'law', 'design'];
  const streamRoutes = streams.map((stream) => ({
    url: `${BASE_URL}/streams/${stream}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 4. Guide Pages (10 hardcoded slugs)
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
  const guideRoutes = guideSlugs.map((slug) => ({
    url: `${BASE_URL}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...collegeRoutes, ...streamRoutes, ...guideRoutes];
}
