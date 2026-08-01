export interface ResumeExperience {
  title: string;
  company: string;
  dates: string;
  bullets: string[];
}

export interface ResumeEducation {
  school: string;
  degree: string;
  dates: string;
}

export interface ResumeProject {
  name: string;
  description: string;
}

export interface ResumeCertificate {
  name: string;
  url: string;
}

export interface ResumeData {
  fullName: string;
  targetRole: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  photoUrl?: string | null;
  summary: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: string[];
  projects?: ResumeProject[];
  certifications?: ResumeCertificate[];
  languages?: string[];
}

export type TemplateCategory =
  | "Modern & Minimal"
  | "ATS Professional"
  | "Two-Column"
  | "Creative"
  | "Executive"
  | "Academic"
  | "Tech & Developer"
  | "Entry-Level";

export const SAMPLE_PROFILES: Record<TemplateCategory, ResumeData> = {
  "Modern & Minimal": {
    fullName: "Jordan Lee",
    targetRole: "Product Marketing Manager",
    email: "jordan.lee@email.com",
    phone: "(555) 123-4567",
    location: "Austin, TX",
    linkedin: "linkedin.com/in/jordanlee",
    photoUrl: null,
    summary: "Product marketer with 5 years launching B2B SaaS products and turning customer research into positioning that drives pipeline.",
    experience: [
      { title: "Senior Product Marketing Manager", company: "Northwind Software", dates: "2022 — Present", bullets: ["Led go-to-market for 3 major launches, contributing to 28% YoY pipeline growth", "Built a lifecycle email program that lifted trial-to-paid conversion by 14%"] },
      { title: "Product Marketing Associate", company: "Fieldstone Labs", dates: "2020 — 2022", bullets: ["Ran customer interviews that shaped the v2 pricing model"] },
    ],
    education: [{ school: "University of Texas", degree: "B.A. Marketing", dates: "2020" }],
    skills: ["Positioning", "Lifecycle marketing", "SQL", "Figma", "Analytics"],
  },
  "ATS Professional": {
    fullName: "Priya Sharma",
    targetRole: "Operations Manager",
    email: "priya.sharma@email.com",
    phone: "(555) 908-2211",
    location: "Chicago, IL",
    linkedin: "linkedin.com/in/priyasharma",
    photoUrl: null,
    summary: "Operations manager with 7 years streamlining supply chain workflows and leading cross-functional teams of up to 20.",
    experience: [
      { title: "Operations Manager", company: "Harbor Logistics", dates: "2021 — Present", bullets: ["Reduced fulfillment time by 22% through process redesign", "Managed a team of 18 across two warehouses"] },
      { title: "Operations Analyst", company: "Crestline Retail", dates: "2018 — 2021", bullets: ["Built reporting dashboards adopted company-wide"] },
    ],
    education: [{ school: "Ohio State University", degree: "B.S. Supply Chain Management", dates: "2018" }],
    skills: ["Process improvement", "Inventory planning", "Excel", "SAP", "Team leadership"],
  },
  "Two-Column": {
    fullName: "Marcus Webb",
    targetRole: "UX Designer",
    email: "marcus.webb@email.com",
    phone: "(555) 447-8820",
    location: "Seattle, WA",
    linkedin: "linkedin.com/in/marcuswebb",
    photoUrl: null,
    summary: "UX designer focused on research-driven product design for fintech and healthcare platforms.",
    experience: [
      { title: "Senior UX Designer", company: "Bridgeway Health", dates: "2021 — Present", bullets: ["Redesigned patient portal, cutting task completion time by 35%", "Ran 40+ usability sessions across 3 product lines"] },
      { title: "UX Designer", company: "Coinline", dates: "2019 — 2021", bullets: ["Shipped mobile onboarding flow used by 200k+ users"] },
    ],
    education: [{ school: "Rhode Island School of Design", degree: "B.F.A. Graphic Design", dates: "2019" }],
    skills: ["Figma", "User research", "Prototyping", "Design systems", "Accessibility"],
  },
  Creative: {
    fullName: "Amara Chen",
    targetRole: "Brand Designer",
    email: "amara.chen@email.com",
    phone: "(555) 662-1093",
    location: "Los Angeles, CA",
    linkedin: "linkedin.com/in/amarachen",
    photoUrl: null,
    summary: "Brand designer who's led visual identity work for 15+ startups, from logo systems to full campaign rollouts.",
    experience: [
      { title: "Lead Brand Designer", company: "Studio Palette", dates: "2022 — Present", bullets: ["Directed rebrand for 4 venture-backed startups", "Built design systems adopted across web, print, and social"] },
      { title: "Graphic Designer", company: "Kindred Agency", dates: "2020 — 2022", bullets: ["Designed campaign assets for clients including two Fortune 500 brands"] },
    ],
    education: [{ school: "Parsons School of Design", degree: "B.F.A. Communication Design", dates: "2020" }],
    skills: ["Brand identity", "Adobe Creative Suite", "Art direction", "Typography", "Motion design"],
  },
  Executive: {
    fullName: "Richard Ashford",
    targetRole: "VP of Operations",
    email: "richard.ashford@email.com",
    phone: "(555) 213-4470",
    location: "New York, NY",
    linkedin: "linkedin.com/in/richardashford",
    photoUrl: null,
    summary: "Operations executive with 15 years scaling manufacturing and logistics organizations through periods of rapid growth.",
    experience: [
      { title: "VP of Operations", company: "Meridian Industrial", dates: "2019 — Present", bullets: ["Scaled operations from 3 to 11 facilities while improving margin by 6 points", "Built the executive operations team from the ground up"] },
      { title: "Director of Operations", company: "Ashcroft Manufacturing", dates: "2014 — 2019", bullets: ["Led a $40M facility expansion delivered on time and under budget"] },
    ],
    education: [{ school: "Northwestern University, Kellogg School", degree: "M.B.A.", dates: "2014" }],
    skills: ["P&L ownership", "Manufacturing operations", "M&A integration", "Executive leadership"],
  },
  Academic: {
    fullName: "Dr. Elena Vasquez",
    targetRole: "Postdoctoral Researcher, Molecular Biology",
    email: "elena.vasquez@email.com",
    phone: "(555) 774-3312",
    location: "Boston, MA",
    linkedin: "linkedin.com/in/elenavasquez",
    photoUrl: null,
    summary: "Molecular biologist researching gene regulation in cancer cell lines, with 6 peer-reviewed publications.",
    experience: [
      { title: "Graduate Researcher", company: "MIT Department of Biology", dates: "2020 — 2025", bullets: ["Published 4 first-author papers in peer-reviewed journals", "Presented research at 3 international conferences"] },
      { title: "Research Assistant", company: "Broad Institute", dates: "2018 — 2020", bullets: ["Contributed to a genomics dataset cited in 12+ downstream studies"] },
    ],
    education: [{ school: "MIT", degree: "Ph.D. Molecular Biology", dates: "2025" }, { school: "UC Berkeley", degree: "B.S. Biochemistry", dates: "2018" }],
    skills: ["CRISPR", "RNA sequencing", "Statistical analysis", "Grant writing", "Python"],
  },
  "Tech & Developer": {
    fullName: "Sam Okafor",
    targetRole: "Backend Engineer",
    email: "sam.okafor@email.com",
    phone: "(555) 390-8845",
    location: "Remote",
    linkedin: "linkedin.com/in/samokafor",
    photoUrl: null,
    summary: "Backend engineer specializing in distributed systems, with production experience scaling APIs to millions of requests per day.",
    experience: [
      { title: "Backend Engineer", company: "Latchkey", dates: "2022 — Present", bullets: ["Rebuilt payments service, cutting p99 latency by 60%", "Migrated monolith to microservices across 6 teams"] },
      { title: "Software Engineer", company: "Reef Systems", dates: "2020 — 2022", bullets: ["Built internal tooling adopted by 40+ engineers"] },
    ],
    education: [{ school: "Georgia Tech", degree: "B.S. Computer Science", dates: "2020" }],
    skills: ["Go", "PostgreSQL", "Kubernetes", "AWS", "gRPC"],
  },
  "Entry-Level": {
    fullName: "Taylor Kim",
    targetRole: "Marketing Coordinator",
    email: "taylor.kim@email.com",
    phone: "(555) 501-6634",
    location: "Denver, CO",
    linkedin: "linkedin.com/in/taylorkim",
    photoUrl: null,
    summary: "Recent marketing graduate with internship experience in social media and content strategy, eager to grow in a fast-paced team.",
    experience: [
      { title: "Marketing Intern", company: "Bright Path Nonprofit", dates: "Summer 2025", bullets: ["Grew Instagram following by 3x over a 10-week internship", "Wrote weekly newsletter reaching 2,000+ subscribers"] },
    ],
    education: [{ school: "University of Colorado Boulder", degree: "B.A. Marketing", dates: "2026" }],
    skills: ["Social media", "Canva", "Content writing", "Google Analytics"],
  },
};

// Kept for any code still referencing a single default sample.
export const SAMPLE_RESUME_DATA: ResumeData = SAMPLE_PROFILES["Modern & Minimal"];

