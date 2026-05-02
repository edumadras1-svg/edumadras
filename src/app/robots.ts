import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/static/'],  // Allow CSS/JS for rendering
        disallow: [
          '/api/',
          '/admin/',
          '/_next/data/',   // Save crawl budget - internal Next.js data routes
        ],
      },
      {
        // AI crawlers (GPTBot, ClaudeBot, PerplexityBot) - allow all public pages
        // These crawlers don't execute JS, so our SSR HTML is critical
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Applebot'],
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: 'https://edumadras.com/sitemap.xml',
  };
}
