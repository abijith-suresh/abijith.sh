// Scroll-reveal controller — pure logic, no DOM side-effects

export interface ScrollRevealOptions {
  /** CSS selector for elements to observe */
  selector: string;
  /** Class added when element enters viewport */
  revealClass: string;
  /** Class added for each stagger step (appended with index suffix: -1, -2, …) */
  staggerClass: string;
  /** Max stagger steps to apply */
  maxStagger: number;
  /** IntersectionObserver threshold */
  threshold: number;
  /** Root margin for early trigger */
  rootMargin: string;
}

export function buildRevealConfig(
  overrides: Partial<ScrollRevealOptions> = {}
): ScrollRevealOptions {
  return {
    selector: "[data-scroll-reveal]",
    revealClass: "scroll-revealed",
    staggerClass: "scroll-stagger",
    maxStagger: 4,
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px",
    ...overrides,
  };
}

export function applyRevealClasses(
  elements: Element[],
  config: ScrollRevealOptions
): Map<Element, string[]> {
  const applied = new Map<Element, string[]>();
  elements.forEach((el, i) => {
    const classes: string[] = [config.revealClass];
    const staggerIndex = Math.min(i + 1, config.maxStagger);
    classes.push(`${config.staggerClass}-${staggerIndex}`);
    applied.set(el, classes);
  });
  return applied;
}

export function shouldSkipReveal(el: Element): boolean {
  return el.classList.contains("scroll-revealed");
}
