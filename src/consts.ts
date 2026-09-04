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

  // Footer navigation links. `icon` keys the inline SVG fragments on the
  // homepage hero; label/href/external also drive the Layout footer and JSON-LD.
  socialLinks: [
    { label: "GitHub", href: "https://github.com/abijith-suresh", external: true, icon: "github" },
    { label: "X", href: "https://x.com/abijith_sh", external: true, icon: "x" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/abijith-suresh",
      external: true,
      icon: "linkedin",
    },
    {
      label: "Bluesky",
      href: "https://bsky.app/profile/abijith.bsky.social",
      external: true,
      icon: "bluesky",
    },
    { label: "RSS", href: "/rss.xml", external: false, icon: "rss" },
  ] as const,
} as const;
