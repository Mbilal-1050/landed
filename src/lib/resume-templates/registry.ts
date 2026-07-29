import type { ComponentType } from "react";
import type { ResumeData, TemplateCategory } from "./types";
import { COLOR_THEMES } from "./themes";
import ModernMinimal from "@/components/resume-templates/ModernMinimal";
import AtsProfessional from "@/components/resume-templates/AtsProfessional";
import TwoColumnSidebar from "@/components/resume-templates/TwoColumnSidebar";
import CreativeColorful from "@/components/resume-templates/CreativeColorful";
import ExecutiveClassic from "@/components/resume-templates/ExecutiveClassic";
import Academic from "@/components/resume-templates/Academic";
import TechDeveloper from "@/components/resume-templates/TechDeveloper";
import EntryLevel from "@/components/resume-templates/EntryLevel";

export interface LayoutDef {
  id: string;
  name: string;
  category: TemplateCategory;
  component: ComponentType<{ data: ResumeData }>;
}

export const LAYOUTS: LayoutDef[] = [
  { id: "modern-minimal", name: "Modern Minimal", category: "Modern & Minimal", component: ModernMinimal },
  { id: "ats-professional", name: "ATS Professional", category: "ATS Professional", component: AtsProfessional },
  { id: "two-column-sidebar", name: "Two-Column Sidebar", category: "Two-Column", component: TwoColumnSidebar },
  { id: "creative-colorful", name: "Creative Colorful", category: "Creative", component: CreativeColorful },
  { id: "executive-classic", name: "Executive Classic", category: "Executive", component: ExecutiveClassic },
  { id: "academic", name: "Academic", category: "Academic", component: Academic },
  { id: "tech-developer", name: "Tech Developer", category: "Tech & Developer", component: TechDeveloper },
  { id: "entry-level", name: "Entry Level", category: "Entry-Level", component: EntryLevel },
];

export const CATEGORIES: TemplateCategory[] = [
  "Modern & Minimal",
  "ATS Professional",
  "Two-Column",
  "Creative",
  "Executive",
  "Academic",
  "Tech & Developer",
  "Entry-Level",
];

export interface TemplateVariant {
  key: string; // `${layoutId}__${themeId}`
  layoutId: string;
  layoutName: string;
  category: TemplateCategory;
  themeId: string;
  themeName: string;
  component: ComponentType<{ data: ResumeData }>;
}

// Every layout × color theme combination — this is what powers the gallery.
export const TEMPLATE_VARIANTS: TemplateVariant[] = LAYOUTS.flatMap((layout) =>
  COLOR_THEMES.map((theme) => ({
    key: `${layout.id}__${theme.id}`,
    layoutId: layout.id,
    layoutName: layout.name,
    category: layout.category,
    themeId: theme.id,
    themeName: theme.name,
    component: layout.component,
  }))
);

export function getLayout(layoutId: string): LayoutDef {
  return LAYOUTS.find((l) => l.id === layoutId) ?? LAYOUTS[0];
}

export function getTheme(themeId: string) {
  return COLOR_THEMES.find((t) => t.id === themeId) ?? COLOR_THEMES[0];
}
