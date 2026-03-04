import { unstable_setRequestLocale } from 'next-intl/server';
import PricingTable from "@/components/sections/PricingTable";

export default function PricingPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return (
    <main className="pt-20">
      <PricingTable />
    </main>
  );
}
