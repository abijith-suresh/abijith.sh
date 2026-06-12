import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { SITE } from "../consts";

export interface OgRoute {
  title: string;
  description: string;
  type?: "website" | "article";
}

type SatoriFonts = Awaited<ReturnType<typeof loadFontsInternal>>;

const PUBLIC_DIR = "public";
const ASSET_FONT_DIR = "src/assets/fonts";
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
let fontCache: SatoriFonts | undefined;

export async function renderOgPng(route: OgRoute): Promise<Buffer> {
  const svg = await renderOgSvg(route);
  return renderPng(svg, OG_WIDTH);
}

export async function generateSiteIcons(): Promise<void> {
  const faviconSvg = await renderIconSvg(512);
  const publicDir = path.join(process.cwd(), PUBLIC_DIR);
  const faviconPath = path.join(publicDir, "favicon.svg");
  const appleIconPath = path.join(publicDir, "apple-touch-icon.png");
  const icoPath = path.join(publicDir, "favicon.ico");
  const applePng = renderPng(faviconSvg, 180);
  const faviconPng = renderPng(faviconSvg, 32);

  await writeFileIfChanged(faviconPath, faviconSvg);
  await writeFileIfChanged(appleIconPath, applePng);
  await writeFileIfChanged(icoPath, createIco(faviconPng, 32, 32));
}

async function renderOgSvg(route: OgRoute): Promise<string> {
  const titleLines = wrapText(route.title, 24, 3);
  const descriptionLines = wrapText(route.description, 58, 3);
  const fonts = await loadFonts();

  return satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#080808",
          color: "#fafafa",
          padding: 72,
          fontFamily: "IBM Plex Sans",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: 58,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      width: "100%",
                      height: 1,
                      backgroundColor: "#3f3f3f",
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      gap: 56,
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            color: "#a9a9a9",
                            fontFamily: "IBM Plex Mono",
                            fontSize: 24,
                            fontWeight: 500,
                            letterSpacing: 3,
                            textTransform: "uppercase",
                          },
                          children: route.type ?? "website",
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                          },
                          children: titleLines.map((line) => ({
                            type: "div",
                            props: {
                              style: {
                                fontSize: 64,
                                fontWeight: 500,
                                lineHeight: 1.04,
                              },
                              children: line,
                            },
                          })),
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            color: "#a9a9a9",
                            fontSize: 32,
                            lineHeight: 1.25,
                          },
                          children: descriptionLines.map((line) => ({
                            type: "div",
                            props: { children: line },
                          })),
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: 24,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 28,
                      fontWeight: 500,
                    },
                    children: SITE.domain,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      width: "100%",
                      height: 1,
                      backgroundColor: "#3f3f3f",
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts,
    }
  );
}

async function renderIconSvg(size: number): Promise<string> {
  const fonts = await loadFonts();

  return satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#080808",
          color: "#fafafa",
          fontFamily: "IBM Plex Sans",
          fontSize: size * 0.32,
          fontWeight: 500,
        },
        children: {
          type: "div",
          props: {
            style: {
              width: size * 0.68,
              height: size * 0.68,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `${size * 0.012}px solid #3f3f3f`,
            },
            children: "AS",
          },
        },
      },
    },
    {
      width: size,
      height: size,
      fonts,
    }
  );
}

async function loadFonts() {
  fontCache ??= await loadFontsInternal();
  return fontCache;
}

async function loadFontsInternal() {
  const sansRegular = await readFile(
    path.join(process.cwd(), ASSET_FONT_DIR, "IBMPlexSans-Regular.ttf")
  );
  const sansMedium = await readFile(
    path.join(process.cwd(), ASSET_FONT_DIR, "IBMPlexSans-Medium.ttf")
  );
  const monoMedium = await readFile(
    path.join(process.cwd(), ASSET_FONT_DIR, "IBMPlexMono-Medium.ttf")
  );

  return [
    {
      name: "IBM Plex Sans",
      data: sansRegular,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "IBM Plex Sans",
      data: sansMedium,
      weight: 500 as const,
      style: "normal" as const,
    },
    {
      name: "IBM Plex Mono",
      data: monoMedium,
      weight: 500 as const,
      style: "normal" as const,
    },
  ];
}

async function writeFileIfChanged(filePath: string, content: string | Buffer): Promise<void> {
  const next = Buffer.isBuffer(content) ? content : Buffer.from(content);

  try {
    const current = await readFile(filePath);
    if (current.equals(next)) return;
  } catch {
    // Missing files should be created.
  }

  await writeFile(filePath, next);
}

function renderPng(svg: string, width: number): Buffer {
  return new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: width,
    },
    font: {
      loadSystemFonts: false,
    },
  })
    .render()
    .asPng();
}

function createIco(png: Buffer, width: number, height: number): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const directory = Buffer.alloc(16);
  directory.writeUInt8(width >= 256 ? 0 : width, 0);
  directory.writeUInt8(height >= 256 ? 0 : height, 1);
  directory.writeUInt8(0, 2);
  directory.writeUInt8(0, 3);
  directory.writeUInt16LE(1, 4);
  directory.writeUInt16LE(32, 6);
  directory.writeUInt32LE(png.length, 8);
  directory.writeUInt32LE(header.length + directory.length, 12);

  return Buffer.concat([header, directory, png]);
}

function wrapText(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const nextLine = line ? `${line} ${word}` : word;
    if (nextLine.length <= maxChars) {
      line = nextLine;
      continue;
    }

    if (line) lines.push(line);
    line = word;
    if (lines.length === maxLines) break;
  }

  if (line && lines.length < maxLines) lines.push(line);

  if (lines.length === maxLines && words.join(" ").length > lines.join(" ").length) {
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/\s+\S*$/, "")}...`;
  }

  return lines;
}
