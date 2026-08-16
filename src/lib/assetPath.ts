export default function assetPath(p: string | undefined | null): string {
  if (!p) return "";
  if (/^https?:\/\//.test(p)) return p;
  // In production, GitHub Pages serves the app under /Portfolio
  if (process.env.NODE_ENV === 'production') {
    return `/Portfolio${p}`;
  }
  return p;
}
