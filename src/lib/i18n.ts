import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'sk'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    locale, // This must be here
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'Europe/Bratislava',
    now: new Date()
  };
});
