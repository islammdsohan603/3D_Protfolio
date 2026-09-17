/**
 * Image URL Sanitization & ImgBB Validation Helper
 * Ensures remote image strings are valid direct binary image links,
 * sanitizes preview page URLs, and provides high-tech dark fallback placeholders.
 */

export const FALLBACK_IMAGE_URL =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";

/**
 * Checks whether an incoming image URL is a direct raw binary image.
 */
export function isValidDirectImageUrl(url?: string | null): boolean {
  if (!url || typeof url !== "string") return false;

  const trimmed = url.trim();

  // Local public assets are valid
  if (trimmed.startsWith("/")) return true;

  // Direct ImgBB binary hosts (i.ibb.co or i.ibb.co.com)
  if (trimmed.includes("i.ibb.co") || trimmed.includes("i.ibb.co.com")) return true;

  // Check common image file extensions
  const cleanUrl = trimmed.split("?")[0].toLowerCase();
  const imageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"];
  if (imageExtensions.some((ext) => cleanUrl.endsWith(ext))) return true;

  // ImgBB webpage viewer links (e.g., https://ibb.co/XXXXXX or https://ibb.co.com/XXXXXX)
  if (trimmed.includes("ibb.co/") || trimmed.includes("ibb.co.com/")) {
    console.warn(
      `[formatImageUrl] Warning: '${trimmed}' appears to be an ImgBB HTML webpage viewer link instead of a raw direct image link (i.ibb.co/...). Consider replacing with a direct image URL.`
    );
    return false;
  }

  return true;
}

/**
 * Sanitizes and formats an image URL for Next.js <Image /> components.
 * Returns the valid URL or a reliable fallback.
 */
export function formatImageUrl(url?: string | null, customFallback = FALLBACK_IMAGE_URL): string {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return customFallback;
  }

  const trimmed = url.trim();

  // If it's a valid direct image URL or local asset
  if (isValidDirectImageUrl(trimmed)) {
    return trimmed;
  }

  // If it's an ImgBB viewer webpage link without i.ibb.co
  if (trimmed.includes("ibb.co/") || trimmed.includes("ibb.co.com/")) {
    // Attempt to convert viewer URL to i.ibb.co host if format is https://ibb.co.com/id/name.png
    if (trimmed.match(/\/([a-zA-Z0-9]+)\.(png|jpg|jpeg|webp)$/i)) {
      return trimmed.replace("ibb.co.com", "i.ibb.co.com").replace("ibb.co", "i.ibb.co");
    }
  }

  return customFallback;
}
