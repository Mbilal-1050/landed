import type { ComponentType } from "react";
import type { ResumeData, TemplateCategory } from "./types";
import { COLOR_THEMES } from "./themes";
import ModernMinimal from "@/components/resume-templates/ModernMinimal";
import Nova from "@/components/resume-templates/Nova";
import AtsProfessional from "@/components/resume-templates/AtsProfessional";
import Clarity from "@/components/resume-templates/Clarity";
import TwoColumnSidebar from "@/components/resume-templates/TwoColumnSidebar";
import Harbor from "@/components/resume-templates/Harbor";
import CreativeColorful from "@/components/resume-templates/CreativeColorful";
import ExecutiveClassic from "@/components/resume-templates/ExecutiveClassic";
import Academic from "@/components/resume-templates/Academic";
import TechDeveloper from "@/components/resume-templates/TechDeveloper";
import Cursor from "@/components/resume-templates/Cursor";
import EntryLevel from "@/components/resume-templates/EntryLevel";

export interface LayoutDef {
  id: string;
  name: string;
  category: TemplateCategory;
  component: ComponentType<{ data: ResumeData }>;
}

export const LAYOUTS: LayoutDef[] = [
  { id: "modern-minimal", name: "Aspen", category: "Modern & Minimal", component: ModernMinimal },
  { id: "nova", name: "Nova", category: "Modern & Minimal", component: Nova },
  { id: "ats-professional", name: "Beacon", category: "ATS Professional", component: AtsProfessional },
  { id: "clarity", name: "Clarity", category: "ATS Professional", component: Clarity },
  { id: "two-column-sidebar", name: "Meridian", category: "Two-Column", component: TwoColumnSidebar },
  { id: "harbor", name: "Harbor", category: "Two-Column", component: Harbor },
  { id: "creative-colorful", name: "Prism", category: "Creative", component: CreativeColorful },
  { id: "executive-classic", name: "Sterling", category: "Executive", component: ExecutiveClassic },
  { id: "academic", name: "Scholar", category: "Academic", component: Academic },
  { id: "tech-developer", name: "Terminal", category: "Tech & Developer", component: TechDeveloper },
  { id: "cursor", name: "Cursor", category: "Tech & Developer", component: Cursor },
  { id: "entry-level", name: "Horizon", category: "Entry-Level", component: EntryLevel },
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
