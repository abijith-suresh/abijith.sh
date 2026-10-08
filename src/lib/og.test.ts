import { describe, expect, it } from "vitest";
import { buildSiteIcons, canonicalizeSvg } from "./og";

describe("canonicalizeSvg", () => {
  it("collapses attribute padding without touching values", () => {
    expect(canonicalizeSvg('<g  ><path  d="M1 2 3"  fill="none"/></g >')).toBe(
      '<g><path d="M1 2 3" fill="none"/></g>'
    );
  });

  it("preserves whitespace inside text and attribute values", () => {
    expect(canonicalizeSvg('<svg><title>Abijith  S</title><rect x="0  1"/></svg>')).toBe(
      '<svg><title>Abijith  S</title><rect x="0  1"/></svg>'
    );
  });

  it("strips indentation inside tags", () => {
    expect(canonicalizeSvg(`<path\n    d="M0,0"/ >`)).toBe(`<path d="M0,0"/>`);
  });

  it("leaves tags that are already canonical unchanged", () => {
    expect(canonicalizeSvg('<g><path d="M219.4 356L203.2 356"/></g>')).toBe(
      '<g><path d="M219.4 356L203.2 356"/></g>'
    );
  });
});

describe("buildSiteIcons", () => {
  it("produces byte-stable output across repeated generations", async () => {
    const first = await buildSiteIcons();
    const second = await buildSiteIcons();

    expect(second.faviconSvg).toBe(first.faviconSvg);
    expect(second.appleIconPng.equals(first.appleIconPng)).toBe(true);
    expect(second.faviconIco.equals(first.faviconIco)).toBe(true);
  });

  it("reproduces the committed favicon bytes", async () => {
    const { readFileSync } = await import("node:fs");
    const generated = await buildSiteIcons();
    expect(generated.faviconSvg).toBe(readFileSync("public/favicon.svg", "utf8"));
  });
});
