export function extractIframeSrc(iframeString) {
  if (!iframeString) return null;

  // Dùng regex tìm src="..."
  const match = iframeString.match(/src="([^"]+)"/);
  return match ? match[1] : null;
}
