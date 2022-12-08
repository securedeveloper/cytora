export const getSlug = (url?: string) => {
  if (!url) return;

  const slug = url.split('/').filter(Boolean);
  return slug.pop() || slug.pop();
}
