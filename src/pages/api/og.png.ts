import { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";
import { SITE } from "@/consts";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const title = url.searchParams.get("title") || SITE.title;
  const description = url.searchParams.get("description") || SITE.description;
  const type = url.searchParams.get("type") || "website";

  // Ink & Evergreen theme colors (OKLCH converted to hex for @vercel/og)
  const theme = {
    background: "#f9f6f2", // oklch(97.5% 0.007 80) — unbleached paper
    foreground: "#150e0a", // oklch(17% 0.014 50) — warm near-black
    accent: "#296944", // oklch(47% 0.09 155) — deep evergreen
    muted: "#746d68", // oklch(54% 0.012 65) — warm stone gray
  };

  // Generate HTML for the OG image
  const html = {
    type: "div",
    props: {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: theme.background,
        padding: "80px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      },
      children: [
        // Top section with type indicator
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "12px",
            },
            children: [
              // Decorative line
              {
                type: "div",
                props: {
                  style: {
                    width: "60px",
                    height: "3px",
                    backgroundColor: theme.accent,
                  },
                },
              },
              // Type badge
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "24px",
                    color: theme.accent,
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  },
                  children: type,
                },
              },
            ],
          },
        },
        // Main content
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              maxWidth: "900px",
            },
            children: [
              // Title
              {
                type: "div",
                props: {
                  style: {
                    fontSize: title.length > 60 ? "56px" : "72px",
                    fontWeight: "700",
                    color: theme.foreground,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  },
                  children: title,
                },
              },
              // Description
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "28px",
                    color: theme.muted,
                    lineHeight: 1.4,
                  },
                  children: description,
                },
              },
            ],
          },
        },
        // Footer with site info
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "16px",
              width: "100%",
              borderTop: `2px solid ${theme.accent}`,
              paddingTop: "32px",
            },
            children: [
              // Site name
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "28px",
                    fontWeight: "600",
                    color: theme.foreground,
                  },
                  children: SITE.author,
                },
              },
              // Separator dot
              {
                type: "div",
                props: {
                  style: {
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: theme.accent,
                  },
                },
              },
              // Domain
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "24px",
                    color: theme.muted,
                  },
                  children: SITE.domain,
                },
              },
            ],
          },
        },
      ],
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
  });
};
