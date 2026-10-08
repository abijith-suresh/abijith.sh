import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/projects/",
  "/writing/",
  "/writing/why-i-built-my-own-website/",
  "/about/",
  "/now/",
  "/404.html",
];

const browserErrors = new WeakMap<Page, string[]>();

test.beforeEach(({ page }) => {
  const errors: string[] = [];
  browserErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
});

test.afterEach(({ page }) => {
  expect(browserErrors.get(page)).toEqual([]);
});

async function expectPageToFit(page: Page) {
  const size = await page.evaluate(() => ({
    available: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(size.content).toBeLessThanOrEqual(size.available + 1);
}

test("pages fit narrow, wide, and enlarged-text layouts", async ({ page }) => {
  for (const width of [320, 375, 640, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await expectPageToFit(page);
      await expect(page.locator("h1")).toBeVisible();
    }
  }
  await page.setViewportSize({ width: 320, height: 700 });
  for (const route of ["/", "/about/", "/writing/why-i-built-my-own-website/"]) {
    await page.goto(route);
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    await expectPageToFit(page);
  }
});

test("keyboard users can skip navigation and see link focus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "skip to content" })).toBeFocused();
  const skipBounds = await page.locator(".skip-link").boundingBox();
  expect(skipBounds?.width).toBeGreaterThan(1);
  expect(skipBounds?.x).toBeGreaterThanOrEqual(0);
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await expect(page.locator(".social").first()).toBeFocused();
  expect(
    await page
      .locator(".social")
      .first()
      .evaluate((link) => getComputedStyle(link).outlineStyle)
  ).toBe("solid");
});

test("article media, long cells, and wide code stay within the page", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/writing/why-i-built-my-own-website/");
  const measurements = await page.evaluate(async () => {
    const host = document.querySelector<HTMLElement>(".e-content");
    if (!host) throw new Error("Article content is missing");
    const fixture = document.createElement("section");
    const image = encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="1200"><rect width="2400" height="1200"/></svg>'
    );
    fixture.innerHTML = `<img width="2400" height="1200" src="data:image/svg+xml,${image}">
      <video width="2400" height="1200"></video><p>${"long-url-".repeat(70)}</p>
      <table><thead><tr><th>${"heading".repeat(50)}</th><th>second</th></tr></thead>
      <tbody><tr><td>${"unbroken".repeat(80)}</td><td>cell</td></tr></tbody></table>
      <pre>${"const value = 123; ".repeat(80)}</pre><blockquote>quote</blockquote>`;
    host.append(fixture);
    const img = fixture.querySelector("img");
    const pre = fixture.querySelector("pre");
    if (!img || !pre) throw new Error("Media fixture is missing");
    await img.decode();
    document.documentElement.dir = "rtl";
    const quote = getComputedStyle(fixture.querySelector("blockquote") as HTMLElement);
    return {
      hostWidth: host.getBoundingClientRect().width,
      mediaWidths: [...fixture.querySelectorAll("img, video, table")].map(
        (element) => element.getBoundingClientRect().width
      ),
      imageRatio: img.getBoundingClientRect().width / img.getBoundingClientRect().height,
      codeWidth: pre.clientWidth,
      codeScroll: pre.scrollWidth,
      quoteStart: quote.borderRightWidth,
      quoteEnd: quote.borderLeftWidth,
    };
  });
  await expectPageToFit(page);
  for (const width of measurements.mediaWidths) {
    expect(width).toBeLessThanOrEqual(measurements.hostWidth + 1);
  }
  expect(measurements.imageRatio).toBe(2);
  expect(measurements.codeScroll).toBeGreaterThan(measurements.codeWidth);
  expect(measurements.quoteStart).toBe("3px");
  expect(measurements.quoteEnd).toBe("0px");
});

test("prose opt-outs keep embedded content free of article link styling", async ({ page }) => {
  await page.goto("/writing/why-i-built-my-own-website/");
  const decorations = await page.evaluate(() => {
    const host = document.querySelector(".e-content");
    if (!host) throw new Error("Article content is missing");
    const fixture = document.createElement("div");
    fixture.innerHTML =
      '<a href="#">article link</a><aside class="not-prose"><a href="#">embedded link</a></aside>';
    host.append(fixture);
    return [...fixture.querySelectorAll("a")].map(
      (link) => getComputedStyle(link).textDecorationLine
    );
  });
  expect(decorations).toEqual(["underline", "none"]);
});

test("reduced motion stops reveals, glow, and hover movement", async ({ page }) => {
  await page.goto("/");
  await page.locator(".media-card").first().hover();
  const motion = await page.evaluate(() => ({
    animations: [...document.querySelectorAll(".rise")].map(
      (element) => getComputedStyle(element).animationName
    ),
    glow: getComputedStyle(document.querySelector(".period") as HTMLElement, "::after")
      .animationName,
    card: getComputedStyle(document.querySelector(".media-card") as HTMLElement).transform,
  }));
  expect(motion.animations.every((name) => name === "none")).toBe(true);
  expect(motion.glow).toBe("none");
  expect(motion.card).toBe("none");
});

test("client navigation keeps motion timings and active navigation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.evaluate(() => {
    Reflect.set(window, "navigationMarker", "same document");
  });
  for (const [label, path] of [
    ["projects", "/projects/"],
    ["writing", "/writing/"],
    ["about", "/about/"],
  ]) {
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: label })
      .click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(
      page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: label })
    ).toHaveAttribute("aria-current", "page");
    expect(await page.evaluate(() => Reflect.get(window, "navigationMarker"))).toBe(
      "same document"
    );
    const motion = await page
      .locator(".rise")
      .first()
      .evaluate((element) => ({
        duration: getComputedStyle(element).animationDuration,
        name: getComputedStyle(element).animationName,
        inlineAnimation: (element as HTMLElement).style.animation,
      }));
    expect(motion.duration).toBe("0.4s");
    expect(motion.name).toBe("rise");
    expect(motion.inlineAnimation).toBe("");
  }
  await page.goBack();
  await expect(page).toHaveURL(/\/writing\/$/);
  await expectPageToFit(page);
});

test("touch input gets press feedback without a sticky hover", async ({ browser, browserName }) => {
  test.skip(browserName === "firefox", "Firefox does not support mobile emulation");
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 375, height: 812 },
    reducedMotion: "reduce",
  });
  try {
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:4419/");
    const social = page.locator(".social").first();
    const resting = await social.evaluate((element) => getComputedStyle(element).backgroundColor);
    await social.hover();
    expect(await social.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe(
      resting
    );
    await page.mouse.down();
    expect(await social.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(
      resting
    );
    await page.mouse.up();
  } finally {
    await context.close();
  }
});

test("404 content receives its parent layout styles", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 480 });
  await page.goto("/404.html");
  const layout = await page.locator(".page-404-inner").evaluate((element) => ({
    display: getComputedStyle(element).display,
    padding: Number.parseFloat(getComputedStyle(element).paddingBlockStart),
  }));
  expect(layout.display).toBe("flex");
  expect(layout.padding).toBeGreaterThan(0);
  await expectPageToFit(page);
  await expect(page.getByRole("link", { name: "back to home" })).toBeVisible();
});
