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

export const mockColleges: College[] = [
  {
    id: "1",
    name: "Indian Institute of Technology Madras",
    city: "Chennai",
    state: "Tamil Nadu",
    rank: 1,
    rating: 4.9,
    avg_package: 21.5,
    highest_package: 198,
    total_students: 10500,
    stream: "Engineering",
    type: "Government",
    approvals: ["AICTE", "UGC"],
    banner_url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000",
    logo_url: null,
    is_recommended: true,
    established_year: 1959,
    description: "IIT Madras is one of the foremost institutes of national importance in higher technological education, basic and applied research. In 2023, IIT Madras was ranked #1 in the 'Overall' category for the fifth consecutive year and #1 in the 'Engineering' category for the eighth consecutive year by the National Institutional Ranking Framework (NIRF)."
  },
  {
    id: "2",
    name: "Indian Institute of Technology Delhi",
    city: "New Delhi",
    state: "Delhi",
    rank: 2,
    rating: 4.8,
    avg_package: 20,
    highest_package: 200,
    total_students: 9500,
    stream: "Engineering",
    type: "Government",
    approvals: ["AICTE", "UGC"],
    banner_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000",
    logo_url: null,
    is_recommended: false,
    established_year: 1961,
    description: "Indian Institute of Technology Delhi is one of the 23 IITs created to be Centres of Excellence for training, research and development in science, engineering and technology in India."
  },
  {
    id: "3",
    name: "Indian Institute of Technology Bombay",
    city: "Mumbai",
    state: "Maharashtra",
    rank: 3,
    rating: 4.9,
    avg_package: 23,
    highest_package: 210,
    total_students: 12000,
    stream: "Engineering",
    type: "Government",
    approvals: ["AICTE", "UGC"],
    banner_url: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1000",
    logo_url: null,
    is_recommended: true,
    established_year: 1958,
    description: "IIT Bombay, the second in the chain of IITs, was set up in 1958 with assistance from UNESCO and the erstwhile Soviet Union. It has grown from strength to strength, establishing a reputation as a leader in engineering education and research."
  },
  {
    id: "4",
    name: "Christian Medical College",
    city: "Vellore",
    state: "Tamil Nadu",
    rank: 3,
    rating: 4.8,
    avg_package: 12,
    highest_package: 30,
    total_students: 3500,
    stream: "Medical",
    type: "Private",
    approvals: ["MCI"],
    banner_url: "https://images.unsplash.com/photo-1538108149393-cebb51897c65?auto=format&fit=crop&q=80&w=1000",
    logo_url: null,
    is_recommended: true,
    established_year: 1900,
    description: "Christian Medical College Vellore (CMC) is a private, Christian community-run medical school, hospital and research institute. This Institute includes a network of primary, secondary and tertiary care hospitals in and around Vellore."
  },
  {
    id: "5",
    name: "IIM Ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    rank: 1,
    rating: 4.9,
    avg_package: 32,
    highest_package: 115,
    total_students: 1200,
    stream: "Management",
    type: "Government",
    approvals: ["AACSB", "EQUIS", "AMBA"],
    banner_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000",
    logo_url: null,
    is_recommended: true,
    established_year: 1961,
    description: "The Indian Institute of Management Ahmedabad is a public business school located in Ahmedabad, Gujarat, India. The institute has been accorded the status of an Institute of National Importance by Ministry of Human Resources, Government of India in 2017."
  },
  {
    id: "6",
    name: "National Law School of India University",
    city: "Bengaluru",
    state: "Karnataka",
    rank: 1,
    rating: 4.8,
    avg_package: 16,
    highest_package: 45,
    total_students: 800,
    stream: "Law",
    type: "Government",
    approvals: ["BCI", "UGC"],
    banner_url: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&q=80&w=1000",
    logo_url: null,
    is_recommended: true,
    established_year: 1986,
    description: "The National Law School of India University (NLSIU) is a public law school and a National Law University located in Bengaluru, Karnataka. It was the first National Law University to be established in India."
  },
  {
    id: "7",
    name: "National Institute of Design",
    city: "Ahmedabad",
    state: "Gujarat",
    rank: 1,
    rating: 4.7,
    avg_package: 15,
    highest_package: 48,
    total_students: 600,
    stream: "Design",
    type: "Government",
    approvals: ["UGC"],
    banner_url: "https://images.unsplash.com/photo-1510146758428-e5e4b17b8b6a?auto=format&fit=crop&q=80&w=1000",
    logo_url: null,
    is_recommended: false,
    established_year: 1961,
    description: "The National Institute of Design (NID) is a design school in Ahmedabad with campuses in Gandhinagar and Bengaluru. The institute functions as an autonomous body under the Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce and Industry."
  },
  {
    id: "8",
    name: "VIT Vellore",
    city: "Vellore",
    state: "Tamil Nadu",
    rank: 11,
    rating: 4.3,
    avg_package: 8.5,
    highest_package: 75,
    total_students: 35000,
    stream: "Engineering",
    type: "Private",
    approvals: ["AICTE", "UGC", "NAAC"],
    banner_url: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&q=80&w=1000",
    logo_url: null,
    is_recommended: false,
    established_year: 1984,
    description: "Vellore Institute of Technology (VIT) is a private deemed university located in Katpadi in Vellore, Tamil Nadu, India. Founded in 1984, as Vellore Engineering College, by G. Viswanathan, the institution offers 66 Undergraduate, 58 Postgraduate, 15 Integrated, 2 Research and 2 M.Tech Industrial Programmes."
  },
  {
    id: "9",
    name: "SRM Institute of Science and Technology",
    city: "Chennai",
    state: "Tamil Nadu",
    rank: 18,
    rating: 4.2,
    avg_package: 6.5,
    highest_package: 50,
    total_students: 45000,
    stream: "Engineering",
    type: "Private",
    approvals: ["AICTE", "UGC", "NAAC"],
    banner_url: "https://images.unsplash.com/photo-1544837582-7ce61ef174dd?auto=format&fit=crop&q=80&w=1000",
    logo_url: null,
    is_recommended: false,
    established_year: 1985,
    description: "SRM Institute of Science and Technology is a private deemed university located in Kattankulathur, Kanchipuram, Tamil Nadu, India, near Chennai."
  },
  {
    id: "10",
    name: "IIM Bangalore",
    city: "Bengaluru",
    state: "Karnataka",
    rank: 2,
    rating: 4.9,
    avg_package: 33,
    highest_package: 120,
    total_students: 1100,
    stream: "Management",
    type: "Government",
    approvals: ["AACSB", "EQUIS"],
    banner_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000",
    logo_url: null,
    is_recommended: true,
    established_year: 1973,
    description: "The Indian Institute of Management Bangalore is a public business school and Institute of National Importance located in Bangalore, India."
  }
];

export const mockCourses: CollegeCourse[] = [
  {
    id: "c1",
    college_id: "1",
    fee: 215000,
    duration: "4 Years",
    seats: 120,
    eligibility: "10+2 with 75% + JEE Advanced",
    avg_package: 22,
    master_courses: { name: "B.Tech Computer Science and Engineering", stream: "Engineering" }
  },
  {
    id: "c2",
    college_id: "1",
    fee: 215000,
    duration: "4 Years",
    seats: 100,
    eligibility: "10+2 with 75% + JEE Advanced",
    avg_package: 18,
    master_courses: { name: "B.Tech Mechanical Engineering", stream: "Engineering" }
  },
  {
    id: "c3",
    college_id: "4",
    fee: 50000,
    duration: "5.5 Years",
    seats: 100,
    eligibility: "10+2 with 50% + NEET",
    avg_package: 12,
    master_courses: { name: "MBBS", stream: "Medical" }
  },
  {
    id: "c4",
    college_id: "5",
    fee: 2500000,
    duration: "2 Years",
    seats: 400,
    eligibility: "Bachelor's Degree + CAT",
    avg_package: 32,
    master_courses: { name: "PGP in Management", stream: "Management" }
  },
  {
    id: "c5",
    college_id: "6",
    fee: 350000,
    duration: "5 Years",
    seats: 120,
    eligibility: "10+2 with 45% + CLAT",
    avg_package: 16,
    master_courses: { name: "B.A. LL.B. (Hons.)", stream: "Law" }
  },
  {
    id: "c6",
    college_id: "8",
    fee: 198000,
    duration: "4 Years",
    seats: 1200,
    eligibility: "10+2 with 60% + VITEEE",
    avg_package: 9,
    master_courses: { name: "B.Tech Computer Science and Engineering", stream: "Engineering" }
  }
];
