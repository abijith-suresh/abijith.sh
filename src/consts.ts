// Site Configuration
export const SITE = {
  // Meta
  title: "Abijith S",
  description: "Personal portfolio and blog of Abijith S — developer, builder, writer.",
  url: "https://abijith.sh",
  domain: "abijith.sh",
  locale: "en-US",

  // Author
  author: "Abijith S",
  fullName: "Abijith Suresh",
  tagline: "Backend engineer at UST. Kochi, Kerala.",
  avatar: "/avatar.jpg",
  twitterHandle: "@abijith_sh", // Kept for SEO compatibility (twitter:creator metadata)

  // Hero
  greeting: "Hey, I'm Abijith",
  role: "Backend Engineer",
  heroIntro:
    "Based in Kochi, Kerala. I work on the backend, the part that keeps things running while everything else stays visible. Java and Spring Boot, mostly.",

  // Footer navigation links
  socialLinks: [
    { label: "GitHub", href: "https://github.com/abijith-suresh", external: true },
    { label: "X", href: "https://x.com/abijith_sh", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/abijith-suresh", external: true },
    { label: "Bluesky", href: "https://bsky.app/profile/abijith.bsky.social", external: true },
    { label: "RSS", href: "/rss.xml", external: false },
  ] as const,
} as const;

// Navigation
export const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
] as const;
