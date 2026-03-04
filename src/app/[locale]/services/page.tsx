import { unstable_setRequestLocale } from 'next-intl/server';
import Services from "@/components/sections/Services";

export default function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return (
    <main className="pt-20">
      <Services />
    </main>
  );
}
