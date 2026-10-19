/**
 * The contact form posts to the website's own /api/contact route, which holds
 * the Telegram credentials server-side. Nothing secret ships inside the app —
 * anything bundled here can be read out of the APK/IPA.
 *
 * Point this at a deployment (or a LAN address while developing) with
 * EXPO_PUBLIC_API_BASE_URL in mobile/.env.
 */
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://revengroup.uz";

export const CONTACT = {
  phone: "+998 93 567 30 30",
  /** Same number without spaces, for the dialer. */
  phoneDial: "+998935673030",
  email: "info@revengroup.uz",
  telegram: "https://t.me/revengroup",
  instagram: "https://instagram.com/revengroup",
  linkedin: "https://linkedin.com/company/revengroup",
} as const;
