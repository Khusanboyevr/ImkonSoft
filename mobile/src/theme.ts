/**
 * Mirrors the CSS custom properties in ../../src/app/globals.css so the app and
 * the site stay visually identical. Update both when the brand palette changes.
 */
export const colors = {
  bgBase: "#071922",
  bgPanel: "#0b222d",
  bgCard: "#0f2a36",

  borderSubtle: "rgba(213, 167, 84, 0.15)",
  borderCard: "rgba(213, 167, 84, 0.25)",
  borderTint: "rgba(213, 167, 84, 0.35)",

  glowOuter: "#aa7728",
  glowMid: "#d5a44c",
  glowHighlight: "#f3d68b",

  textPrimary: "#f8f6f0",
  textSecondary: "#b8c7cf",
  textMuted: "#728894",

  ctaText: "#051c25",
  accentCool: "#3a869d",
  accentCoolDim: "rgba(58, 134, 157, 0.16)",
  accentAmberDim: "rgba(213, 167, 84, 0.16)",
} as const;

/** Top-to-bottom gold gradient used on primary buttons and leadership badges. */
export const ctaGradient = ["#f7e6bd", "#d5a44c"] as const;

/** The card surface on the site is a subtle diagonal, approximated here vertically. */
export const cardGradient = ["#0f2a36", "#0b222d"] as const;

export const fonts = {
  display: "Fraunces_400Regular",
  displayItalic: "Fraunces_400Regular_Italic",
  body: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemi: "Inter_600SemiBold",
  bodyBold: "Inter_700Bold",
} as const;

export const radius = {
  sm: 12,
  md: 16,
  lg: 22,
  pill: 999,
} as const;

export const spacing = {
  screen: 20,
  section: 44,
  gap: 14,
} as const;
