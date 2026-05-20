// Site Configuration
export const SITE = {
  // Basic Info
  title: "Abijith S",
  description: "Personal portfolio and blog of Abijith S - developer, builder, writer.",
  author: "Abijith S",
  domain: "abijith.sh",
  url: "https://abijith.sh",
  locale: "en-US",

  // Hero Section
  greeting: "Hey, I'm Abijith",
  role: "Backend Engineer",
  heroIntro:
    "Based in Kochi, Kerala. I work on the backend, the part that keeps things running while everything else stays visible. Java and Spring Boot, mostly.",

  // Pagination
  postsPerPage: 10,
  projectsPerPage: 12,
} as const;

// Navigation
export const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;

// Social Links
export const SOCIAL_LINKS = {
  github: "https://github.com/abijith-suresh",
  x: "https://x.com/abijith_sh",
  linkedin: "https://linkedin.com/in/abijith-suresh",
  bluesky: "https://bsky.app/profile/abijith.bsky.social",
} as const;

// Author Information
export const AUTHOR = {
  name: "Abijith S",
  fullName: "Abijith Suresh",
  tagline: "Backend engineer at UST. Kochi, Kerala.",
  avatar: "/avatar.jpg",
  twitterHandle: "@abijith_sh", // Kept for SEO compatibility (twitter:creator metadata)

  // About Page — hero subtitle
  aboutSubtitle: "Backend by trade, builder by nature",

  // About Page — three narrative sections
  aboutWhatIDo:
    "I work as a software engineer at UST, based in Kochi. My day-to-day is mostly Java and Spring Boot — building services that sit between data and the rest of the system, making sure they don't fall over when things get interesting. The work is less about writing code and more about thinking through failure modes: what happens when this connection drops, when this payload doubles in size, when three services decide to fight over the same row. Reliability is the feature that doesn't make it into the release notes, but it's the one I'm actually paid for.",

  aboutHowIGotHere:
    "I fell into backend the way most people do — started building things, broke them, figured out why. The professional work is Java and Spring Boot, but the curiosity didn't stop at the service boundary. Python showed up for scripts and data work. TypeScript and enough React to trace a problem from the database to the browser. Backend stuck because the problems there are the ones I keep thinking about: data flow, state management, the shape of a request as it moves through a system. Everything else is context I pick up along the way.",

  aboutThisSite:
    "Writing is how I figure out what I actually think. This site is where that process becomes public — notes after shipping something, reflections on a pattern that clicked, the occasional opinion that survived a second draft. No editorial calendar, no niche. Just the things that seemed worth writing down. If it's useful to someone else, great. If not, it was useful to write.",
} as const;
