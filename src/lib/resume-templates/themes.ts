export interface ColorTheme {
  id: string;
  name: string;
  accent: string;
  accentSoft: string;
  ink: string;
  paper: string;
  fog: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  { id: "amber", name: "Amber", accent: "#c8791f", accentSoft: "#f5cd8b", ink: "#16202e", paper: "#ffffff", fog: "#5b6472" },
  { id: "navy", name: "Navy", accent: "#1e3a5f", accentSoft: "#c9d8e8", ink: "#16202e", paper: "#ffffff", fog: "#5b6472" },
  { id: "teal", name: "Teal", accent: "#0a8577", accentSoft: "#c3e8e2", ink: "#16202e", paper: "#ffffff", fog: "#5b6472" },
  { id: "coral", name: "Coral", accent: "#c33d24", accentSoft: "#f4cfc4", ink: "#16202e", paper: "#ffffff", fog: "#5b6472" },
  { id: "slate", name: "Slate", accent: "#3f4a5a", accentSoft: "#dbe0e6", ink: "#16202e", paper: "#ffffff", fog: "#5b6472" },
];

export function themeStyle(theme: ColorTheme): React.CSSProperties {
  return {
    "--r-accent": theme.accent,
    "--r-accent-soft": theme.accentSoft,
    "--r-ink": theme.ink,
    "--r-paper": theme.paper,
    "--r-fog": theme.fog,
  } as React.CSSProperties;
}
