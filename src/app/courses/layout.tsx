import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore All Courses | EduMadras",
  description: "Find and compare the best undergraduate and postgraduate courses in Tamil Nadu. Detailed information on fees, duration, and placement prospects.",
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
