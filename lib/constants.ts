export const CATEGORIES = [
  { name: 'Smartphones', slug: 'smartphones' },
  { name: 'Laptops', slug: 'laptops' },
  { name: 'Audio', slug: 'audio' },
  { name: 'Wearables', slug: 'wearables' },
  { name: 'Accessories', slug: 'accessories' },
  { name: 'Gaming', slug: 'gaming' },
  { name: 'Cameras', slug: 'cameras' },
  { name: 'Smart Home', slug: 'smart-home' },
];

// Sourced from an environment variable named ADMIN_PASSWORD.
// NEXT_PUBLIC_ADMIN_PASSWORD is checked first because this value is validated
// in a client component (client-side env vars must be prefixed with NEXT_PUBLIC_).
// Falls back to the hardcoded password when no env var is configured.
export const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD ||
  process.env.ADMIN_PASSWORD ||
  '2407235nmJ';

export const CONTACT_EMAIL = 'Info@vnmtrade.com';

export const CURRENCY_SYMBOL = '৳';

export function formatPrice(value: number): string {
  const amount = Number.isFinite(value) ? value : 0;
  return `${CURRENCY_SYMBOL}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
