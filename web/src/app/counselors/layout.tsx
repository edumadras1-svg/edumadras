import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expert College Counseling | EduMadras",
  description: "Get free personalized counseling for college admissions in Tamil Nadu. Our experts help you choose the right stream and institution for your career goals.",
};

export default function CounselorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
