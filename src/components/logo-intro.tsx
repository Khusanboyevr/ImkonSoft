"use client";

import { useEffect, useState } from "react";

const WORD = "IMKONSOFT";
const ACCENT_START = 5; // "SOFT" is styled in the accent color

export function LogoIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 4750);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div id="imkonsoft-intro" aria-hidden="true">
      <div className="ii-ambient" />
      <div className="ii-stage">
        <div className="ii-markwrap">
          <div className="ii-ring" />
          <img className="ii-mark" alt="" src="/image/logo.png?v=5" />
          <div className="ii-sweep" />
        </div>
        <div className="ii-word" aria-hidden="true">
          {WORD.split("").map((letter, idx) => (
            <span key={idx} className={`ii-letter ${idx >= ACCENT_START ? "ii-accent" : ""}`}>
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LogoIntro;
