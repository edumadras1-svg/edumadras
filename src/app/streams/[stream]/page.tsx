import { TopNavBar } from "@/components/TopNavBar";
import { CollegeCard } from "@/components/CollegeCard";
import { supabase } from "@/lib/supabase/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ stream: string }> }): Promise<Metadata> {
  const { stream: streamParam } = await params;
  const stream = streamParam.charAt(0).toUpperCase() + streamParam.slice(1);
  return {
    title: `Top ${stream} Colleges in Tamil Nadu 2026 | EduMadras`,
    description: `Discover the best ${stream} colleges in Tamil Nadu for 2026. Compare fees, rankings, and placement statistics to find your perfect fit.`,
  };
}

export default async function StreamPage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream: streamParam } = await params;
  const streamName = streamParam.charAt(0).toUpperCase() + streamParam.slice(1);

  const { data: streamColleges } = await supabase
    .from("colleges")
    .select("*")
    .ilike("stream", `%${streamName}%`);

  const colleges = streamColleges || [];

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <TopNavBar />

      <div className="bg-white border-b border-border-ghost px-4 py-3">
        <div className="container-mobile">
          <nav className="flex items-center gap-1.5 text-caption" aria-label="Breadcrumb">
            <Link href="/" className="text-blue-mid hover:underline">Home</Link>
            <ChevronRight className="w-3 h-3 text-text-tertiary" />
            <span className="text-text-secondary font-medium">Streams</span>
            <ChevronRight className="w-3 h-3 text-text-tertiary" />
            <span className="text-text-secondary font-medium">{streamName}</span>
          </nav>
        </div>
      </div>

      <main className="container-mobile py-8 pb-24">
        <div className="mb-8">
          <h1 className="text-h1 text-text-primary">Top {streamName} Colleges in Tamil Nadu 2026</h1>
          <p className="text-body-lg text-text-secondary mt-2">
            Explore and compare the highest-ranked {streamName} institutions based on the 2026 NIRF data, placements, and infrastructure.
          </p>
        </div>

        {colleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <CollegeCard
                key={college.id}
                id={college.id}
                name={college.name}
                location={`${college.city}, ${college.state}`}
                rating={college.rating || 0}
                fees={college.avg_package ? `₹${college.avg_package}L/yr` : "N/A"}
                package={`${college.avg_package} LPA`}
                rank={college.rank || undefined}
                stream={college.stream || ""}
                approvals={college.approvals || []}
                bannerUrl={college.banner_url || undefined}
                logoUrl={college.logo_url || undefined}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-card">
            <h2 className="text-h3 text-text-primary">No colleges found in this stream</h2>
            <p className="text-text-secondary mt-2">
              We are continuously updating our database. Please check back later.
            </p>
            <Link href="/" className="mt-6 inline-block text-teal font-semibold hover:underline">
              Go back home
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
