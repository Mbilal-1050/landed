export interface CoverLetterData {
  fullName: string;
  email?: string;
  phone?: string;
  location?: string;
  date: string;
  company?: string;
  targetRole: string;
  body: string; // full letter body text (paragraphs separated by \n\n)
}

export const SAMPLE_COVER_LETTER: CoverLetterData = {
  fullName: "Jordan Lee",
  email: "jordan.lee@email.com",
  phone: "(555) 123-4567",
  location: "Austin, TX",
  date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  company: "Northwind Software",
  targetRole: "Product Marketing Manager",
  body: "I'm writing to apply for the Product Marketing Manager role at Northwind Software. In my current role leading go-to-market for B2B SaaS launches, I've grown qualified pipeline by 28% year-over-year and built lifecycle programs that measurably improved conversion.\n\nWhat draws me to this role is the chance to bring that same rigor to a team that clearly values customer research as much as I do. I'd welcome the opportunity to talk through how my experience could contribute from day one.\n\nThank you for your time and consideration.",
};
