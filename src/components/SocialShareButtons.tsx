"use client";

import { LinkedInIcon, XIcon, FacebookIcon } from "./BrandIcons";

export default function SocialShareButtons({ url, text }: { url: string; text: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const links = [
    { icon: LinkedInIcon, label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { icon: XIcon, label: "X", href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}` },
    { icon: FacebookIcon, label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
  ];

  return (
    <div className="flex gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs text-fog-dim transition hover:border-amber/50 hover:text-fog"
        >
          <l.icon size={13} /> {l.label}
        </a>
      ))}
    </div>
  );
}
