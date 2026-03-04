import { unstable_setRequestLocale } from 'next-intl/server';

export default function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-white">Digital Insights</h1>
      <p className="text-slate-400 mt-4">Blog posts coming soon.</p>
    </main>
  );
}
