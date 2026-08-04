"use client";

import { useId } from "react";

export function LogoMark({ size = 32 }: { size?: number }) {
  const uid = useId();
  const ringId = `landed-ring-${uid}`;
  const lId = `landed-l-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <circle cx="50" cy="50" r="46" fill="#0b1220" />
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke={`url(#${ringId})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="180 71"
        transform="rotate(-90 50 50)"
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="#e9edf4"
        strokeOpacity="0.85"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="55 196"
        strokeDashoffset="-183"
        transform="rotate(-90 50 50)"
      />
      <path d="M38 30h9v30h15v8H38z" fill={`url(#${lId})`} />
      <rect x="65" y="38" width="14" height="3.4" rx="1.7" fill="#e9edf4" />
      <rect x="65" y="45" width="10" height="3.4" rx="1.7" fill="#e9edf4" opacity="0.75" />
      <circle cx="61" cy="39.7" r="2.2" fill="#e8a33d" />
      <defs>
        <linearGradient id={ringId} x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f5cd8b" />
          <stop offset="1" stopColor="#c8791f" />
        </linearGradient>
        <linearGradient id={lId} x1="38" y1="30" x2="62" y2="68" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f5cd8b" />
          <stop offset="1" stopColor="#e8a33d" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LogoFull({ size = 24, showTagline = false }: { size?: number; showTagline?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <LogoMark size={size} />
      <div>
        <span className="font-display leading-none text-fog" style={{ fontSize: size * 0.75 }}>
          Landed<span className="text-amber">.</span>
        </span>
        {showTagline && (
          <p className="text-[9px] uppercase tracking-widest text-fog-dim">
            AI Resume &amp; Cover Letter Assistant
          </p>
        )}
      </div>
    </div>
  );
}
