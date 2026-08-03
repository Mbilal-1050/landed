"use client";

import { useEffect, useRef, useState } from "react";

// Renders a fixed-size document (default 816x1056, our resume templates'
// native size) scaled to exactly fill whatever width its container ends up
// being — on any screen size, in a grid, carousel, or fixed box. This is
// what makes thumbnails read like real documents instead of shrunk-down
// screenshots: the scale factor is measured live, never guessed per
// breakpoint.
export default function ResumePreviewFrame({
  children,
  sourceWidth = 816,
  sourceHeight = 1056,
  className = "",
}: {
  children: React.ReactNode;
  sourceWidth?: number;
  sourceHeight?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setScale(width / sourceWidth);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [sourceWidth]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        aspectRatio: `${sourceWidth} / ${sourceHeight}`,
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          width: sourceWidth,
          height: sourceHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          visibility: scale > 0 ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
