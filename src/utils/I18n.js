export function generateTitle(title) {
  const __title = this.$t("route." + title);
  if (__title) return __title;
  return title;
}
