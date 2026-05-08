export interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  rank: number | null;
  rating: number | null;
  avg_package: number | null;
  highest_package: number | null;
  total_students: number | null;
  stream: string | null;
  type: string | null;
  approvals: string[] | null;
  banner_url: string | null;
  logo_url: string | null;
  is_recommended: boolean | null;
  established_year: number | null;
  description: string | null;
  scholarship_enabled: boolean | null;
  scholarship_text: string | null;
}

export interface CollegeCourse {
  id: string;
  college_id: string;
  fee: number | null;
  duration: string | null;
  seats: number | null;
  eligibility: string | null;
  avg_package: number | null;
  master_courses: {
    name: string;
    stream: string | null;
  };
}
