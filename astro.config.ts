import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://abijith.sh",
  adapter: vercel(),
  integrations: [
    expressiveCode({
      themes: ["github-light", "github-dark"],
      useDarkModeMediaQuery: false,
      darkModeSelector: '[data-theme="dark"]',
      defaultProps: {
        wrap: true,
      },
      plugins: [],
      styleOverrides: {
        codeFontSize: "0.875rem",
        borderColor: "var(--color-border)",
        borderRadius: "0",
        codeBackground: "color-mix(in oklab, var(--color-muted-foreground) 25%, transparent)",
        frames: {
          editorActiveTabForeground: "var(--color-muted-foreground)",
          editorActiveTabBackground:
            "color-mix(in oklab, var(--color-muted-foreground) 25%, transparent)",
          editorActiveTabIndicatorBottomColor: "transparent",
          editorActiveTabIndicatorTopColor: "transparent",
          editorTabBorderRadius: "0",
          editorTabBarBackground: "transparent",
          editorTabBarBorderBottomColor: "transparent",
          frameBoxShadowCssValue: "none",
          terminalBackground: "color-mix(in oklab, var(--color-muted-foreground) 25%, transparent)",
          terminalTitlebarBackground: "transparent",
          terminalTitlebarBorderBottomColor: "transparent",
          terminalTitlebarForeground: "var(--color-muted-foreground)",
        },
      },
    }),
    sitemap(),
  ],
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Improve dev server performance
      warmup: {
        clientFiles: ["./src/components/**/*.astro", "./src/layouts/**/*.astro"],
      },
    },
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Suppress UNUSED_EXTERNAL_IMPORT only from Astro internals or dependencies
          if (
            warning.code === "UNUSED_EXTERNAL_IMPORT" &&
            warning.id &&
            (warning.id.includes("/.astro/") || warning.id.includes("/node_modules/"))
          )
            return;
          warn(warning);
        },
      },
    },
  },
});
