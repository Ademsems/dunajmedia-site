import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'sk'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ locale }) => {
  // Check if the locale is actually one of ours
  if (!locales.includes(locale as any)) notFound();

  return {
    locale, // This is the line the error log is begging for
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
