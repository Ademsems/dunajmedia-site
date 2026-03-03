import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Services from "@/components/sections/Services";
import ContactForm from "@/components/sections/ContactForm";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title"), description: t("subtitle") };
}

export default function ServicesPage() {
  return (
    <>
      <div className="pt-16">
        <Services />
        <ContactForm />
      </div>
    </>
  );
}
