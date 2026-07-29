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
  certifications?: string[];
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

export const SAMPLE_RESUME_DATA: ResumeData = {
  fullName: "Jordan Lee",
  targetRole: "Product Marketing Manager",
  email: "jordan.lee@email.com",
  phone: "(555) 123-4567",
  location: "Austin, TX",
  linkedin: "linkedin.com/in/jordanlee",
  photoUrl: null,
  summary:
    "Product marketer with 5 years of experience launching B2B SaaS products, running lifecycle campaigns, and translating customer research into positioning that drives pipeline.",
  experience: [
    {
      title: "Senior Product Marketing Manager",
      company: "Northwind Software",
      dates: "2022 — Present",
      bullets: [
        "Led go-to-market for 3 major product launches, contributing to 28% YoY growth in qualified pipeline",
        "Built lifecycle email program that lifted trial-to-paid conversion by 14%",
        "Partnered with sales to create battlecards used across a 40-person team",
      ],
    },
    {
      title: "Product Marketing Associate",
      company: "Fieldstone Labs",
      dates: "2020 — 2022",
      bullets: [
        "Ran customer interviews that shaped the v2 pricing and packaging model",
        "Managed content calendar across blog, social, and email",
      ],
    },
  ],
  education: [{ school: "University of Texas", degree: "B.A. Marketing", dates: "2020" }],
  skills: ["Positioning", "Lifecycle marketing", "SQL", "Figma", "Customer research", "Analytics"],
  projects: [],
  certifications: [],
  languages: [],
};
