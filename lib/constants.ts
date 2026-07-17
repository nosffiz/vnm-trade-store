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

export const ADMIN_PASSWORD = 'vnmtrade-admin-2024';

export const CONTACT_EMAIL = 'Info@vnmtrade.com';

export const CURRENCY_SYMBOL = '৳';

export function formatPrice(value: number): string {
  const amount = Number.isFinite(value) ? value : 0;
  return `${CURRENCY_SYMBOL}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
