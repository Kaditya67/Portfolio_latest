import React from "react"
import { Github, Linkedin, Mail, Globe, Instagram, Twitter } from "lucide-react";

export function SocialIcons({ socials }) {
  const FIXED_SOCIALS = [
  { icon: "github", label: "GitHub" },
  { icon: "instagram", label: "Instagram" },
  { icon: "linkedin", label: "LinkedIn" },
  { icon: "twitter", label: "Twitter" },
  { icon: "website", label: "Dev" },
];

const ICON_MAP = {
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  website: Globe,
};

  let arr = Array.isArray(socials)
    ? socials
    : Object.entries(socials || {}).map(([icon, href]) => ({
        icon,
        label: icon.charAt(0).toUpperCase() + icon.slice(1),
        href,
      }));

  return (
    <ul className="flex items-center gap-3">
      {arr.map((s) => {
        const Icon = ICON_MAP[s.icon];
        return (
          <li key={s.label}>
            <a
              href={s.href}
              aria-label={s.label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-accent dark:border-gray-600 dark:hover:bg-gray-700 transition"
              target={s.icon === "mail" ? "_self" : "_blank"}
              rel={s.icon === "mail" ? undefined : "noreferrer"}
            >
              {Icon ? <Icon className="h-5 w-5" /> : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
