// Site Configuration
export const SITE = {
  // Meta
  title: "Abijith S",
  description: "java backend engineer at ust. i build tools for fun on the side.",
  url: "https://abijith.sh",
  domain: "abijith.sh",
  locale: "en-US",

  // Author
  author: "Abijith S",
  fullName: "Abijith Suresh",
  tagline: "my life in a minute.",
  avatar: "/avatar.jpg",
  twitterHandle: "@abijith_sh", // Kept for SEO compatibility (twitter:creator metadata)

  // Hero
  role: "backend engineer",

  // Footer navigation links
  socialLinks: [
    { label: "GitHub", href: "https://github.com/abijith-suresh", external: true },
    { label: "X", href: "https://x.com/abijith_sh", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/abijith-suresh", external: true },
    { label: "Bluesky", href: "https://bsky.app/profile/abijith.bsky.social", external: true },
    { label: "RSS", href: "/rss.xml", external: false },
  ] as const,
} as const;
