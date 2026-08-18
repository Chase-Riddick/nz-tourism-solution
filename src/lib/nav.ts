/**
 * The site's route map — one registry, read by both the header and the footer.
 *
 * Why a registry rather than links written into two components: a nav link that
 * points at an unbuilt page is a 404 a visitor finds before we do, and the
 * failure mode is silent. Registering a route is the deliberate act of saying
 * "this page exists", and `tests/nav.spec.ts` walks every registered link and
 * fetches it.
 *
 * As slices land (#10 trust pages, #11 destinations + FAQ, #12 legal set) they
 * add their routes here and the nav grows with them. Nothing appears in the nav
 * before the page behind it is real.
 */
export interface Route {
  href: string;
  label: string;
  /** Shown in the primary header nav. */
  primary?: boolean;
  /** Footer grouping. */
  group?: "explore" | "company" | "legal";
}

export const ROUTES: Route[] = [
  { href: "/tours", label: "Tours", primary: true, group: "explore" },
  { href: "/destinations", label: "Where we go", primary: true, group: "explore" },
  { href: "/faq", label: "Questions", primary: true, group: "explore" },
  { href: "/about", label: "About", primary: true, group: "company" },
  { href: "/safety", label: "Safety", primary: true, group: "company" },
  { href: "/contact", label: "Contact", primary: true, group: "company" },
  { href: "/credits", label: "Photo credits", group: "legal" },
  { href: "/privacy", label: "Privacy", group: "legal" },
  { href: "/terms", label: "Booking conditions", group: "legal" },
  { href: "/cookies", label: "Cookie policy", group: "legal" },
  { href: "/accessibility", label: "Accessibility", group: "legal" },
];

export const primaryNav = (): Route[] => ROUTES.filter((r) => r.primary);
export const footerGroup = (g: Route["group"]): Route[] =>
  ROUTES.filter((r) => r.group === g);

/**
 * Section match, not exact match: /tours/east-cape-five should mark "Tours" as
 * current. Exact matching would leave every detail page with no current section.
 */
export const isCurrent = (href: string, pathname: string): boolean => {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return clean === href || clean.startsWith(`${href}/`);
};
