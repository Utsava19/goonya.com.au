/** Strip trailing slashes so routes and SEO metadata always match sitemap URLs. */
export function normalizePathname(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}
