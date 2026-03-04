import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  // This tells Vercel which pages to run the language logic on
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|hero-video.mp4|.*\\..*).*)' ,
  ],
};
