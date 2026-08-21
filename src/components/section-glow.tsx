interface SectionGlowProps {
  tone?: "amber" | "cool";
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export function SectionGlow({ tone = "amber", size = 500, top, left, right, bottom }: SectionGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={`imk-section-glow imk-section-glow--${tone}`}
      style={{ width: size, height: size, top, left, right, bottom }}
    />
  );
}

export default SectionGlow;
