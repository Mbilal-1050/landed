import type { ComponentType } from "react";
import type { CoverLetterData } from "./types";
import ClassicLetter from "@/components/cover-letter-templates/ClassicLetter";
import ModernHeader from "@/components/cover-letter-templates/ModernHeader";
import Minimal from "@/components/cover-letter-templates/Minimal";
import BoldAccent from "@/components/cover-letter-templates/BoldAccent";
import Elegant from "@/components/cover-letter-templates/Elegant";

export interface CoverLetterLayoutDef {
  id: string;
  name: string;
  component: ComponentType<{ data: CoverLetterData }>;
}

export const COVER_LETTER_LAYOUTS: CoverLetterLayoutDef[] = [
  { id: "classic-letter", name: "Classic", component: ClassicLetter },
  { id: "modern-header", name: "Modern Header", component: ModernHeader },
  { id: "minimal-letter", name: "Minimal", component: Minimal },
  { id: "bold-accent", name: "Bold Accent", component: BoldAccent },
  { id: "elegant-letter", name: "Elegant", component: Elegant },
];

export function getCoverLetterLayout(id: string): CoverLetterLayoutDef {
  return COVER_LETTER_LAYOUTS.find((l) => l.id === id) ?? COVER_LETTER_LAYOUTS[0];
}
