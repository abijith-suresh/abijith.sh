// Site Configuration
export const SITE = {
  // Meta
  title: "Abijith S",
  description: "Backend engineer in Kochi, Kerala. I work with Java and Spring Boot.",
  url: "https://abijith.sh",
  domain: "abijith.sh",
  locale: "en-US",

  // Author
  author: "Abijith S",
  fullName: "Abijith Suresh",
  tagline: "My life in a minute.",
  avatar: "/avatar.jpg",
  twitterHandle: "@abijith_sh", // Kept for SEO compatibility (twitter:creator metadata)

  // Hero
  role: "Backend Engineer",

  // Footer navigation links
  socialLinks: [
    { label: "GitHub", href: "https://github.com/abijith-suresh", external: true },
    { label: "X", href: "https://x.com/abijith_sh", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/abijith-suresh", external: true },
    { label: "Bluesky", href: "https://bsky.app/profile/abijith.bsky.social", external: true },
    { label: "RSS", href: "/rss.xml", external: false },
  ] as const,
} as const;
